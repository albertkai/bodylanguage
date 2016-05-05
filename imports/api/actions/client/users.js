import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { sendVerificationLink } from '../../methods/methods.js'
import { regMove, stepOneSave, regFinish, likeUserMethod } from '../../models/users/methods.js'

export const registerUser = (email, password)=> {

    console.log('Creating user')
    Accounts.createUser({email, password}, (error)=> {
        if (error) {
            Bert.alert(error.reason, 'danger')
            console.log(error)
        } else {
            sendVerificationLink.call({}, (err, res)=> {
                if (err) {
                    console.log(err)
                    Bert.alert(err.reason, 'danger')
                } else {
                    console.log('Verification sent')
                }
            })
        }
    })

}


export const registrationStep1 = (iam, interested, hereFor)=> {

    stepOneSave.call({iam, interested, hereFor}, (err)=>{
        if (err) {
            console.log('worked')
            console.log(err)
        } else {
            console.log('Registration step one saved')
        }
    })

}

export const registrationFinish = ()=> {

    regFinish.call({}, (err)=>{
        if (err) {
            console.log('worked')
            console.log(err)
        } else {
            console.log('Registration finished')
        }
    })

}

export const registrationMove = (step)=>{

    regMove.call({step}, (err)=>{
        if (err) {
            console.log('worked')
            console.log(err)
        } else {
            console.log('Registration moved')
        }
    })

}


export const login = (email, password)=> {

    Meteor.loginWithPassword(email, password, (err)=>{
        if (err) {
            console.log(err)
        } else {
            console.log('Logged in')
        }
    })

}


export const likeUser = (id)=> {

    likeUserMethod.call({id}, (err)=> {
        if (err) {
            console.log(err)
        } else {
            console.log('User liked')
        }
    })

}

export const openMessage = (id)=> {

    console.log('Sending message to ' + id)

}