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
            const cursor = Meteor.users.find(userId)
            return cursor
        }
    }]
})

//Meteor.publish('likes.allLikes', function(){
//    const userId = this.userId
//    //return Likes.find({$or: [{userId}, {likedUser: userId}]})
//    //return Likes.find({likedUser: userId})
//    return Likes.find()
//})