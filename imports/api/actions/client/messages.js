import { Meteor } from 'meteor/meteor'
import store from '../../client/stores/store.js'

export const openThread = ({userId, threadId})=>{

    // First cjeck if a thread already exists, then
    // if doesnt exist - create new one and set stores threadId with its id,
    // else - get an existing thread id and set it either.
    // All the UI machinery of opening a needed views is tied to stores reactive "threadId"

    if (userId) {

        Meteor.call('threads.getExistingThread', {userId}, (err, thread)=>{
            if (err) {
                console.log(err)
            } else {
                if (thread) {
                    console.log('Thread exists')
                    store.threadId.set(thread._id)
                } else {
                    console.log('Thread doesnt exist')
                    Meteor.call('threads.createThread', {id: userId}, (err, existingThreadId)=>{
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('New thread created')
                            store.threadId.set(existingThreadId)
                        }
                    })
                }
            }
        })

    } else if (threadId) {
        store.threadId.set(threadId)
    }
}

export const closeThread = ()=>{
    console.log('closing thread')
    store.threadId.set(false)
}

export const setReadStatus = (id)=>{
    console.log('Setting read status')
    Meteor.call('threads.setReadStatus', {id})
}

export const sendMessage = (message, type, threadId, callback)=>{

    console.log('Sending message')
    Meteor.call('messages.sendMessage', {message, type, threadId}, (err, res)=>{
        if (err) console.log(err)
        else if (callback) callback()
    })

}