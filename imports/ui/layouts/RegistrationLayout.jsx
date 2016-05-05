import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Random } from 'meteor/random'


export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('RegistrationContainer mounted')
        console.log(this.props)
    }

    render() {
        return (
            <div id="registration-container" className="container">
                <div className="step"><div></div></div>
                <div className="bg"></div>
                <div className="content container">
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={0}
                        transitionLeaveTimeout={1}
                        >
                        {this.props.children && React.cloneElement(this.props.children, {
                            key: this.props.location.path,
                            store: this.props.store,
                            currentUser: this.props.currentUser,
                            isLoggingIn: this.props.isLoggingIn
                        })}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }

}
