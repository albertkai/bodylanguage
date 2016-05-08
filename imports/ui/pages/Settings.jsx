import React from 'react'
import PhotoEdit from '../components/PhotoEdit.jsx'
import UserSettings from '../components/UserSettings.jsx'
import i18n from 'meteor/universe:i18n'
import { Meteor } from 'meteor/meteor'
import { logout } from '../../api/actions/client/users.js'

export default class extends React.Component {

    constructor(props){
        super(props);
    }

    logout() {
        logout()
    }

    render() {
        const T = i18n.createComponent(i18n.createTranslator('common'))
        return (
            <div id="settings" className="container">
                <UserSettings currentUser={this.props.currentUser} isLoggingIn={this.props.isLoggingIn} autosave={true}/>
                <button className="rounded primary" onClick={this.logout}><T>logout</T></button>
            </div>
        )
    }

}