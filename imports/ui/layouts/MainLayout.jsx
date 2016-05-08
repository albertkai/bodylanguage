import React from 'react';
import LeftMenu from '../components/LeftMenu.jsx'
import RightFilter from '../components/RightFilter.jsx'
import MessageForm from '../particles/MessageForm.jsx'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createContainer } from 'meteor/react-meteor-data'
import { saveGeoPosition } from '../../api/models/users/methods.js'
import { Random } from 'meteor/random'

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('MainContainer mounted')
        // Polling new position every 100 seconds
        this.positionInterval = setInterval(()=>{
            navigator.geolocation.getCurrentPosition((pos)=>{
                const lat = pos.coords.latitude
                const lng = pos.coords.longitude
                saveGeoPosition.call({lat, lng})
            }, (err)=>{
                console.log(err)
            })
        }, 100 * 1000)
    }

    componentDidUpdate() {
        console.log('MainContainer updated')
        $(this.refs.mainContainer).removeClass('_menu-opened')
    }

    componentWillUnmount() {
        clearInterval(this.positionInterval)
    }

    openMenu() {
        $(this.refs.mainContainer).toggleClass('_menu-opened')
    }

    openFilter() {
        $(this.refs.mainContainer).toggleClass('_filter-opened')
    }

    render() {
        return (
            <div id="main-container" ref="mainContainer" className="container">
                <LeftMenu />
                <div id="main" className="container">
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={0}
                        transitionLeaveTimeout={1}
                        >
                        {this.props.children && React.cloneElement(this.props.children, {
                            key: this.props.location.path,
                            store: this.props.store,
                            currentUser: this.props.currentUser,
                            isLoggingIn: this.props.isLoggingIn,
                            openFilter: this.openFilter.bind(this)
                        })}
                    </ReactCSSTransitionGroup>
                    <button className="open-menu" onClick={this.openMenu.bind(this)}></button>
                    <button className="close close-menu"></button>
                    <button className="close close-filter"></button>
                </div>
                <RightFilter/>
                <MessageForm />
            </div>
        )
    }

}
