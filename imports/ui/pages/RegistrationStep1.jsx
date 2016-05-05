import React from 'react';
import UserSettings from '../components/UserSettings.jsx'
import i18n from 'meteor/universe:i18n'
import { registrationStep1, registrationMove } from '../../api/actions/client/users.js'
import { saveGeoPosition } from '../../api/models/users/methods.js'

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('Registration step 1 mounted');
        i18n.onChangeLocale((newLocale)=>{
            this.forceUpdate()
        })
        navigator.geolocation.getCurrentPosition((pos)=>{
            const lat = pos.coords.latitude
            const lng = pos.coords.longitude
            saveGeoPosition.call({lat, lng})
        }, (err)=>{
            console.log(err)
        })
    }

    back() {
        registrationMove('start')
    }

    submit() {
        const iam = $('#iam-radio').find('._active').data('field')
        const interested = $('#interested-radio').find('._active').data('field')
        const hereFor = (()=>{
            let res = {}
            $('#here-for-checkboxes').find('.item').each(function(){
                res[$(this).data('field')] = $(this).hasClass('_selected')
            })
            return res;
        })()
        registrationStep1(iam, interested, hereFor)
    }

    render(){

        const T = i18n.createComponent(i18n.createTranslator('common'))

        return (
            <div id="registration-step-1" className="registration">
                <UserSettings currentUser={this.props.currentUser} isLoggingIn={this.props.isLoggingIn}/>
                <div className="controls">
                    <button className="rounded secondary round-button" onClick={this.back.bind(this)}><i className="ton-li-music-backward-1"></i></button>
                    <button className="rounded primary" onClick={this.submit.bind(this)}><T>further</T> ></button>
                </div>
            </div>
        )
    }

}
