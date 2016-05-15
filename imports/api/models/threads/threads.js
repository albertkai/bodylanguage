import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Threads = new Mongo.Collection('threads')

Threads.schema = new SimpleSchema({

    'members.$.id': {
        type: String,
        regEx: SimpleSchema.RegEx.Id

    },
    'members.$.unread': {
        type: Number,
        defaultValue: 0
    },
    lastMessage: {
        type: [String],
        optional: true
    },
    createdAt: {
        type: Number,
        autoValue() {
            return Date.now()
        }
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
})

Threads.helpers({

    pic() {
        const userId = this.members.find(m => m.id !== Meteor.userId()).id
        const user = Meteor.users.findOne({_id: userId}, {fields: {'profile.pics': 1}})
        const pics = user.profile.pics.sort(u => u.order)[0].name
        return pics
    }

})

export default Threads