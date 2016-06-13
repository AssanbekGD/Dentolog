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
  'submit #cd-form'(e, t)
  {
    e.preventDefault();

    const $phone = $('#cd-phone'),
          $email = $('#cd-email'),
          $name = $('#cd-name'),
          $surname = $('#cd-surname'),
          $clinic = $("#cd-clinic"),
          $doctorType = $("#cd-doctor-type"),
          data = {
            phone: $phone.val(),
            email: $email.val(),
            name: $name.val(),
            surname: $surname.val(),
            clinic: $clinic.val(),
            doctorType: $doctorType.val()
          };

    Meteor.call('doctors.insert', data, function(err){
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('новый врач добавлен');
        $phone.val('');
        $email.val('');
        $name.val('');
        $surname.val('');
        $clinic.val('');
        $doctorType.val('');
      }
    });
  }
});
