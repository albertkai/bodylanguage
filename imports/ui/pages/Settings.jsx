import React from 'react'
import PhotoEdit from '../components/PhotoEdit.jsx'
import UserSettings from '../components/UserSettings.jsx'
import i18n from 'meteor/universe:i18n'

export default class extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const T = i18n.createComponent(i18n.createTranslator('common'))
        return (
            <div id="settings" className="container">
                <UserSettings currentUser={this.props.currentUser} isLoggingIn={this.props.isLoggingIn}/>
                <button className="rounded"><T>logout</T></button>
            </div>
        )
    }

}