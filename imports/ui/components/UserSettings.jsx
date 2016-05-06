import React from 'react';
import CheckBoxes from '../particles/CheckBoxes.jsx'
import Radio from '../particles/Radio.jsx'
import i18n from 'meteor/universe:i18n'
import { createContainer } from 'meteor/react-meteor-data'

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('User mounted')
    }

    render() {

        if (this.props.isLoggingIn) {
            return (<div>Загрузка</div>)
        } else {
            if (this.props.currentUser) {
                console.log('Got user')
                const iam = this.props.currentUser.profile.settings.iam
                const interested = this.props.currentUser.profile.settings.interested
                const iamItems = [{field: 'male'}, {field: 'female'}]
                const interestedItems = [{field: 'male'}, {field: 'female'}, {field: 'maleFemale'}]
                const hereFor = []
                Object.keys(this.props.currentUser.profile.settings.hereFor).forEach((field)=>{
                    hereFor.push({
                        field,
                        checked: this.props.currentUser.profile.settings.hereFor[field]
                    })
                })
                const T = i18n.createComponent(i18n.createTranslator('app'))
                return (
                    <div id="user-settings">
                        <h4><T>userSettings.me</T>:</h4>
                        <Radio id="iam-radio" items={iamItems} fieldName="iam" selectedField={iam} autosave={this.props.autosave}/>
                        <h4><T>userSettings.interested</T>:</h4>
                        <Radio id="interested-radio" fieldName="interested" items={interestedItems} autosave={this.props.autosave} selectedField={interested}/>
                        <h4><T>userSettings.hereFor</T>:</h4>
                        <CheckBoxes id="here-for-checkboxes" fieldName="hereFor" type="horizontal" items={hereFor} autosave={this.props.autosave}/>
                    </div>
                )
            } else {
                console.log('no user')
                return null
            }
        }
    }

}