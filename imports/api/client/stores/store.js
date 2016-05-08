import { ReactiveDict } from 'meteor/reactive-dict'
import { ReactiveVar } from 'meteor/reactive-var'

// This is a main reactive store. Passed as a context.

export default {

    dict: new ReactiveDict(),    // Common use
    isDark: new ReactiveVar(true)  // To determine weather the background is dark, in order to change some ui elements styles

}