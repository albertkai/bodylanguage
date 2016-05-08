import React from 'react';
import i18n from 'meteor/universe:i18n'
import Spinner3d from '../particles/Spinner3d.jsx'

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="container loading">
                <div className="center-content">
                    <Spinner3d />
                    <h2 className="align-center">{this.props.heading}</h2>
                    <p className="align-center letter-spacing">{this.props.text}</p>
                </div>
            </div>
        )
    }

}