import { Meteor } from 'meteor/meteor'
import Threads from './threads.js'

Meteor.publishComposite('threads.userThreads', {
    find: function(){
        const userId = this.userId
        return Threads.find({'members.id': userId})
    },
    children: [{
        find: function(thread){
            const otherUser = thread.members.filter(m => m.id !== this.userId)[0]
            return Meteor.users.find({_id: otherUser.id})
        }
    }]
})