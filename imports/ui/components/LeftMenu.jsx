import React from 'react'
import { Link, browserHistory } from 'react-router'
import i18n from 'meteor/universe:i18n'

class LeftMenu extends React.Component {

    constructor(props){
       super(props);
    }

    render() {
        if (!this.context.isLoggingIn) {
            const T = i18n.createComponent(i18n.createTranslator('app'))
            const likesCount = this.context.currentUser.profile.counts.likes
            const messagesCount = this.context.currentUser.profile.counts.messages
            return(
                <div id="left-menu">
                    <div className="logo"></div>
                    <nav>
                        <Link to="/app/list-users">
                            <span><i className="ton-li-map-pin-1"></i></span>
                            <span><T>menu.radar</T></span>
                        </Link>
                        <Link to="/app/likes">
                            <span><i className="ton-li-heart"></i></span>
                            <span><T>menu.likes</T> { likesCount > 0 ? (<span>{ likesCount }</span>) : null }</span>
                        </Link>
                        <Link to="/app/messages">
                            <span><i className="ton-li-mail-5"></i></span>
                            <span><T>menu.messages</T> { messagesCount > 0 ? (<span>{ messagesCount }</span>) : null }</span>
                        </Link>
                        <Link to="/app/my-photos">
                            <span><i className="ton-li-camera-2"></i></span>
                            <span><T>menu.myPhotos</T></span>
                        </Link>
                        <Link to="/app/settings">
                            <span><i className="ton-li-gear-1"></i></span>
                            <span><T>menu.settings</T></span>
                        </Link>
                    </nav>
                </div>
            )
        } else {
            return null
        }
    }

}

LeftMenu.contextTypes = {

    currentUser: React.PropTypes.object,
    isLoggingIn: React.PropTypes.bool

}

export default LeftMenu