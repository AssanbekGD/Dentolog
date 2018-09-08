import {Mongo} from 'meteor/mongo';

export const Clinics = new Mongo.Collection('clinics');

if(Meteor.isServer)
{
  Meteor.publish('clinics', function clinicsPublication(){
    return Clinics.find();
  });

  Meteor.methods({
    'clinics.insert'(data)
    {
      Clinics.insert(data);
    },
    'clinics.delete'(data){
      Clinics.remove(data)
    }
  });
}
