import './registerPatient.html';

import {Template} from 'meteor/templating';
import {Patients} from '../../../api/patients.js';
import {Doctors} from '../../../api/doctors.js';
import {Events} from '../../../api/events.js';

Meteor.subscribe('patients');
Meteor.subscribe('doctors');
Meteor.subscribe('events');

Template.registerPatient.onCreated(function(){
  this.events = new ReactiveVar([]);
  this.newEvent = new ReactiveVar({});
  Session.set('patient-on-list', false);
});

Template.registerPatient.onRendered(function(){
  let doctorsCursor = Doctors.find(),
      eventCursor = Events.find(),
      thisTempl = this;

  let autorunFunction = function(){
    const doctors = doctorsCursor.fetch(),
          events = eventCursor.fetch(),
          resources = [],
          colors = ["green", "blue", "yellow", "red", "orange", "black"];

    doctors.forEach(function(doctor, i){
      let resource = {
        id: doctor._id,
        title: `${doctor.surname} ${doctor.name.charAt(0)}.`,
        eventColor: i < colors.length ? colors[i] : colors[i % colors.length]
      };

      resources.push(resource);
      $('#doctorSchedule').fullCalendar('addResource', resource);
    });

    events.forEach(function(event){
      event.id = event._id;
      $('#doctorSchedule').fullCalendar('removeEvents', event.id);
      $('#doctorSchedule').fullCalendar('addEventSource', [event]);
    });
  };

  let handler = Tracker.autorun(autorunFunction);

  $('#doctorSchedule').fullCalendar({
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
			defaultView: 'agendaDay',
			defaultDate: Date.now(),
			editable: true,
			selectable: true,
			eventLimit: true, // allow "more" link when too many events
      eventOverlap: false,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'agendaDay,agendaWeek,month'
			},
      resources: [],
			views: {
				agendaTwoDay: {
					type: 'agenda',
					duration: { days: 2 },
					groupByResource: true
				}
			},
      eventClick(e, je, view)
      {
        const event = Events.findOne({_id: e._id});

        FlowRouter.go(`/appointment/${event.patientId}?doctorId=${event.resourceId}`);
      },
      eventDrop: function(event, delta){
        let start = event.start,
            end = event.end;

        const returnObject = Meteor.call('events.update', event._id, start.format(), end.format(), event.resourceId, function(err)
        {
          if(err)
          {
            toastr.error(err.reason);
          }
          else
          {
            toastr.success('Пациент перезаписан');
          }
        });
      },
			dayClick: function(date, jsEvent, view, resource) {
        let $phone = $("#rp-phone"), phone = $phone.val(),
            $email = $("#rp-email"), email = $email.val(),
            $name = $("#rp-name"), name = $name.val(),
            $surname = $("#rp-surname"), surname = $surname.val(),
            newEvent = {},
            hasEmptyField = false,
            highlightClass = 'red-border';

        if(!validateFields([$phone, $email, $name, $surname], highlightElement, highlightClass))
          return ;

        newEvent.start = date.toISOString();
        newEvent.end = date.add(60, 'm').toISOString();
        newEvent.title = `${surname} ${name.charAt(0)}.
        (${phone})`;
        newEvent.resourceId = resource.id,
        newEvent.patientId = Session.get('patient-id');

        $phone.val('');
        $email.val('');
        $name.val('');
        $surname.val('');

        Session.set("rp-phone", "");

        if(!Session.get('patient-on-list'))
        {
          let data = { phone, email, name, surname };

          Meteor.call('patients.insert', data, function(err, res){
            if(err)
            {
              toastr.error(err.reason);
            }
            else
            {
              toastr.success('Новый пациент добавлен!');
              newEvent.patientId = res;
            }
          });
        }
        Session.set('patient-on-list', false);

        thisTempl.newEvent.set(newEvent);

        Meteor.call('events.insert', newEvent, function(err, res){
            if(!err)
            {
              newEvent.id = res;
              $('#doctorSchedule').fullCalendar('addEventSource', [newEvent]);
            }
        });
      },
		});
  autorunFunction();
});

Template.registerPatient.events({
  'click .reactive-table tr'(e, t)
  {
    let phone = $(e.currentTarget).find('.phone').html();
    $('#rp-phone').val(phone);
    Session.set('rp-phone', phone);
  },
  'keyup #rp-phone'(e, t)
  {
    Session.set('rp-phone', e.target.value);
  },
  'keyup .rp.form-control'(e, t)
  {
    let phone = $("#rp-phone").val(),
        email = $("#rp-email").val(),
        name = $("#rp-name").val(),
        surname = $("#rp-surname").val(),
        combo = "",
        reactiveTableInput = $('.reactive-table-input');

    if(name !== "")
      combo = `${combo} ${name} `;
    if(surname !== "")
      combo = `${combo} ${surname} `;
    if(email !== "")
      combo = `${combo} ${email} `;
    if(phone !== "")
      combo = `${combo} ${phone} `;

    reactiveTableInput.val(combo);
    reactiveTableInput.trigger('keyup');
  }
});

Template.registerPatient.helpers({
  settings()
  {
    return {
        collection: Patients,
        rowsPerPage: 5,
        showFilter: true,
        fields: ['name', 'surname', 'email', 'phone']
    };
  },
  patientData()
  {
    let phone = Session.get('rp-phone'),
        patient = Patients.find({phone}).fetch()[0];

    if(patient)
    {
      Session.set('patient-on-list', true);
      Session.set('patient-id', patient._id);
      return patient;
    }
    else
    {
      return '';
    }
  }
});

function validateFields(jqElements, highLightFunction, className)
{
  let hasEmptyField = false;

  for(let i = 0, len = jqElements.length; i < len; i++)
  {
    if(!jqElements[i].val().length)
    {
      highLightFunction(jqElements[i], className);
      hasEmptyField = true;
    }
  }

  if(hasEmptyField)
  {
    toastr.error('Заполните обязательные поля');
    return false;
  }

  return true;
}

function highlightElement(jqElement, className)
{
  jqElement.addClass(className);
  setTimeout(function(){
    jqElement.removeClass(className);
  }, 4000);
}
