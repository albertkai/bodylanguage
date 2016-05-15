import { Meteor } from 'meteor/meteor'
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
        type: Number,
        autoValue() {
            return Date.now()
        }
    }
    ,
    lastUpdated: {
        type: Number,
        autoValue() {
            return Date.now()
        }
    }
})

Likes.helpers({
    otherUserId() {
        return this.userId === Meteor.userId() ? this.likedUser : this.userId
    },
    userPics() {
        const userId = this.userId === Meteor.userId() ? this.likedUser : this.userId
        return Meteor.users.findOne(userId).profile.pics
    },
    location() {
        const userId = this.userId === Meteor.userId() ? this.likedUser : this.userId
        return Meteor.users.findOne(userId).profile.location
    },
    hereFor() {
        const userId = this.userId === Meteor.userId() ? this.likedUser : this.userId
        return Meteor.users.findOne(userId).profile.settings.hereFor
    }
})

export default Likes

