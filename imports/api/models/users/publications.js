import { Meteor } from 'meteor/meteor'
import { getEdgeValues } from '../../misc/utils.js'
import Likes from '../likes/likes.js'

//Meteor.publish('users.around', function(){
//
//    const user = Meteor.users.findOne(this.userId)
//    const radius = user.profile.settings.radius
//    const lat = user.profile.location.lat
//    const lng = user.profile.location.lng
//    const pos = getEdgeValues(lat, lng, radius)
//
//    return Meteor.users.find({
//        '_id': {$ne: this.userId},
//        'profile.location.lat': {$gte: pos.latRange.min, $lte: pos.latRange.max},
//        'profile.location.lng': {$gte: pos.lngRange.min, $lte: pos.lngRange.max}
//    })
//
//    return Meteor.users.find()
//
//
//})


Meteor.publishComposite('users.around', {
    find: function(){
        return Meteor.users.find()
    },
    children: [{
        find: function(user){
            return Likes.find({$or: [{userId: this.userId, likedUser: user._id}, {userId: user._id, likedUser: this.userId}]})
        }
    }]
})