import {Mongo} from 'meteor/mongo';

export const Diagnoses = new Mongo.Collection('diagnoses');

if(Meteor.isServer)
{
  Meteor.publish('diagnoses', function diagnosesPublication(){
    return Diagnoses.find();
  });

  Meteor.methods({
    'diagnoses.insert'(data)
    {
      Diagnoses.insert(data);
    }
  });
}
