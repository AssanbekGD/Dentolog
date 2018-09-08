import './createDiagnosis.html';
import {Template} from 'meteor/templating';
import {Diagnoses} from '../../../api/diagnoses.js';
import {ReactiveDict} from 'meteor/reactive-dict';

Meteor.subscribe('diagnoses');

Template.createDiagnosis.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

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

Template.createDiagnosis.events({
  'click .deleteDiagnos': function (event,) {
  Meteor.call('diagnoses.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Удален');
    }
  })
}
});


Template.createDiagnosis.helpers({
  diagnoses: function () {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');
    return Diagnoses.find({name: regexp});
  }
});

Template.createDiagnosis.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});


Template.createDiagnosis.events({
  'input .name': function (event, instance) {
    instance.state.set('edittedDiagnosis', event.target.innerText);
  },
})

Template.createDiagnosis.events({
  'click .editDiagnos': function (event) {
    const instance = Template.instance();
    const data = {
      id: this._id,
      name: instance.state.get('edittedDiagnosis')
    }
    Meteor.call('diagnoses.edit', data, function(err, result){
      if(err){
        toastr.error(err.reason);
      }
      else {
        toastr.success('Изменен');
      }
    })
  }
});
