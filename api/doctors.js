import {Mongo} from 'meteor/mongo';

const Doctors = new Mongo.Collection('doctors');

if(Meteor.isServer)
{
  Meteor.methods({
    'doctors.insert'(data)
    {
      Doctors.insert(data);
    }
  });
}
