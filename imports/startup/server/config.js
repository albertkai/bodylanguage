import { Streamy } from 'meteor/yuukan:streamy'

process.env.MAIL_URL = Meteor.settings.mailURL

Streamy.BroadCasts.allow = (data, from)=>{
    return true
}