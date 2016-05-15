import React from 'react'

export default class extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="upload-indicator">
                <div></div>
                <p>50%</p>
            </div>
        )
    }

}