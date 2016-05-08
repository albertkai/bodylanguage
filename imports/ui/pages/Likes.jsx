import React from 'react'
import User from '../components/User.jsx'
import i18n from 'meteor/universe:i18n'
import { createContainer } from 'meteor/react-meteor-data'
import Likes from '../../api/models/likes/likes.js'

class LikesPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            filter: 'both'
        }
    }

    setFilter(filter) {
        console.log(filter)
        this.props.filterr.set(filter + ' dsfgdfh')
        this.setState({filter: filter})
    }

    render() {
        const T = i18n.createComponent(i18n.createTranslator('app'))
        if (this.props.isReady) {
            user = this.props.users[0]
            const hereFor = Object.keys(user.settings.hereFor).filter((name)=> {
                return user.settings.hereFor[name]
            })
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

export default createContainer(({params})=>{

    const filterr = new ReactiveVar('gogo')
    const likesSub = Meteor.subscribe('likes.userLikes')
    const likes = Likes.find().fetch()
    const users = Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch()
    const isReady = likesSub.ready()

    Tracker.autorun(()=>{
        let text = filterr.get()
        console.log(text)
    })

    return {likes, users, isReady, filterr}


}, LikesPage)