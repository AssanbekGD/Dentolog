import './createRole.html';
import {Template} from 'meteor/templating';
import {Roles} from '../../../api/roles.js';

Meteor.subscribe('roles');

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
