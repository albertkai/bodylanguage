import React from 'react'
import i18n from 'meteor/universe:i18n'

const T = i18n.createComponent(i18n.createTranslator('registration.confirm'))

export default ()=>{
    return (
        <div id="registration-confirm" className="container">
            <h3><T>oneMoment</T></h3>
            <h5><T>text1</T></h5>
            <h5><T>text2</T></h5>
        </div>
    )
}