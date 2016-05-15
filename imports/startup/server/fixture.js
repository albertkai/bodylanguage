import { Meteor } from 'meteor/meteor'
import Messages from '../../api/models/messages/messages.js'
import Threads from '../../api/models/threads/threads.js'
import Likes from '../../api/models/likes/likes.js'

Threads.find().forEach(thread => Threads.remove(thread._id))
Messages.find().forEach(message => Messages.remove(message._id))
Likes.find().forEach(like => Likes.remove(like._id))

Meteor.users.find().forEach((user)=>{

    const id = user._id
    Meteor.users.find({_id: {$ne: id}}).forEach((u, index)=>{
        const members = [{id}, {id: u._id}]
        const threadId = Threads.insert({members, createdBy: id})
        Messages.insert({authorId: id, threadId, message: 'Hello, how r u?', type: 'text'})
        Messages.insert({authorId: u._id, threadId, message: 'Fine, thnx, u?', type: 'text'})
        Messages.insert({authorId: id, threadId, message: 'Great! See u today?', type: 'text'})
        Likes.insert({
            userId: index < 10 ? id : u._id,
            likedUser: index >= 10 ? id : u._id,
            isMutual: index < 3
        })

    })

})





