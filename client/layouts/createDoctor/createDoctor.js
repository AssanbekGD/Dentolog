import './createDoctor.html';

import {Template} from 'meteor/templating';
import {Clinics} from '../../../api/clinics.js';
import {DoctorTypes} from '../../../api/doctorTypes.js';
import {Doctors} from '../../../api/doctors.js';

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
  },
  getDoctorType(_id)
  {
    doctorType = DoctorTypes.findOne({_id});
    return doctorType.name;
  },
  getClinic(_id)
  {
    clinic = Clinics.findOne({_id});
    return clinic.name;
  },
  doctors()
  {
    return Doctors.find();
  },
  incIndex(i)
  {
    return i + 1;
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
        toastr.success('Новый врач добавлен');
        $phone.val('');
        $email.val('');
        $name.val('');
        $surname.val('');
      }
    });
  }


});

Template.createDoctor.events({
  'click .deleteDoctor': function (event,) {
  Meteor.call('doctors.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Врач удален');
    }
  })
}
});


Template.createDoctor.helpers({
  doctors: function () {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');
    return Doctors.find({name: regexp});
  }
});

Template.createDoctor.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});
