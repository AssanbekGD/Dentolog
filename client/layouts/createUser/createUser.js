import './createUser.html';

import {Template} from 'meteor/templating';

Template.createUser.events({
  'click #register-submit'(e, t)
  {
    e.preventDefault();

    const user = {
      username: $("#register-phone").val(),
      email: $("#register-email").val(),
      password: $("#register-password").val()
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
