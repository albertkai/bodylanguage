import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Likes = new Mongo.Collection('likes')

Likes.schema = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    likedUser: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    isMutual: {
        type: Boolean,
        defaultValue: false
    },
    createdAt: {
        type: Number
    },
    lastUpdated: {
        type: Number
    }
})

export default Likes

