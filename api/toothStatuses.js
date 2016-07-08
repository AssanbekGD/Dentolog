import {Mongo} from 'meteor/mongo';

export const ToothStatuses = new Mongo.Collection('toothStatuses');

if(Meteor.isServer)
{
  Meteor.publish('toothStatuses', function toothStatusesPublication(){
    return ToothStatuses.find();
  });

  Meteor.methods({
    'toothStatuses.insert'(data)
    {
      return ToothStatuses.insert(data);
    }
  });
}
