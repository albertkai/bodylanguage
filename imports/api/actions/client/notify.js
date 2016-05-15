import store from '../../client/stores/store.js'

export const notify = ({header, text, type})=>{

    const notification = {
        header,
        text,
        type
    }
    store.notification.set(notification)

}

export const removeNotification = ()=>{
    store.notification.set(null)
}