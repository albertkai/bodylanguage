import React from 'react';
import i18n from 'meteor/universe:i18n'
import { Accounts } from 'meteor/accounts-base'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isProcessed: false,
            verified: true
        }
    }

    componentWillMount() {
        i18n.onChangeLocale((newLocale)=>{
            this.forceUpdate()
        })
        Accounts.verifyEmail(this.props.params.token, (err)=>{
            const verified = err ? false : true
            this.setState({isProcessed: true, verified})
        })
    }

    render() {

        const T = i18n.createComponent(i18n.createTranslator('registration.start'))

        const verified = (()=>{
            return (<div><h3>Спасибо!</h3><h4>Ваш email подтвержден! Можете возвращаться обратно к приложению</h4></div>)
        })

        const error = (()=>{
            return (<div><h3>Произошла ошибка!</h3><h4>Необходимо отправить email еще раз</h4></div>)
        })

        const loading = (()=>{
            return (<h3>Подождите</h3>)
        })

        return (
            <div id="verify-email" className="padding-x padding-y">
                {this.state.isProcessed ? (this.state.verified ? verified() : error()) : loading()}
            </div>
        )
    }

}
