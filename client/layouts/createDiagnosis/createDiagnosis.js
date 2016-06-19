import './createDiagnosis.html';
import {Template} from 'meteor/templating';
import {Diagnoses} from '../../../api/diagnoses.js';

Meteor.subscribe('diagnoses');

Template.createDiagnosis.helpers({
  diagnoses()
  {
    return Diagnoses.find();
  },
  incIndex(index)
  {
    return ++index;
  }
});

Template.createDiagnosis.events({
  'submit #cd-form'(e, t)
  {
    e.preventDefault();

    const $diagnosisName = $('#cd-diagnosis-name'),
          name = $diagnosisName.val();

    Meteor.call('diagnoses.insert', {name});
    $diagnosisName.val('');
  }
});
