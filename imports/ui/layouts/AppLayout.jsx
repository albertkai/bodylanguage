import React from 'react';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import i18n from 'meteor/universe:i18n'
import {browserHistory} from 'react-router'
import store from '../../api/client/stores/store.js'
import Spinner3d from '../particles/Spinner3d.jsx'
import Notification from '../particles/Notification.jsx'
import UploadIndicator from '../particles/UploadIndicatior.jsx'

class AppLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.redirectLogged()
    }

    componentDidMount() {

        console.log('AppContainer mounted')
        i18n.setLocale(this.getLang())

    }

    getChildContext() {
        return {
            currentUser: this.props.currentUser,
            isLoggingIn: this.props.isLoggingIn,
            store: this.props.store
        }
    }

    componentWillMount() {
        this.redirectLogged()
    }

    redirectLogged() {

        if (!this.props.isLoggingIn) {
            console.log('redirecting')
            const currentUser = this.props.currentUser
            if (currentUser !== null && currentUser !== undefined) {
                if (currentUser.emails[0].verified) {
                    if (currentUser.profile.registration.isRegistered) {
                        console.log('No redirect')
                    } else {
                        this.route('/registration/' + currentUser.profile.registration.step)
                    }
                } else {
                    this.route('/registration/confirm')
                }
            } else {
                this.route('/login')
            }
        }

    }

    route(newRoute) {
        const currentRoute = this.props.location.pathname
        const firstPart = currentRoute.split('/')[1]
        if (newRoute !== currentRoute && firstPart !== 'verify-email') browserHistory.push(newRoute)
    }

    getLang() {
        if (navigator.languages != undefined)  {
            return navigator.languages[0];
        }
        return navigator.language || navigator.browserLanguage;
    }

    render() {
        const isLoading = this.props.isLoggingIn
        const loaderClass = isLoading ? '_visible' : ''
        return (
            <div id="app-container" className="container">
                {this.props.children && React.cloneElement(this.props.children, {
                    currentUser: this.props.currentUser,
                    isLoggingIn: this.props.isLoggingIn,
                    store: this.props.store
                })}
                <div id="main-loader" className={loaderClass + ' center-content'}>

                    <Spinner3d />

                </div>
                {
                    this.props.notification ?
                        (<Notification
                            header={this.props.notification.header}
                            text={this.props.notification.text}
                            type={this.props.notification.type}/>)
                        : null
                }
                <UploadIndicator />
            </div>
        )
    }

}

AppLayout.childContextTypes = {

    currentUser: React.PropTypes.object,
    isLoggingIn: React.PropTypes.bool,
    store: React.PropTypes.object

}

export default createContainer(({params})=>{

    const currentUser = Meteor.user()
    const isLoggingIn = Meteor.loggingIn()
    const notification = store.notification.get()

    return {
        currentUser,
        isLoggingIn,
        store,
        notification
    }

}, AppLayout)
