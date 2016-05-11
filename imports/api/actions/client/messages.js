import store from '../../client/stores/store.js'

export const openThread = (id)=>{
    console.log('Session id ' + id)
    store.threadId.set(id)
}

export const closeThread = ()=>{
    console.log('closing thread')
    store.threadId.set(false)
}