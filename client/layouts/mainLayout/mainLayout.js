import './mainLayout.html';
import {Template} from 'meteor/templating';
import {Clinics} from '../../../api/clinics.js';

Meteor.subscribe('clinics');

Template.mainLayout.helpers({
  clinic: function(){
    return Clinics.find({_id: Meteor.user().profile.clinic});
  }
});

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
