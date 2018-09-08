import {Mongo} from 'meteor/mongo';

export const DoctorTypes = new Mongo.Collection('doctorTypes');

if(Meteor.isServer)
{
  Meteor.publish('doctorTypes', function doctorTypesPublication(){
    return DoctorTypes.find();
  });

  Meteor.methods({
    'doctorTypes.insert'(data)
    {
      return DoctorTypes.insert(data);
    },
    'doctorTypes.delete'(data){
      DoctorTypes.remove(data)
    },
    'doctorTypes.edit'(data)
    {
      DoctorTypes.update(data.id, {
      $set: { name: data.name},
    });
  }
  });
}
