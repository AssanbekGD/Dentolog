import './createClinic.html';
import {Template} from 'meteor/templating';
import {Clinics} from '../../../api/clinics.js';

Meteor.subscribe('clinics');

Template.createClinic.helpers({
  clinics()
  {
    return Clinics.find();
  },
  incIndex(i)
  {
    return i + 1;
  }
});

Template.createClinic.events({
  'click #cc-submit'(e, t)
  {
    e.preventDefault();

    const data = {
      name: $("#cc-name").val(),
      website: $("#cc-website").val(),
      address: $("#cc-address").val()
    };

    Meteor.call('clinics.insert', data, function(err){
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('клиника добавлена');
        $("#cc-name").val('');
        $("#cc-website").val('');
        $("#cc-address").val('');
      }
    });

    $("#cc-name").val('');
    $("#cc-website").val('');
    $("#cc-address").val('');
  }
});
