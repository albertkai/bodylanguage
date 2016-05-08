import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import User from '../components/User.jsx'
import Loading from '../components/Loading.jsx'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { distance, imagesCSSPreload } from '../../api/misc/utils.js'
import { expandRadius } from '../../api/models/users/methods.js'
import { likeUser, openMessage } from '../../api/actions/client/users.js'

class ListUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: 0
        }
        this.edge = 0
    }

    componentWillMount() {
        console.log('User page mounting')
    }

    componentDidMount() {
        console.log('User page mounted')
    }

    componentDidUpdate() {
        console.log('Page updated')
        console.log(this.currentUser)
        if (this.length > 0) {
            imagesCSSPreload(this.users[this.state.currentUser - 1], this.users[this.state.currentUser + 1])
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.isReady    // Update only when sub is ready, to avoid update on every minimongo insert
    }

    likeUser() {
        likeUser(this.props.users[this.state.currentUser]._id)
    }

    openMessage() {
        openMessage(this.props.users[this.state.currentUser]._id)
    }

    changeUser(dir) {
        console.log('Changing user')
        const currentUser = this.state.currentUser
        if (dir === 'left') {
            if (currentUser > 0) {
                this.setState({
                    currentUser: currentUser - 1,
                    slideDir: dir
                })
            }
        } else if (dir === 'right') {
            if (currentUser + 2 < this.props.users.length) {
                if (currentUser + 1 > this.edge) {
                    this.edge = currentUser + 1
                }
                this.setState({
                    currentUser: currentUser + 1,
                    slideDir: dir
                })
            } else {
                expandRadius.call()
            }
        }
    }

    render() {
        if (this.props.isReady) {
            console.log(this.props.users[this.state.currentUser + 1])
            const user = this.props.users[this.state.currentUser + 1]
            if (user !== undefined && user !== null) {
                const userLat = user.location.lat
                const userLng = user.location.lng
                const myLat = this.props.currentUser.profile.location.lat
                const myLng = this.props.currentUser.profile.location.lng
                const dist = distance(userLat, userLng, myLat, myLng)
                const hereFor = Object.keys(user.settings.hereFor).filter((name)=> {
                    return user.settings.hereFor[name]
                })
                return (
                    <div id="user-page">
                        <button className="open-filter" onClick={this.props.openFilter}><i className="ton-li-equalizer-3"></i></button>
                        <ReactCSSTransitionGroup
                            transitionName={`slide-${this.state.slideDir}`}
                            transitionEnterTimeout={600}
                            transitionLeaveTimeout={600}
                            >
                            <User
                                key={user._id}
                                userId={user._id}
                                photos={user.pics}
                                gotLeft={true}
                                gotRight={true}
                                hereFor={hereFor}
                                distance={dist.toFixed(1)}
                                move={this.changeUser.bind(this)}
                                likeUser={this.likeUser.bind(this)}
                                openMessage={this.openMessage.bind(this)}
                                />
                        </ReactCSSTransitionGroup>
                    </div>
                )
            } else {
                return (<Loading heading={'Никого нет'} text={'Загружаем данные'}/>)
            }
        } else {
            return (<Loading heading={'Подождите'} text={'Загружаем данные'}/>)
        }
    }

}

export default createContainer(({params})=>{

    console.log(params)
    console.log('paerrarar')
    const usersAround = Meteor.subscribe('users.around')
    const users = Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch()
    const isReady = usersAround.ready()
    return {
        users,
        isReady
    }

}, ListUsers)


