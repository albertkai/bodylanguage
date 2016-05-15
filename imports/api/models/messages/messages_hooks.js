import { Meteor } from 'meteor/meteor'
import Messages from './messages.js'
import Threads from '../threads/threads.js'
import _ from 'underscore'

Messages.after.insert((userId, doc)=> {

    // First set a threads last message with a newly sent message

    const lastMessage = {
        message: doc.message,
        date: doc.date,
        type: doc.type
    }
    Threads.update(doc.threadId, {$set: {lastMessage}})

    // Then update users unread counter

    const members = Threads.findOne(doc.threadId).members
    const otherUser = _.reject(members, m => m.id === userId)[0]
    Meteor.users.update(otherUser.id, {$inc: {'profile.counts.messages': 1}})

    console.log('Threads last message and users unread counter updated!')

});