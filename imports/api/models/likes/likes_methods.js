import { Meteor } from 'meteor/meteor'
import Likes from './likes.js'

export const likeUserMethod = new ValidatedMethod({
    name: 'likes.likeUser',
    validate: null,
    run({id}) {
        console.log('Like user with id: ' + id)
        if (!Likes.findOne({userId: this.userId, likedUser: id})) {
            console.log('Can like')
            const isMutual = !!Likes.findOne({likedUser: this.userId, userId: id})
            Likes.insert({
                userId: this.userId,
                likedUser: id,
                isMutual
            })
            if (isMutual) {
                console.log('Updating')
                Likes.update({likedUser: this.userId, userId: id}, {$set: {isMutual: true}})
            }
            return true
        } else {
            console.log('Cant like')
            return false
        }
    }
})