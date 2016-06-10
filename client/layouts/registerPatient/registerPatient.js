import './registerPatient.html';

import {Template} from 'meteor/templating';
import {Patients} from '../../../api/patients.js';

Meteor.subscribe('patients');

Template.registerPatient.onCreated(function(){
  this.events = new ReactiveVar([]);
  this.newEvent = new ReactiveVar({});
  Session.set('patient-on-list', false);
});

Template.registerPatient.onRendered(function(){
  var thisTempl = this;

  $('#doctorSchedule').fullCalendar({
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
			defaultView: 'agendaDay',
			defaultDate: '2016-05-07',
			editable: true,
			selectable: true,
			eventLimit: true, // allow "more" link when too many events
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'agendaDay,agendaTwoDay,agendaWeek,month'
			},
			views: {
				agendaTwoDay: {
					type: 'agenda',
					duration: { days: 2 },
					groupByResource: true
				}
			},
			resources: [
				{ id: 'a', title: 'Махмадиев' },
				{ id: 'b', title: 'Беспаев', eventColor: 'green' },
				{ id: 'c', title: 'Алимбекулы', eventColor: 'orange' },
				{ id: 'd', title: 'Абдыразакова', eventColor: 'red' }
			],
			dayClick: function(date, jsEvent, view, resource) {
        var phone = $("#rp-phone").val(),
            email = $("#rp-email").val(),
            fullName = $("#rp-full-name").val(),
            newEvent = {};

        newEvent.start = date.toISOString();
        newEvent.end = date.add(60, 'm').toISOString();
        newEvent.id = 123456;
        newEvent.color = '#00b300';
        newEvent.title = `${fullName}
        (${phone})`;
        newEvent.resourceId = resource.id,
        thisTempl.newEvent.set(newEvent);
        var currentEvents = [];
        currentEvents.push(newEvent);
        $('#doctorSchedule').fullCalendar('addEventSource', currentEvents);

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
