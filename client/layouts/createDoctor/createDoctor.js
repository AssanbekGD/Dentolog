import './createDoctor.html';

import {Template} from 'meteor/templating';

Template.createDoctor.events({
  'click #cd-submit-button'(e, t)
  {
    const data = {
      phone: $('#cd-phone').val(),
      email: $('#cd-email').val(),
      fullName: $('#cd-full-name').val()
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
