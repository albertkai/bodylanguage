import { Meteor } from 'meteor/meteor'
import { getEdgeValues } from '../../misc/utils.js'

Meteor.publish('users.around', function(){

    const user = Meteor.users.findOne(this.userId)
    const radius = user.profile.settings.radius
    const lat = user.profile.location.lat
    const lng = user.profile.location.lng
    const pos = getEdgeValues(lat, lng, radius)

    //return Meteor.users.find({
    //    '_id': {$ne: this.userId},
    //    'profile.location.lat': {$gte: pos.latRange.min, $lte: pos.latRange.max},
    //    'profile.location.lng': {$gte: pos.lngRange.min, $lte: pos.lngRange.max}
    //})

    return Meteor.users.find()


})