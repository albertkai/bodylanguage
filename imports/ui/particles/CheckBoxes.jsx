import React from 'react'
import i18n from 'meteor/universe:i18n'
import { updateSettingsField } from '../../api/actions/client/users.js'

export default class extends React.Component {

    constructor(props){
        super(props);
    }

    click(e) {
        $(e.currentTarget).toggleClass('_selected')
        if (this.props.autosave) {
            const hereFor = (()=>{
                let res = {}
                $('#' + this.props.id).find('.item').each(function(){
                    res[$(this).data('field')] = $(this).hasClass('_selected')
                })
                return res;
            })()
            updateSettingsField(this.props.fieldName, hereFor)
        }
    }

    componentDidMount() {
        this.props.items.forEach((item)=>{
            if (item.checked) $(`[data-field='${item.field}']`).addClass('_selected')
        })
    }

    render() {
        const T = i18n.createComponent(i18n.createTranslator('app'))
        const items = this.props.items.map((item)=>{
            return (
                <div
                    className='item'
                    ref="checkbox"
                    data-field={item.field} key={item.field}
                    onClick={this.click.bind(this)}
                    >
                    <div>
                        <div></div>
                    </div>
                    <p><T>{'filters.' + item.field}</T></p>
                </div>
            )
        })

        return (
            <div id={this.props.id} className={this.props.type + ' checkboxes'}>{items}</div>
        )
    }
}