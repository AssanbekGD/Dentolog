import {Mongo} from 'meteor/mongo';

export const Appointments = new Mongo.Collection('appointments');

if(Meteor.isServer)
{
  Meteor.publish('appointments', function appointmentsPublication(){
    return Appointments.find();
  });

  Meteor.methods({
    'appointments.insert'(data)
    {
      Appointments.insert(data);
    }
  });
}
