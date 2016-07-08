import {Template} from 'meteor/templating';
import {ToothStatuses} from '../../../api/toothStatuses';

Template.createToothStatus.helpers({
  toothStatuses()
  {
    return toothStatuses.find();
  }
});

Template.createDoctorType.events({
  'click #cts-submit'(e, t)
  {
    e.preventDefault();

    const data = {
      name: $('#cts-name').val()
    };

    Meteor.call('toothStatuses.insert', data, function(err)
    {
      if(err)
      {
        toastr.error(err.reason);
      }
      else
      {
        toastr.success('статус зуба добавлен');
        $('#cdt-name').val('');
      }
    });
  }
});
