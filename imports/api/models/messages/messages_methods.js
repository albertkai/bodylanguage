import { Meteor } from 'meteor/meteor'
import Messages from './messages.js'

export const sendMessageMethod = new ValidatedMethod({
    name: 'messages.sendMessage',
    validate: null,
    run({message, type, threadId}) {
        Messages.insert({
            authorId: this.userId,
            threadId,
            message,
            type
        })
    }
})

export const removeMessageMethod = new ValidatedMethod({
    name: 'messages.removeMessage',
    validate: null,
    run({messageId}) {
        const message = Messages.findOne({_id: messageId})
        if (this.userId === message.authorId) Messages.remove(messageId)
        else throw new Meteor.Error(403,'You have no rights to delete messages')
    }
})