import React from 'react'
import CheckBoxes from './../particles/CheckBoxes.jsx'
import i18n from "meteor/universe:i18n"

export default class extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        let items = [
            {
                checked: true,
                field: 'sex'
            },{
                checked: false,
                field: 'relationships'
            },{
                checked: true,
                field: 'watchup'
            },{
                checked: false,
                field: 'communication'
            },

        ]

        const T = i18n.createComponent(i18n.createTranslator('app'))
        return(
            <div id="right-filter">
                <div className="logo">
                    <span><T>filter.fil</T></span>
                    <span><T>filter.ter</T></span>
                </div>
                <CheckBoxes
                    type={'vertical'}
                    items={items}
                    />
            </div>
        )
    }

}