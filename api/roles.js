import {Mongo} from 'meteor/mongo';

export const Roles = new Mongo.Collection('roles');

if(Meteor.isServer)
{
  Meteor.publish('roles', function rolesPublication(){
    return Roles.find();
  });

  Meteor.methods({
    'roles.insert'(data)
    {
      Roles.insert(data);
    }
  });
}
