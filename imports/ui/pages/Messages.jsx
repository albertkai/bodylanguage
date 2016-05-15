import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import truncate from 'truncate'
import Loader3d from '../particles/Loader3d.jsx'
import Loading from '../components/Loading.jsx'
import Thread from '../components/Thread.jsx'
import { createContainer } from 'meteor/react-meteor-data'
import { openThread } from '../../api/actions/client/messages.js'
import Threads from '../../api/models/threads/threads.js'
import moment from 'moment'

class MessagesFeed extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidUpdate() {
        console.log(this.props)
    }

    openThread(threadId) {
        openThread({threadId})
    }

    shouldComponentUpdate(nextProps){
        return nextProps.isReady
    }

    render() {

        if (this.props.isReady) {

            let messages = this.props.threads.map((thread, index)=>{
                const image = `url(https://dcl7m3594apmn.cloudfront.net/images/${ thread.pic() })`
                const date = moment(thread.date).calendar()
                return (
                    <div className="message" key={index}>
                        <div>
                            <div className="avatar" style={{backgroundImage: image}}></div>
                        </div>
                        <div onClick={this.openThread.bind(this, thread._id)}>
                            <h4><span>ВЫ</span>,<span>{date}</span></h4>
                            {thread.lastMessage && thread.lastMessage.length > 0 ? (<p>"{truncate(thread.message[0], 70)}"</p>) : null}
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

        } else {

            return <Loading heading={'Подождите'} text={'Загружаем сообщения'}/>

        }
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

        if (this.props.threads.length > 0) {
            return (
                <div id="messages" class="container">
                    <MessagesFeed threads={this.props.threads} isReady={this.props.isReady} />
                    <div id="messages-filter">
                        <div className="button-group">
                            <button className={(this.state.filter === "all") ? "_active" : ""} onClick={this.setFilter.bind(this, "all")}>Все</button>
                            <button className={(this.state.filter === "unread") ? "_active" : ""} onClick={this.setFilter.bind(this, "unread")}>Новые</button>
                        </div>
                    </div>
                    <ReactCSSTransitionGroup
                        transitionName="thread"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        >
                        {this.props.threadId ? (<Thread currentUser={this.props.currentUser} isLoggingIn={this.props.isLoggingIn} threadId={this.props.threadId} key={this.props.threadId} />) : null}
                    </ReactCSSTransitionGroup>
                </div>
            )
        } else {
            return (
                <div id="messages" className="container">
                    <div className="no-messages">
                        <div className="center-content">
                            <i className="ton-li-mail-5"></i>
                            <h3>Нет сообщений</h3>
                            <p>Помните, что единственный способ начать переписку с пользователем - это получить взаимный лайк</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

}

export default createContainer((props)=>{

    const threadsSubs = Meteor.subscribe('threads.userThreads')
    const threads = Threads.find().fetch()
    const threadId = props.store.threadId.get()
    return {
        currentUser: props.currentUser,
        isLoggingIn: props.isLoggingIn,
        threadId,
        threads,
        isReady: threadsSubs.ready(),
        store: props.store
    }

}, Messages)