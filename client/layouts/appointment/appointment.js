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
      $(".diagnoses-list").select2();
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
      $(".treatments-list").select2();
    }
  });

  $('#finish-button').parent().hide();
  $('#add-treatment-group-button').parent().hide();
});

Template.appointment.helpers({
  patientId()
  {
    return Session.get('currentPatient')._id;
  },
  patientName()
  {
    const name = Session.get('currentPatient').name,
          surname = Session.get('currentPatient').surname;

    return `${name} ${surname}`;
  },
  treatments()
  {
    return Treatments.find();
  },
  diagnoses()
  {
    return Diagnoses.find();
  },
  symptoms()
  {
    return Symptoms.find();
  },
  treatmentGroupIndex(index)
  {
    return index + 1;
  }
});


Template.appointment.events({
  'click #start-button'(e, t)
  {
    e.preventDefault();

    $('select, input').removeAttr('disabled');
    $('select').select2({});
    $('#finish-button').parent().show();
    $('#add-treatment-group-button').parent().show();
    $('#start-button').parent().hide();

    let now = moment().format();
    Session.set('startTime', now);
  },
  'submit #create-appointment-form'(e, t)
  {
    e.preventDefault();

    const $symptoms = $("#symptoms-list"),
          symptoms = $symptoms.val(),
          startTime = Session.get('startTime'),
          endTime = moment().format(),
          patientId = FlowRouter.getParam('patientId'),
          doctorId = FlowRouter.getQueryParam('doctorId'),
          $treatmentGroups = $('.treatment-group'),
          treatmentGroups = [];

    for(let i = 0, len = $treatmentGroups.length; i < len; i ++)
    {
      treatmentGroups.push({
        toothNumber: $($treatmentGroups[i]).find('.toothNumber').val(),
        diagnoses: $($treatmentGroups[i]).find('.diagnoses-list').val(),
        treatments: $($treatmentGroups[i]).find('.treatments-list').val()
      });
    }

    data = {symptoms, treatmentGroups, startTime, endTime, patientId, doctorId};

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
  },
  'click #add-treatment-group-button'(e, t)
  {
    e.preventDefault();

    let $lastTreatmentGroup = $('.treatment-group').last(),
        $ltgClone = $lastTreatmentGroup.clone();

    $lastTreatmentGroup.after($ltgClone);
    $ltgClone.find('.toothNumber').val('');
    $ltgClone.find('.select2.select2-container').remove();
    $ltgClone.find('select').select2();

    let headerText = $ltgClone.find('h4').html(),
        treatmentLabel = headerText.split(' ')[0],
        treatmentNumber = parseInt(headerText.split(' ')[1]);

    $ltgClone.find('h4').html(`${treatmentLabel} ${++treatmentNumber}`);
  }
});