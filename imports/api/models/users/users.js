import { Meteor } from 'meteor/meteor'
import Likes from '../likes/likes.js'

const userFilter = new SimpleSchema({
    communication: {
        type: Boolean,
        defaultValue: true
    },
    relationships: {
        type: Boolean,
        defaultValue: true
    },
    sex: {
        type: Boolean,
        defaultValue: true
    },
    watchup: {
        type: Boolean,
        defaultValue: true
    }
})

const userSettings = new SimpleSchema({
    iam: {
        type: String,
        allowedValues: ['male', 'female']
    },
    interested: {
        type: String,
        allowedValues: ['male', 'female']
    },
    radius: {
        type: Number,
        defaultValue: 50000
    },
    filter: {
        type: userFilter
    },
    hereFor: {
        type: userFilter
    },
    searchFor: {
        type: userFilter
    }

})

const userProfile = new SimpleSchema({
    'counts.likes': {
        type: Number
    },
    'counts.messages': {
        type: Number
    },
    'location.lat': {
        type: Number
    },
    'location.lng': {
        type: Number
    },
    pic: {
        type: [String]
    },
    'registration.isRegistered': {
        type: Boolean
    },
    'registration.step': {
        type: String,
        allowedValues: ['start', 'step1', 'step2']
    },
    'settings': {
        type: userSettings
    }
})

Meteor.users.schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/,
        custom: function () {
            console.log(this);
        }
    },
    emails: {
        optional: true,
        type: [Object],
        custom: function () {
            console.log(this);
        }
    },
    "emails.$.address": {
        optional: true,
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        optional: true,
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: userProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    password: {
        type: String,
        blackbox: true
    }
})


