import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Patients = new Mongo.Collection('patients');

if(Meteor.isServer)
{
  Meteor.publish('patients', function patientsPublication()
  {
    return Patients.find();
  });

  Patients.allow({
    insert(){
      return true; //edit this before production
    }
  });

  Meteor.methods({
    'patients.insert'(data)
    {
      return Patients.insert(data);
    }
  });
}
