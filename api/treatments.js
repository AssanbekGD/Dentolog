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
    }
  });
}
