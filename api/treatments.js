import {Mongo} from 'meteor/mongo';

export const Treatments = new Mongo.Collection('treatments');

if(Meteor.isServer)
{
  Meteor.publish('treatments', function treatmentsPublication(){
    return Treatments.find();
  });

  Meteor.methods({
    'treatments.insert'(data)
    {
      Treatments.insert(data);
    },
    'treatments.delete'(data){
      Treatments.remove(data)
    },
    'treatments.edit'(data)
    {
      Treatments.update(data.id, {
      $set: { name: data.name},
    });
  }
  });
}
