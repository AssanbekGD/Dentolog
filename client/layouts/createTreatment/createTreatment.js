import './createTreatment.html';
import {Template} from 'meteor/templating';
import {Treatments} from '../../../api/treatments.js';

Meteor.subscribe('treatments');

Template.createTreatment.helpers({
  treatments()
  {
    return Treatments.find();
  },
  incIndex(index)
  {
    return ++index;
  }
});

Template.createTreatment.events({
  'submit #ct-form'(e, t)
  {
    e.preventDefault();

    const $treatmentName = $('#ct-treatment-name'),
          name = $treatmentName.val();

    Meteor.call('treatments.insert', {name});
    $treatmentName.val('');
  }
});
