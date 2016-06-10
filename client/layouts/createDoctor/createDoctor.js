import './createDoctor.html';

import {Template} from 'meteor/templating';
import {Clinics} from '../../../api/clinics.js';
import {DoctorTypes} from '../../../api/doctorTypes.js';

Meteor.subscribe('clinics');
Meteor.subscribe('doctorTypes');

Template.createDoctor.helpers({
  clinics()
  {
    return Clinics.find();
  },
  doctorTypes()
  {
    return DoctorTypes.find();
  }
});

Template.createDoctor.events({
  'click #cd-submit-button'(e, t)
  {
    const data = {
      phone: $('#cd-phone').val(),
      email: $('#cd-email').val(),
      fullName: $('#cd-full-name').val(),
      clinic: $("#cd-clinic").val(),
      doctorType: $("#cd-doctor-type").val()
    };

    Meteor.call('doctors.insert', data, function(err){
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('новый врач добавлен');
        $('#cd-phone').val('');
        $('#cd-email').val('');
        $('#cd-full-name').val('');
      }
    });
  }
});
