import './createRole.html';
import {Template} from 'meteor/templating';
import {Roles} from '../../../api/roles.js';
import {ReactiveDict} from 'meteor/reactive-dict';

Meteor.subscribe('roles');

Template.createRole.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.createRole.helpers({
  roles()
  {
    return Roles.find();
  },
  incIndex(index)
  {
    return ++index;
  }
});

Template.createRole.events({
  'submit #cr-form'(e, t)
  {
    e.preventDefault();

    const $roleName = $('#cr-role-name'),
          name = $roleName.val();

    Meteor.call('roles.insert', {name});
    $roleName.val('');
  }
});

Template.createRole.events({
  'click .deleteRole': function (event,) {
  Meteor.call('role.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Удален');
    }
  })
}
});

Template.createRole.events({
  'input .name': function (event, instance) {
    instance.state.set('edittedRoles', event.target.innerText);
  },
})

Template.createRole.events({
  'click .editRole': function (event) {
    const instance = Template.instance();
    const data = {
      id: this._id,
      name: instance.state.get('edittedRoles')
    }
    Meteor.call('roles.edit', data, function(err, result){
      if(err){
        toastr.error(err.reason);
      }
      else {
        toastr.success('Изменен');
      }
    })
  }
});
