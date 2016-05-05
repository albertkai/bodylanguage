import React from 'react'
import i18n from 'meteor/universe:i18n'
import { registerUser } from '../../api/actions/client/users.js'
import { login } from '../../api/actions/client/users.js'
import _ from 'underscore'

function validate($cont) {
    let valid = []
    $cont.find('input').each(function(){
        let val = $(this).val()
        if (val === '' || val.length > 200) {
            $(this).removeClass('_success').addClass('_error')
            valid.push(false)
        } else if ($(this).attr('type') === 'email') {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!re.test(val)) {
                console.log('email invalid')
                $(this).removeClass('_success').addClass('_error')
                valid.push(false)
            }
            console.log('email valid')
        } else {
            $(this).removeClass('_error').addClass('_success')
            valid.push(true)
        }
    })
    return valid.find((v)=> v === false) !== undefined ? false : true
}

export default class extends React.Component{

    constructor(props){
        super(props)
    }

    close(e) {
        e.preventDefault()
        $(this.refs.loginCont).removeClass('_login-opened').removeClass('_registration-opened')
        $('input').val('')
        $('input').removeClass('_success').removeClass('_error')
        this.formOpened = false
    }

    componentWillMount() {
        i18n.onChangeLocale((newLocale)=>{
            this.forceUpdate()
        })
    }

    buttonClick(type) {
        let className;
        if (this.formOpened) {
            if (type === 'reg') {
                this._registrationSubmit()
            } else if (type === 'login') {
                this._loginSubmit()
            }
        } else {
            if (type === 'reg') {
                $(this.refs.loginCont).addClass('_registration-opened')
            } else if (type === 'login') {
                $(this.refs.loginCont).addClass('_login-opened')
            }
            this.formOpened = true
        }
    }

    _registrationSubmit() {
        console.log('submitted')
        const $form = $(this.refs.registrationForm)
        const email = $form.find('#reg-email').val()
        const password = $form.find('#reg-password').val()
        const passwordRepeat = $form.find('#reg-password-repeat').val()
        if (validate($form)) {
            console.log('Form is valid')
            if (password === passwordRepeat) {
                $form.find('#reg-password-repeat').removeClass('_error').addClass('_success')
                console.log('calling action')
                registerUser(email, password)
            } else {
                $form.find('#reg-password-repeat').removeClass('_success').addClass('_error')
            }
        }
    }

    _loginSubmit() {
        console.log('logging in')
        const $form = $(this.refs.loginForm)
        const email = $form.find('#login-email').val()
        const password = $form.find('#login-password').val()
        if (validate($form)) {
            login(email, password)
        }
    }

    render() {
        const T = i18n.createComponent(i18n.createTranslator('common'))
        const yourEmail = i18n.__("common.yourEmail")
        const yourPass = i18n.__("common.yourPass")
        const repeatPass = i18n.__("common.repeatPass")
        return (
            <div id="login" className="container padding-x padding-h">

                <div className="login-cont" ref="loginCont">

                    <form id="registration-form" ref="registrationForm">
                        <button className="close" onClick={this.close.bind(this)}><i className="ton-li-cross"></i> <T>close</T></button>
                        <input id="reg-email" type="email" name="email" placeholder={yourEmail}/>
                        <input id="reg-password" type="password" name="password" placeholder={yourPass}/>
                        <input id="reg-password-repeat" type="password" name="password-repeat" placeholder={repeatPass}/>
                    </form>
                    <form id="login-form" ref="loginForm">
                        <button className="close" onClick={this.close.bind(this)}><i className="ton-li-cross"></i> <T>close</T></button>
                        <input id="login-email" type="email" name="email" placeholder={yourEmail}/>
                        <input id="login-password" type="password" name="password" placeholder={yourPass}/>
                    </form>

                    <button id="login-button" onClick={this.buttonClick.bind(this, 'login')}><T>enter</T></button>
                    <button id="reg-button" onClick={this.buttonClick.bind(this, 'reg')}><T>registration</T></button>

                </div>

            </div>
        )
    }

}