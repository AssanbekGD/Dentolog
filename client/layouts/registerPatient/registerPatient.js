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

  let handler = Tracker.autorun(function(){
    const doctors = doctorsCursor.fetch(),
          events = eventCursor.fetch(),
          resources = [],
          colors = ["green", "blue", "yellow", "red", "orange", "black"];

    doctors.forEach(function(doctor, i){
      let resource = {
        id: doctor._id,
        title: doctor.fullName,
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
  });

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
			dayClick: function(date, jsEvent, view, resource) {
        var phone = $("#rp-phone").val(),
            email = $("#rp-email").val(),
            fullName = $("#rp-full-name").val(),
            newEvent = {};

        newEvent.start = date.toISOString();
        newEvent.end = date.add(60, 'm').toISOString();
        newEvent.title = `${fullName}
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

        $("#rp-phone").val('');
        $("#rp-email").val('');
        $("#rp-full-name").val('');
        Session.set("rp-phone", "");

        if(!Session.get('patient-on-list'))
        {
          let data = { phone, email, fullName };

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
});

Template.registerPatient.events({
  'keyup #rp-phone'(e, t)
  {
    Session.set('rp-phone', e.target.value);
  },
});

Template.registerPatient.helpers({
  email()
  {
    let phone = Session.get('rp-phone'),
        patient = Patients.find({phone}).fetch()[0];

    if(patient)
    {
      Session.set('patient-on-list', true);
      return patient.email;
    }
    else
    {
      return '';
    }
  },
  fullName()
  {
    let phone = Session.get('rp-phone'),
        patient = Patients.find({phone}).fetch()[0];

    if(patient)
    {
      Session.set('patient-on-list', true);
      return patient.fullName;
    }
    else
    {
      return '';
    }
  }
});
