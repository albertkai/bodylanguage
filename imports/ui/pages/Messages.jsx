import React from 'react'

class MessagesFeed extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        let messages = this.props.threads.map((thread, index)=>{
            let image = 'url(/images/sample.jpg)';
            let date = 'вчера в 15:30'
            return (
                <div className="message" key={index}>
                    <div>
                        <div className="avatar" style={{backgroundImage: image}}></div>
                    </div>
                    <div>
                        <div><span>ВЫ</span> <span>{date}</span></div>
                        <p>{thread.message}</p>
                    </div>
                </div>
            )
        })

        return (
            <div id="feed" class="container">
                <h3>Сообщения</h3>
                {messages}
            </div>
        )
    }

}

export default class extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        let threads = [
            {
                message: 'Привет киса, надеюсь ты еще не спишь, тк мне очень'
            },
            {
                message: 'Привет киса, надеюсь ты еще не спишь, тк мне '
            },
            {
                message: 'Привет киса, надеюсь '
            },
            {
                message: ''
            },
            {
                message: 'Привет киса, '
            },
            {
                message: 'Привет киса, '
            },
            {
                message: 'Привет киса, надеюсь ты еще не спишь'
            }

        ]

        return (
            <div id="messages" class="container">
                <MessagesFeed threads={threads}/>
                <div className="messages-filter"></div>
            </div>
        )
    }

}