import React from 'react'
import { closeThread } from '../../api/actions/client/messages.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class extends React.Component {

    componentDidMount() {
        setTimeout(()=> {
            $(this.refs.cont).addClass('_opened')
        }, 0)
        console.log(this.props.threadId)
    }

    closeThread() {
        closeThread()
    }

    render() {
        return (
        <ReactCSSTransitionGroup
            transitionName="thread"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            >
            <div className="thread-cont" ref="cont" key={Date.now()}>
                <div className="thread">
                    <div className="ovrl">
                        <div></div>
                    </div>
                    <div className="light-ovrl"></div>
                    <button className="close" onClick={this.closeThread}><div></div><div></div></button>
                    <div className="cont">
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
                            <div className="input" contentEditable></div>
                            <button><i className="ton-li-check"></i></button>
                        </div>
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
        </ReactCSSTransitionGroup>
        )
    }

}