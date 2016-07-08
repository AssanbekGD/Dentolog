import './createDoctorType.html';
import {DoctorTypes} from '../../../api/doctorTypes.js';
import {Template} from 'meteor/templating';

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
