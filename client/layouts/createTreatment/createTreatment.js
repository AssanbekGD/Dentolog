import './createTreatment.html';
import {Template} from 'meteor/templating';
import {Treatments} from '../../../api/treatments.js';
import {ReactiveDict} from 'meteor/reactive-dict';

Meteor.subscribe('treatments');

Template.createTreatment.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

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

Template.createTreatment.events({
  'click .deleteTreatment': function (event,) {
  Meteor.call('treatments.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Удален');
    }
  })
}
});

Template.createTreatment.helpers({
  treatments: function () {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');
    return Treatments.find({name: regexp});
  }
});

Template.createTreatment.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});

Template.createTreatment.events({
  'input .name': function (event, instance) {
    instance.state.set('edittedTreatment', event.target.innerText);
  },
})

Template.createTreatment.events({
  'click .editTreatment': function (event) {
    const instance = Template.instance();
    const data = {
      id: this._id,
      name: instance.state.get('edittedTreatment')
    }
    Meteor.call('treatments.edit', data, function(err, result){
      if(err){
        toastr.error(err.reason);
      }
      else {
        toastr.success('Изменен');
      }
    })
  }
});
