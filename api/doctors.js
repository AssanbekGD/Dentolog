import {Mongo} from 'meteor/mongo';

export const Doctors = new Mongo.Collection('doctors');

if(Meteor.isServer)
{
  Meteor.publish('doctors', function doctorsPublication(){
    return Doctors.find();
  });

  Meteor.methods({
    'doctors.insert'(data)
    {
      return Doctors.insert(data);
    },
    'doctors.delete'(data){
      Doctors.remove(data)
    }
  });



}
