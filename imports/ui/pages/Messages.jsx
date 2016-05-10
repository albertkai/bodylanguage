import React from 'react'
import truncate from 'truncate'
import Loader3d from '../particles/Loader3d.jsx'

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
                        <h4><span>ВЫ</span>,<span>{date}</span></h4>
                        {thread.message.length > 0 ? (<p>"{truncate(thread.message, 70)}"</p>) : null}
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
        this.state = {
            filter: 'all'
        }
    }

    setFilter(filter) {
        console.log(filter)
        this.setState({filter: filter})
    }

    render() {

        let threads = [
            {
                message: 'Привет киса, надеюсь ты еще не спишь, тк мне очень gjdjgkj dlfjgldjf gldjfl jdfhlj '
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
                <div id="messages-filter">
                    <div className="button-group">
                        <button className={(this.state.filter === "all") ? "_active" : ""} onClick={this.setFilter.bind(this, "all")}>Все</button>
                        <button className={(this.state.filter === "unread") ? "_active" : ""} onClick={this.setFilter.bind(this, "unread")}>Новые</button>
                    </div>
                </div>
                <div className="thread-cont">
                    <div className="thread">
                        <div className="ovrl">
                            <div></div>
                        </div>
                        <div className="light-ovrl"></div>
                        <button className="close"><div></div><div></div></button>
                        <div className="feed">
                            <div className="message">
                                <h3><div></div><span>Вы</span>,<span>вчера в 18:30</span></h3>
                                <p>Привет киса, надеюсь ты еще не спишь, тк мне очень gjdjgkj dlfjgldjf gldjfl jdfhlj авырвыарывар</p>
                            </div>
                            <div className="message">
                                <h3><div></div><span>Вы</span>,<span>вчера в 18:30</span></h3>
                                <p>Привет киса, надеюсь ты еще не спишь, тк мне очень gjdjgkj dlfjgldjf gldjfl jdfhlj авырвыарывар рп врвап вра п воа воап воап вап оваоп оваоп воаоп вопо в</p>
                            </div>
                        </div>
                        <div className="write-message">
                            <input type="text"/>
                            <button>Отправить</button>
                        </div>
                        <div className="user-is-writing">
                            <div className="center-content">
                                <Loader3d />
                                <h3>Подождите</h3>
                                <p>Пользователь пишет сообщение</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}