import React from 'react'
import CheckBoxes from './../particles/CheckBoxes.jsx'
import i18n from 'meteor/universe:i18n'
import Slider from 'rc-slider'
import { updateSettingsField } from '../../api/actions/client/users.js'

class RightFilter extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value: 0
        }
    }

    componentDidMount() {
        this._setInitialState()
    }

    componentDidUpdate() {
        this._setInitialState()
    }

    _setInitialState() {
        // Separate function to populate reactive initial state for additional control
        if (!this.initialStateSet) {
            if (!this.context.isLoggingIn) {
                const value = Math.round(this.context.currentUser.profile.settings.radius)
                this.setState({value})
                this.initialStateSet = true
            }
        }
    }

    handleChange(val) {
        const value = this.valueToRadius(val)
        this.setState({value})
    }

    saveValue(val) {
        const value = this.valueToRadius(val);
        updateSettingsField('radius', value)
    }

    valueToRadius(val) {
        return Math.pow(val, 3) + 500
    }

    radiusToValue(radius) {
        return Math.cbrt(radius - 500)
    }


    render() {

        if (!this.context.isLoggingIn) {

            const searchFor = []
            Object.keys(this.context.currentUser.profile.settings.searchFor).forEach((field)=>{
                searchFor.push({
                    field,
                    checked: this.context.currentUser.profile.settings.searchFor[field]
                })
            })
            const T = i18n.createComponent(i18n.createTranslator('app'))
            const defaultValue = Math.round(this.radiusToValue(this.context.currentUser.profile.settings.radius))
            return(
                <div id="right-filter">
                    <div className="logo">
                        <span><T>filter.fil</T></span>
                        <span><T>filter.ter</T></span>
                    </div>
                    <CheckBoxes
                        id="filter-checkboxes"
                        type={'vertical'}
                        fieldName="searchFor"
                        items={searchFor}
                        autosave={true}
                        />
                    <h2>{(this.state.value / 1000).toFixed(1)}км</h2>
                    <Slider
                        onChange={this.handleChange.bind(this)}
                        onAfterChange={this.saveValue.bind(this)}
                        defaultValue={defaultValue}
                        tipFormatter={null}
                        />
                    <h4>Радиус</h4>
                </div>
            )

        } else {
            return (<div>Загружаем..</div>)
        }
    }

}

RightFilter.contextTypes = {

    currentUser: React.PropTypes.object,
    isLoggingIn: React.PropTypes.bool

}

export default RightFilter