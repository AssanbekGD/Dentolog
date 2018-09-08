import './createToothStatus.html';
import {Template} from 'meteor/templating';
import {ToothStatuses} from '../../../api/toothStatuses.js';
import {ReactiveDict} from 'meteor/reactive-dict';

Meteor.subscribe('toothStatuses');

Template.createToothStatus.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.createToothStatus.helpers({
  toothStatuses()
  {
    return ToothStatuses.find();
  },
  incIndex(i)
  {
    return i + 1;
  }
});

Template.createToothStatus.events({
  'click #cts-submit'(e, t)
  {
    e.preventDefault();

    const data = {
      name: $('#cts-name').val()
    };

    Meteor.call('toothStatuses.insert', data, function(err)
    {
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('статус зуба добавлен');
        $('#cdt-name').val('');
      }
    });
  }
});

Template.createToothStatus.events({
  'click .deleteStatus': function (event) {
  Meteor.call('toothStatuses.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Удален');
    }
  })
}
});

Template.createToothStatus.events({
  'input .name': function (event, instance) {
    instance.state.set('edittedStatus', event.target.innerText);
  },
})

Template.createToothStatus.events({
  'click .editStatus': function (event) {
    const instance = Template.instance();
    const data = {
      id: this._id,
      name: instance.state.get('edittedStatus')
    }
    Meteor.call('toothStatuses.edit', data, function(err, result){
      if(err){
        toastr.error(err.reason);
      }
      else {
        toastr.success('Изменен');
      }
    })
  }
});
