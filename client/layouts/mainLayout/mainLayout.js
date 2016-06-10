import './mainLayout.html';
import {Template} from 'meteor/templating';

Template.mainLayout.events({
  'click #logout-button'(e, t)
  {
    e.preventDefault();

    Meteor.logout(function(err){
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('До свидания!')
      }
    })
  }
});
