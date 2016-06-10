import './authorizeUser.html';

import {Template} from 'meteor/templating';

Template.authorizeUser.onRendered(function authorizeUserOnRendered(){

});

Template.authorizeUser.events({
  'click #auth-submit'(e, t)
  {
    e.preventDefault();

    const username = $('#auth-phone').val(),
          password = $('#auth-password').val();

     Meteor.loginWithPassword(username, password, function(err){
       if(err)
       {
         toastr.error(err.reason);
       }
       else
       {
         toastr.success(`${Meteor.user().username}, welcome!`);
         FlowRouter.go('/');
       }
     });
  }
});
