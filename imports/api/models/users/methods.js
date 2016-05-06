import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

export const stepOneSave = new ValidatedMethod({
    name: 'stepOneSave',
    validate: null,
    run({iam, interested, hereFor}) {
        Meteor.users.update(this.userId, {$set: {
            'profile.settings.iam': iam,
            'profile.settings.interested': interested,
            'profile.settings.hereFor': hereFor,
            'profile.registration.step': 'step2'
        }})
    }
})

export const regFinish = new ValidatedMethod({
    name: 'regFinish',
    validate: null,
    run() {
        console.log('finishing registration')
        Meteor.users.update(this.userId, {$set: {'profile.registration.isRegistered': true}})
    }
})

export const regMove = new ValidatedMethod({
    name: 'regMove',
    validate: null,
    run({step}) {
        console.log('registration back')
        Meteor.users.update(this.userId, {$set: {'profile.registration.step': step}})
    }
})

export const saveGeoPosition = new ValidatedMethod({
    name: 'saveGeoPosition',
    validate: null,
    run({lat, lng}) {
        console.log('Saving location')
        Meteor.users.update(this.userId, {$set: {
            'profile.location': {lat, lng}
        }})
    }
})

export const expandRadius = new ValidatedMethod({
    name: 'expandRadius',
    validate: null,
    run() {
        console.log('Expanding radius')
        Meteor.users.update(this.userId, {$inc: {
            'profile.settings.radius': 3000
        }})
    }
})

export const likeUserMethod = new ValidatedMethod({
    name: 'users.likeUser',
    validate: null,
    run({id}) {
        console.log('Like user with id: ' + id)
    }
})

export const updateSettingsFieldMethod = new ValidatedMethod({
    name: 'users.updateSettingsField',
    validate: null,
    run({fieldName, value}) {
        console.log('Updating setitngs field')
        console.log('Expanding radius')
        Meteor.users.update(this.userId, {$set: {
            ["profile.settings." + fieldName]: value
        }})
    }
})