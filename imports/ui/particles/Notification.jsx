import React from 'react'
import { removeNotification } from '../../api/actions/client/notify.js'

export default class extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        setTimeout(()=>{
            $(this.refs.notification).addClass('_visible')
        }, 0)
        setTimeout(()=>{
            $(this.refs.notification).removeClass('_visible')
        }, 2400)
        setTimeout(()=>{
            removeNotification()
        }, 3000)
    }

    render() {
        return (
            <div ref="notification" className={`notification notification-${ this.props.type }`}>
                <h3>{ this.props.header }</h3>
                <p>{ this.props.text }</p>
            </div>
        )
    }

}