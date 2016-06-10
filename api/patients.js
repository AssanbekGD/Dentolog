import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Patients = new Mongo.Collection('patients');

if(Meteor.isServer)
{
  Meteor.publish('patients', function patientsPublication()
  {
    return Patients.find();
  })

  Meteor.methods({
    'patients.insert'(data)
    {
      Patients.insert(data);
    }
  });
}
