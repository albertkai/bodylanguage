import { Meteor } from 'meteor/meteor'
import Likes from './likes.js'

Meteor.publishComposite('likes.allLikes', {
    find: function(){
        const userId = this.userId
        return Likes.find({$or: [{userId}, {likedUser: userId}]})
    },
    children: [{
        find: function(like){
            const isLiked = like.likedUser === this.userId
            const userId = isLiked ? like.userId : like.likedUser
            return Meteor.users.find({_id: userId}, {fields: {
                'profile.pics': 1,
                'profile.location': 1,
                'profile.settings.hereFor': 1
            }})
        }
    }]
})