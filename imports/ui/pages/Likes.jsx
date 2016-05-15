import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createContainer } from 'meteor/react-meteor-data'
import User from '../components/User.jsx'
import Loading from '../components/Loading.jsx'
import Likes from '../../api/models/likes/likes.js'
import { distance } from '../../api/misc/utils.js'
import { likeUser } from '../../api/actions/client/likes.js'
import { openMessage } from '../../api/actions/client/users.js'
import i18n from 'meteor/universe:i18n'

class LikesPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            filter: 'both',
            currentLike: 0
        }
        this.edge = 0
    }

    setFilter(filter) {
        this.setState({filter: filter})
    }

    changeLike(dir) {
        console.log('Changing like')
        const currentLike = this.state.currentLike
        if (dir === 'left') {
            if (currentLike > 0) {
                this.setState({
                    currentLike: currentLike - 1,
                    slideDir: dir
                })
            }
        } else if (dir === 'right') {
            if (currentLike + 2 < this.props.likes.length) {
                if (currentLike + 1 > this.edge) {
                    this.edge = currentLike + 1
                }
                this.setState({
                    currentLike: currentLike + 1,
                    slideDir: dir
                })
            }
        }
        console.log(dir)
        console.log(this.props.likes.length)
        console.log(this.state.currentLike)
    }

    likeUser() {
        likeUser(this.otherUserId)
    }

    openMessage() {
        openMessage(this.props.users[this.state.currentUser]._id)
    }

    render() {

        const T = i18n.createComponent(i18n.createTranslator('app'))
        if (this.props.isReady) {
            if (this.props.likes.length > 0) {
                const like = this.props.likes[this.state.currentLike]
                if (like !== undefined && like !== null) {
                    const userId = like.otherUserId()
                    this.otherUserId = userId
                    console.log(userId)
                    const pics = like.userPics()
                    console.log(pics)
                    const userLat = like.location().lat
                    const userLng = like.location().lng
                    const myLat = this.props.currentUser.profile.location.lat
                    const myLng = this.props.currentUser.profile.location.lng
                    const dist = distance(userLat, userLng, myLat, myLng)
                    const canLike = !like.isMutual && like.userId !== this.props.currentUser._id
                    const gotLeft = this.state.currentLike > 0
                    const canWrite = like.isMutual
                    const gotRight = this.state.currentLike + 1 < this.props.likes.length
                    const hereFor = Object.keys(like.hereFor()).filter((name)=> {
                        return like.hereFor()[name]
                    })
                    return (
                        <div id="likes" className="container">
                            <div className="user-wrap">
                                <ReactCSSTransitionGroup
                                    transitionName={`slide-${this.state.slideDir}`}
                                    transitionEnterTimeout={600}
                                    transitionLeaveTimeout={600}
                                    >
                                    <User
                                        key={userId}
                                        userId={userId}
                                        photos={pics}
                                        gotLeft={gotLeft}
                                        gotRight={gotRight}
                                        canLike={canLike}
                                        canWrite={canWrite}
                                        hereFor={hereFor}
                                        distance={dist.toFixed(1)}
                                        move={this.changeLike.bind(this)}
                                        likeUser={this.likeUser.bind(this)}
                                        openMessage={this.openMessage.bind(this)}
                                        threadId={this.props.threadId}
                                        />
                                </ReactCSSTransitionGroup>
                            </div>
                            <div className="filter">
                                <div className="button-group">
                                    <button className={(this.state.filter === "both") ? "_active" : ""} onClick={this.setFilter.bind(this, "both")}><T>likes.both</T></button>
                                    <button className={(this.state.filter === "i") ? "_active" : ""} onClick={this.setFilter.bind(this, "i")}><T>likes.iLiked</T></button>
                                    <button className={(this.state.filter === "me") ? "_active" : ""} onClick={this.setFilter.bind(this, "me")}><T>likes.likedMe</T></button>
                                </div>
                            </div>
                        </div>
                    )
                }
            } else {
                return <div id="likes">{this._noLikes()}</div>
            }
        } else {
            return (<Loading heading={'Подождите'} text={'Загружаем данные'}/>)
        }

    }

    _noLikes() {
        return (
            <div className="no-likes">
                <div className="center-content">
                    <i className="ton-li-heart"></i>
                    <h3>Нет лайков:(</h3>
                    <p>Не волнуйтесь, очень скоро они появятся. Ставьте больше лайков, и получайте ответные. При взаимном лайке вы также сможете писать сообщения</p>
                </div>
            </div>
        )
    }

}

export default createContainer(({store})=>{

    const filter = new ReactiveVar('all')
    const likesSub = Meteor.subscribe('likes.allLikes')
    const likes = Likes.find().fetch()
    const isReady = likesSub.ready()
    const threadId = store.threadId.get()

    return {likes, isReady, filter, threadId}


}, LikesPage)