import './createSymptom.html';
import {Template} from 'meteor/templating';
import {Symptoms} from '../../../api/symptoms.js';
import {ReactiveDict} from 'meteor/reactive-dict';


Meteor.subscribe('symptoms');

Template.createSymptom.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});
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

Template.createSymptom.events({
  'click .deleteSymptom': function (event,) {
  Meteor.call('symptoms.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Удален');
    }
  })
}
});

Template.createSymptom.helpers({
  symptoms: function () {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');
    return Symptoms.find({name: regexp});
  }
});

Template.createSymptom.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});

Template.createSymptom.events({
  'input .name': function (event, instance) {
    instance.state.set('edittedSymptom', event.target.innerText);
  },
})

Template.createSymptom.events({
  'click .editSymptom': function (event) {
    const instance = Template.instance();
    const data = {
      id: this._id,
      name: instance.state.get('edittedSymptom')
    }
    Meteor.call('symptoms.edit', data, function(err, result){
      if(err){
        toastr.error(err.reason);
      }
      else {
        toastr.success('Изменен');
      }
    })
  }
});
