import './createUser.html';

import {Template} from 'meteor/templating';
import {Clinics} from '../../../api/clinics.js';

Meteor.subscribe('clinics');

Template.createUser.helpers({
  clinics(){
    return Clinics.find();
  }
});

Template.createUser.events({
  'click #register-submit'(e, t)
  {
    e.preventDefault();

    const user = {
      username: $("#register-phone").val(),
      email: $("#register-email").val(),
      password: $("#register-password").val(),
      profile: {
        clinic: $("#register-clinic").val()
      }
    };

    Accounts.createUser(user, function(err){
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success(`user ${Meteor.user().username} created`);
        FlowRouter.go('/');
      }
    });
  }
});
