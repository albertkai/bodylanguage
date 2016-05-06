import React from 'react';
import i18n from 'meteor/universe:i18n'
import { registrationMove } from '../../api/actions/client/users.js'

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('Registration start mounted')
        console.log(this.props.currentUser)
        i18n.onChangeLocale((newLocale)=>{
            this.forceUpdate()
        })
    }

    further() {
        registrationMove('step1')
    }

    render() {

        const T = i18n.createComponent(i18n.createTranslator('registration.start'))

        return (
            <div id="registration-start" className="padding-x padding-y">
                <h2><T>hello</T></h2>
                <p><T>text</T></p>
                <h3><T>rulesHeader</T></h3>
                <ul>
                    <li>
                        <div>
                            <p>1</p>
                        </div>
                        <div>
                            <h5><T>rules.header1</T></h5>
                            <p><T>rules.text1</T></p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>2</p>
                        </div>
                        <div>
                            <h5><T>rules.header2</T></h5>
                            <p><T>rules.text2</T></p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>3</p>
                        </div>
                        <div>
                            <h5><T>rules.header3</T></h5>
                            <p><T>rules.text3</T></p>
                        </div>
                    </li>
                </ul>
                <button className="rounded letter-spacing primary" onClick={this.further.bind(this)}><T>agree</T></button>
            </div>
        )
    }

}
