import { Meteor } from 'meteor/meteor'
import { notify } from './notify.js'

export const likeUser = (id)=> {

    Meteor.call('likes.likeUser', {id}, (err, isLiked)=> {
        if (err) {
            console.log(err)
        } else {
            if (isLiked) {
                console.log('User liked')
                notify({header: 'Hooray!', text: 'User is liked', type: 'success'})
            } else {
                console.log('Cant like the user twice')
                notify({header: 'Ooops!', text: 'Cant like the user twice', type: 'error'})
            }
        }
    })

}