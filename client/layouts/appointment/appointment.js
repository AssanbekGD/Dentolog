import './appointment.html';
import {Template} from 'meteor/templating';
import {Patients} from '../../../api/patients.js';
import {Diagnoses} from '../../../api/diagnoses.js';
import {Symptoms} from '../../../api/symptoms.js';
import {Treatments} from '../../../api/treatments.js';

Template.appointment.onRendered(function appointmentOnRendered(){
  Meteor.subscribe('patients', function(err){
    if(err)
    {
      toastr.error(err.reason);
    }
    else
    {
      const _id = FlowRouter.getParam('patientId');
            currentPatient = Patients.findOne({ _id });
      Session.set('currentPatient', currentPatient);
    }
  });

  Meteor.subscribe('diagnoses', function(err){
    if(err)
    {
      toastr.error(err.reason);
    }
    else
    {
      $("#diagnoses-list").select2();
    }
  });

  Meteor.subscribe('symptoms', function(err){
    if(err)
    {
      toastr.error(err.reason);
    }
    else
    {
      $("#symptoms-list").select2();
    }
  });

  Meteor.subscribe('treatments', function(err){
    if(err)
    {
      toastr.error(err.reason);
    }
    else
    {
      $("#treatments-list").select2();
    }
  });
});

Template.appointment.onRendered(function appointmentOnRendered(){
  $('#finish-button').parent().hide();
});

Template.appointment.helpers({
  patientId(){
    return Session.get('currentPatient')._id;
  },
  patientName(){
    const name = Session.get('currentPatient').name,
          surname = Session.get('currentPatient').surname;

    return `${name} ${surname}`;
  },
  treatments(){
    return Treatments.find();
  },
  diagnoses(){
    return Diagnoses.find();
  },
  symptoms(){
    return Symptoms.find();
  }
});


Template.appointment.events({
  'click #start-button'(e, t)
  {
    e.preventDefault();

    $('select').removeAttr('disabled');
    $('select').select2({});
    $('#finish-button').parent().show();
    $('#start-button').parent().hide();

    let now = moment().format();
    Session.set('startTime', now);
  },
  'submit #create-appointment-form'(e, t)
  {
    e.preventDefault();

    const $symptoms = $("#symptoms-list"),
          $diagnoses = $("#diagnoses-list"),
          $treatments = $("#treatments-list"),
          symptoms = $symptoms.val(),
          diagnoses = $diagnoses.val(),
          treatments = $treatments.val(),
          startTime = Session.get('startTime'),
          endTime = moment().format(),
          patientId = FlowRouter.getParam('patientId'),
          doctorId = FlowRouter.getQueryParam('doctorId');

    data = {symptoms, diagnoses, treatments, startTime, endTime, patientId, doctorId};

    $symptoms.val('');
    $treatments.val('');
    $diagnoses.val('');

    $('select').attr('disabled', 'disabled');
    $('select').select2({});
    $('#finish-button').parent().hide();
    $('#start-button').parent().show();

    let now = moment().format();
    Session.set('startTime', now);

    Meteor.call('appointments.insert', data, function(err){
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('Прием добавлен в базу данных');
      }
    });
  },
  'click #history-link'(e, t)
  {
    e.preventDefault();
    FlowRouter.go(`/patientHistory/${FlowRouter.getParam('patientId')}`);
  }
});
