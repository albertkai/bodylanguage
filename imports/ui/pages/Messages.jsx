import React from 'react'
import truncate from 'truncate'
import Loader3d from '../particles/Loader3d.jsx'
import Thread from '../components/Thread.jsx'
import { createContainer } from 'meteor/react-meteor-data'
import { openThread } from '../../api/actions/client/messages.js'

class MessagesFeed extends React.Component {

    constructor(props){
        super(props);
    }

    openThread(id) {
        openThread(id)
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
                    <div onClick={this.openThread(thread._id)}>
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

class Messages extends React.Component {

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

    openThread(id) {
        console.log('open thread')
        this.props.store.threadId.set(id)
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
                <MessagesFeed threads={threads} />
                <div id="messages-filter">
                    <div className="button-group">
                        <button className={(this.state.filter === "all") ? "_active" : ""} onClick={this.setFilter.bind(this, "all")}>Все</button>
                        <button className={(this.state.filter === "unread") ? "_active" : ""} onClick={this.setFilter.bind(this, "unread")}>Новые</button>
                    </div>
                </div>
                {this.props.threadId ? (<Thread threadId={this.props.threadId} />) : null}
            </div>
        )
    }

}

Messages.contextTypes = {
    store: React.PropTypes.object
}

MessagesFeed.contextTypes = {
    store: React.PropTypes.object
}

export default createContainer((props)=>{

    console.log('params')
    console.log(props)
    const threadId = props.store.threadId.get()
    return {
        threadId,
        store: props.store
    }

}, Messages)