import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

export const sendVerificationLink = new ValidatedMethod({
    name: 'sendVerificationLink',
    validate: null,
    run() {
        console.log('Validated method')
        if (Meteor.isServer) {
            Accounts.sendVerificationEmail(this.userId)
        }
    }
})

export const savePic = new ValidatedMethod({
    name: 'uploadPic',
    validate: null,
    run({name}) {
        console.log('saving path')
        console.log(name)
        Meteor.users.update(this.userId, {
            $push: {
                'profile.pics': {name: name, order: 1}
            }
        })
    }
})


export const deletePic = new ValidatedMethod({
    name: 'removePic',
    validate: null,
    run({pic}) {
        if (Meteor.isServer) {
            //var client = s3.createClient({
            //    s3Options: {
            //        accessKeyId: Meteor.settings.AWSAccessKeyId,
            //        secretAccessKey: Meteor.settings.AWSSecretAccessKey
            //    },
            //})
            Meteor.users.update(this.userId, {$pull: {'profile.pics': pic}})

        }
    }
})