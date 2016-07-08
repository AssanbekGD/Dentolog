import './createToothStatus.html';
import {Template} from 'meteor/templating';
import {ToothStatuses} from '../../../api/toothStatuses.js';

Meteor.subscribe('toothStatuses');

Template.createToothStatus.helpers({
  toothStatuses()
  {
    return ToothStatuses.find();
  },
  incIndex(i)
  {
    return i + 1;
  }
});

Template.createToothStatus.events({
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
