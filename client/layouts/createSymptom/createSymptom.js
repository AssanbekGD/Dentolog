import './createSymptom.html';
import {Template} from 'meteor/templating';
import {Symptoms} from '../../../api/symptoms.js';

Meteor.subscribe('symptoms');

Template.createSymptom.helpers({
  symptoms()
  {
    return Symptoms.find();
  },
  incIndex(index)
  {
    return ++index;
  }
});

Template.createSymptom.events({
  'submit #cs-form'(e, t)
  {
    e.preventDefault();

    const $symptomName = $('#cs-symptom-name'),
          name = $symptomName.val();

    Meteor.call('symptoms.insert', {name});
    $symptomName.val('');
  }
});
