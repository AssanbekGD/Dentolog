import {Mongo} from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

if(Meteor.isServer){
  Meteor.publish('events', function eventsPublication(){
    return Events.find();
  });

  Meteor.methods({
    'events.insert'(data)
    {
      return Events.insert(data);
    },
    'events.update'(id, start, end, resourceId)
    {
      Events.update({_id: id},
      {
        $set: {
          start: start,
          end: end,
          resourceId: resourceId
        }
      });
    },
    'events.remove'(id)
    {
      Events.remove({_id: id});
    }
  });
};
