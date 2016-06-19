import {Mongo} from 'meteor/mongo';

export const Symptoms = new Mongo.Collection('symptoms');

if(Meteor.isServer)
{
  Meteor.publish('symptoms', function symptomsPublication(){
    return Symptoms.find();
  });

  Meteor.methods({
    'symptoms.insert'(data)
    {
      Symptoms.insert(data);
    }
  });
}
