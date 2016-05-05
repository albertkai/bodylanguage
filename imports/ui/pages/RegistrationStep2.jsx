import React from 'react';
import PhotoEdit from '../components/PhotoEdit.jsx'
import i18n from 'meteor/universe:i18n'
import { createContainer } from 'meteor/react-meteor-data'
import { takePic } from '../../api/actions/client/pics.js'
import { registrationFinish, registrationMove } from '../../api/actions/client/users.js'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.pics = this.props.currentUser.profile.pics
    }

    componentDidMount() {
        console.log('Registration step 2 mounted')
        i18n.onChangeLocale((newLocale)=>{
            this.forceUpdate()
        })
    }

    takePic() {
        takePic()
    }

    back() {
        registrationMove('step1')
    }

    finish() {
        registrationFinish()
    }

    render() {

        let gotPhotos = this.pics.length > 0

        const T = i18n.createComponent()

        const noPics = (()=>{
            return (
                <div id="registration-step-2" className="registration">
                    <h3><T>registration.step2.heading</T></h3>
                    <button className="plus" onClick={this.takePic.bind(this)}>
                        <div></div>
                        <div></div>
                    </button>
                    <p><T>registration.step2.disc</T></p>
                </div>
            )
        })

        return (
            <div id="registration-step-2" className="registration">
                {gotPhotos ? (<div className="photo-edit-cont"><PhotoEdit photos={this.pics}/></div>) : noPics()}
                <div className="controls">
                    <button className="rounded secondary round-button" onClick={this.back.bind(this)}><i className="ton-li-music-backward-1"></i></button>
                    <button className="rounded primary" onClick={this.finish.bind(this)}><T>common.ready</T>! ></button>
                </div>
            </div>
        )
    }

}