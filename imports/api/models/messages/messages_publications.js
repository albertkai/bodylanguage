import { Meteor } from 'meteor/meteor'
import Messages from './messages.js'

Meteor.publish('messages.threadMessages', ({threadId})=>{
    return Messages.find({threadId})
})