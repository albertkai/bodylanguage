import React from 'react';
import CheckBoxes from '../particles/CheckBoxes.jsx'
import i18n from 'meteor/universe:i18n'
import { createContainer } from 'meteor/react-meteor-data'

class Radio extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        $(this.refs[this.props.selectedField]).addClass('_active')
    }

    onClick(e) {
        const $target = $(e.currentTarget)
        $target.addClass('_active').siblings().removeClass('_active')
    }

    render() {
        const items = this.props.items.map((item)=>{
            return (
                <div className="item" ref={item.field} onClick={this.onClick.bind(this)} key={item.field} data-field={item.field}><i className={'icons ' + item.field}></i></div>
            )
        })

        return (
            <div id={this.props.id} className="radio">{items}</div>
        )
    }
}

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
                        <Radio id="iam-radio" items={iamItems} selectedField={iam}/>
                        <h4><T>userSettings.interested</T>:</h4>
                        <Radio id="interested-radio" items={interestedItems} selectedField={interested}/>
                        <h4><T>userSettings.hereFor</T>:</h4>
                        <CheckBoxes id="here-for-checkboxes" type="horizontal" items={hereFor}/>
                    </div>
                )
            } else {
                console.log('no user')
                return null
            }
        }
    }

}