import { Meteor } from 'meteor/meteor'
import Threads from './threads.js'
import Messages from '../messages/messages.js'
import _ from 'underscore'

export const setReadStatus = new ValidatedMethod({

    name: 'threads.setReadStatus',
    validate: null,
    run({id}) {

        const currentThreadUnread = _.where(Threads.findOne(id).members, {id: this.userId})[0].unread
        Threads.update({_id: id, 'members.id': this.userId}, {$set: {'members.$.unread': 0}})

        Messages.update({threadId: id, watched: {$ne: true}, authorId: {$ne: this.userId}}, {$set: {watched: true}}, {multi: true})

        const counter = Meteor.users.findOne(this.userId).profile.counts.messages
        let updatedCounter = counter - currentThreadUnread
        if (updatedCounter < 0) updatedCounter = 0
        Meteor.users.update(this.userId, {$set: {'profile.counts.messages': updatedCounter}})
        return console.log('Thread status and user counter updated!!')

    }

})

export const createThread = new ValidatedMethod({

    name: 'threads.createThread',
    validate: null,
    run({id}) {
        console.log('Creating new thread')
        const user1 = Meteor.users.findOne(this.userId)
        const user2 = Meteor.users.findOne(id)
        const members = [{id: user1._id}, {id: user2._id}]
        return Threads.insert({members, createdBy: user1._id})
    }

})

export const getExistingThread = new ValidatedMethod({

    name: 'threads.getExistingThread',
    validate: null,
    run({userId}) {
        console.log('Creating new thread')
        const thread = Threads.findOne({members: {$all: [{"$elemMatch": {id: this.userId}}, {"$elemMatch": {id: userId}}]}})
        if (thread) {
            console.log('Thread exists, its ID: ' + thread._id);
        }
        return thread;
    }

})