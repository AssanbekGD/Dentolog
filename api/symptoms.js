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
    },
    'symptoms.delete'(data)
    {
      Symptoms.remove(data);
    },
    'symptoms.edit'(data)
    {
      Symptoms.update(data.id, {
      $set: { name: data.name},
    });
  }});
}
