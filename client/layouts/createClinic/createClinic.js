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
        toastr.success('Клиника добавлена');
        $("#cc-name").val('');
        $("#cc-website").val('');
        $("#cc-address").val('');
      }
    });
    Template.createClinic.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },
});

    $("#cc-name").val('');
    $("#cc-website").val('');
    $("#cc-address").val('');
  }
});

Template.createClinic.events({
  'click .deleteClinic': function (event,) {
  Meteor.call('clinics.delete', this._id, function(err, result){
    if(err){
      toastr.error(err.reason);
    }
    else {
      toastr.success('Клиника удалена');
    }
  })
}
});

Template.createClinic.helpers({
  clinics: function () {
    var regexp = new RegExp(Session.get('search/keyword'), 'i');
    return Clinics.find({name: regexp});
  }
});

Template.createClinic.events({
  'keyup #search': function(event) {
    Session.set('search/keyword', event.target.value);
  }
});
