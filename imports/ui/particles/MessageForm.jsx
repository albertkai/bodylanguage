import React from 'react'

export default class extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div id="message-form">
                <h3>Новое сообщение</h3>
                <textarea name="" id="" cols="30" rows="10" placeholder="Ваше сообщение"></textarea>
            </div>
        )
    }

}