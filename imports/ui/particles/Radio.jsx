import React from 'react'
import { updateSettingsField } from '../../api/actions/client/users.js'

export default class extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        $(this.refs[this.props.selectedField]).addClass('_active')
    }

    onClick(e) {
        const $target = $(e.currentTarget)
        $target.addClass('_active').siblings().removeClass('_active')
        if (this.props.autosave) {
            updateSettingsField(this.props.fieldName, $target.data('field'))
        }
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