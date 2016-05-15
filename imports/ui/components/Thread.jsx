import React from 'react'
import { closeThread, sendMessage, setReadStatus } from '../../api/actions/client/messages.js'
import { createContainer } from 'meteor/react-meteor-data'
import Messages from '../../api/models/messages/messages.js'
import moment from 'moment'
import { Streamy } from 'meteor/yuukan:streamy'

class Thread extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount() {
        setTimeout(()=>{
            setReadStatus(this.props.threadId)
        }, 1500)
        this._scrollToBottom()
        Streamy.on(this.props.threadId, (msg)=>{
            if (msg.userId !== this.context.currentUser._id) {
                const $userIsTyping = $(this.refs.userIsTyping)
                if (!$userIsTyping.hasClass('_visible')) $userIsTyping.addClass('_visible')
                if (this.userTypingTimeout) clearTimeout(this.userTypingTimeout)
                this.userTypingTimeout = setTimeout(()=>{
                    $userIsTyping.removeClass('_visible')
                }, 1500)
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.messages.length !== this.props.messages.length) {
            setTimeout(()=>{
                setReadStatus(this.props.threadId)
            }, 1500)
            this._scrollToBottom()
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.isReady
    }

    _scrollToBottom() {
        const $feed = $(this.refs.feed)
        const scroll = $feed.prop('scrollHeight') - $feed.height()
        if (scroll > 0) $feed.scrollTop(scroll)
    }

    closeThread() {
        closeThread()
    }

    onInput(){
        Streamy.broadcast(this.props.threadId, {userId: this.context.currentUser._id})
    }

    onKeyPress(e) {
        if (e.which === 13) this.sendMessage()
    }

    sendMessage() {
        const message = $(this.refs.messageInput).text().trim()
        const type = 'text'
        const threadId = this.props.threadId
        if (message.length > 0) {
            sendMessage(message, type, threadId, ()=>{
                console.log('Message sent')
                $(this.refs.messageInput).text('')
            })
        }

    }

    render() {

        return <div className="thread-cont" ref="cont">
            <div className="thread">
                <div className="ovrl">
                    <div></div>
                </div>
                <div className="light-ovrl"></div>
                <button className="close" onClick={this.closeThread}><div></div><div></div></button>
                <div className="cont">
                    {this.props.isReady ? this._messagesFeed() : this._loading()}
                    <div className="write-message">
                        <div ref="messageInput" className="input" onKeyPress={this.onKeyPress.bind(this)} onInput={this.onInput.bind(this)} contentEditable></div>
                        <button onClick={this.sendMessage.bind(this)}><i className="ton-li-check"></i></button>
                    </div>
                </div>
            </div>
        </div>

    }

    _messagesFeed() {
        const messages = this.props.messages.map((msg)=>{
            const authorClass = msg.authorId === this.context.currentUser._id ? 'your-message' : 'user-message'
            const watchedClass = msg.watched ? 'watched' : 'unwatched'
            moment.locale('ru')
            const date = moment(msg.date).calendar()
            return (
                <div className={`message ${authorClass} ${watchedClass}`} key={msg._id}>
                    <h3><div></div><span></span><span>{date}</span></h3>
                    <p>{msg.message}</p>
                </div>
            )
        })
        return <div className="feed" ref="feed">
            {messages}
            {this._userIsWriting()}
        </div>
    }

    _loading() {
        return <div>Загружаем</div>
    }

    _userIsWriting() {
        return <div className="user-is-writing" ref="userIsTyping">
            <div className="center-content">
                <Loader3d />
                <p>Пользователь пишет сообщение</p>
            </div>
        </div>
    }

}

Thread.contextTypes = {
    currentUser: React.PropTypes.object
}

export default createContainer((props)=>{

    const messagesSub = Meteor.subscribe('messages.threadMessages', {threadId: props.threadId})
    const messages = Messages.find({}, {sort: {date: 1}}).fetch()
    return {
        messages,
        threadId: props.threadId,
        isReady: messagesSub.ready()
    }

}, Thread)