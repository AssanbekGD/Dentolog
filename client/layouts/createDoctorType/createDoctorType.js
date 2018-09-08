import './createDoctorType.html';
import {DoctorTypes} from '../../../api/doctorTypes.js';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';


Template.createDoctorType.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.createDoctorType.helpers({
  doctorTypes()
  {
    return DoctorTypes.find();
  },
  incIndex(i)
  {
    return i + 1;
  }
});

Template.createDoctorType.events({
  'click #cdt-submit'(e, t)
  {
    e.preventDefault();

    const data = {
      name: $('#cdt-name').val()
    };

    Meteor.call('doctorTypes.insert', data, function(err)
    {
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('вид клиники добавлен');
        $('#cdt-name').val('');
      }
    });
  }
});

Template.createDoctorType.events({
  'click .deleteDoctorType': function (event,) {
  Meteor.call('doctorTypes.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Удален');
    }
  })
}
});

Template.createDoctorType.helpers({
  doctorTypes: function () {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');
    return DoctorTypes.find({name: regexp});
  }
});

Template.createDoctorType.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});


Template.createDoctorType.events({
  'input .name': function (event, instance) {
    instance.state.set('edittedDoctorType', event.target.innerText);
  },
})

Template.createDoctorType.events({
  'click .editDoctorType': function (event) {
    const instance = Template.instance();
    const data = {
      id: this._id,
      name: instance.state.get('edittedDoctorType')
    }
    Meteor.call('doctorTypes.edit', data, function(err, result){
      if(err){
        toastr.error(err.reason);
      }
      else {
        toastr.success('Изменен');
      }
    })
  }
});
