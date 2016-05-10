import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import User from '../components/User.jsx'
import Loading from '../components/Loading.jsx'
import Likes from '../../api/models/likes/likes.js'
import { distance } from '../../api/misc/utils.js'
import i18n from 'meteor/universe:i18n'

class LikesPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            filter: 'both'
        }
    }

    setFilter(filter) {
        this.setState({filter: filter})
    }

    render() {

        const T = i18n.createComponent(i18n.createTranslator('app'))
        if (this.props.isReady) {

            const userId = this.props.currentUser._id
            const likes = this.props.likes.sort(like => like.lastUpdated)
            const user = this.props.users
            const yourLikes = likes
                .filter(like => like.userId === userId)
                .map((like)=>{
                    let user = users.find(user => user._id === like.likedUser)
                    return Object.assign(like, {pics: user.pics, location: user.location})
                })
            const youLiked = likes
                .filter(like => like.userId === userId)
                .map((like)=>{
                    let user = users.find(user => user._id === like.likedUser)
                    return Object.assign(like, {pics: user.pics, location: user.location})
                })
            const mutualLikes = yourLikes
                .filter(like => like.isMutual)
                .map((like)=>{
                    let user = users.find(user => user._id === like.likedUser)
                    return Object.assign(like, {pics: user.pics, location: user.location})
                })
            const hereFor = Object.keys(user.settings.hereFor).filter((name)=> {
                return user.settings.hereFor[name]
            })
            const userLat = user.location.lat
            const userLng = user.location.lng
            const myLat = this.props.currentUser.profile.location.lat
            const myLng = this.props.currentUser.profile.location.lng
            const dist = distance(userLat, userLng, myLat, myLng)

            return (
                <div id="likes" className="container">
                    <div className="user-wrap">
                        <User
                            key={user._id}
                            userId={user._id}
                            photos={user.pics}
                            gotLeft={true}
                            gotRight={true}
                            hereFor={hereFor}
                            distance={dist.toFixed(1)}
                            />
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
        } else {
            return (<div>Загружаем лайки..</div>)
        }
    }

}

export default createContainer(()=>{

    const filter = new ReactiveVar('all')
    const likesSub = Meteor.subscribe('likes.allLikes')
    const likes = Likes.find().fetch()
    const users = Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch()
    const isReady = likesSub.ready()

    return {likes, users, isReady, filter}


}, LikesPage)