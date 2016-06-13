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
        var $phone = $("#rp-phone"), phone = $phone.val(),
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
        thisTempl.newEvent.set(newEvent);

        Meteor.call('events.insert', newEvent, function(err, res){
            if(!err)
            {
              newEvent.id = res;
              $('#doctorSchedule').fullCalendar('addEventSource', [newEvent]);
            }
        });

        $phone.val('');
        $email.val('');
        $name.val('');
        $surname.val('');

        Session.set("rp-phone", "");

        if(!Session.get('patient-on-list'))
        {
          let data = { phone, email, name, surname };

          Meteor.call('patients.insert', data, function(err){
            if(err)
            {
              toastr.error(err.reason);
            }
            else
            {
              toastr.success('Новый пациент добавлен!');
            }
          });
        }
        Session.set('patient-on-list', false);
      },
		});
  autorunFunction();
});

Template.registerPatient.events({
  'keyup #rp-phone'(e, t)
  {
    Session.set('rp-phone', e.target.value);
  },
});

Template.registerPatient.helpers({
  patientData()
  {
    let phone = Session.get('rp-phone'),
        patient = Patients.find({phone}).fetch()[0];

    if(patient)
    {
      Session.set('patient-on-list', true);
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
