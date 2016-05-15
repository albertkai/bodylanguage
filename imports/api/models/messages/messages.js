import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Messages = new Mongo.Collection('messages')

Messages.schema = new SimpleSchema({
    authorId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    threadId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    date: {
        type: Number,
        autoValue() {
            return new Date.now()
        },
        denyUpdate: true
    },
    watched: {
        type: Boolean,
        defaultValue: false
    },
    message: {
        type: String,
        max: 30000
    },
    type: {
        type: String,
        allowedValues: ['text', 'file']
    },
    attach: {
        type: Object,
        optional: true
    }
})

export default Messages