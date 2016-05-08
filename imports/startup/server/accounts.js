import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Accounts.onCreateUser(function(options, user){
    console.log('Creating new user')
    user.profile = {
        registration: {
            isRegistered: false,
            step: 'start'
        },
        settings: {
            iam: 'male',
            interested: 'female',
            hereFor: {
                sex: true,
                relationships: true,
                communication: false,
                watchup: true
            },
            searchFor: {
                sex: true,
                relationships: true,
                communication: false,
                watchup: true
            },
            radius: 50000
        },
        pics: [],
        counts: {
            messages: 0,
            likes: 0,
            mutialLikes: 0
        }
    }
    return user
})


Accounts.emailTemplates.siteName = "B O D Y L A N G U A G E";
Accounts.emailTemplates.from     = "<info@bodylanguageapp.com>";

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return "Verify Your Email Address";
    },
    text( user, url ) {
        let emailAddress   = user.emails[0].address,
            urlWithoutHash = url.replace( '#/', '' ),
            supportEmail   = "support@bodylanguageapp.com",
            emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

        return emailBody;
    }
};