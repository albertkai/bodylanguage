import { ReactiveDict } from 'meteor/reactive-dict'
import { ReactiveVar } from 'meteor/reactive-var'

// This is a main reactive store. Passed as a context.

console.log('initializing STOOOOREEEE')

export default {

    dict: new ReactiveDict(),    // Common use
    isDark: new ReactiveVar(true),  // To determine weather the background is dark, in order to change some ui elements styles
    threadId: new ReactiveVar(null), // Used to open thread modal with a set id
    notification: new ReactiveVar(null),  // Used to show notifications reactively
    uploadProgress: new ReactiveVar(null) // Used by Slingshot to indicate upload progress

}