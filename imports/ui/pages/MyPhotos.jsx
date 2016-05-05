import React from 'react'
import PhotoEdit from '../components/PhotoEdit.jsx'

export default class extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="my-photos" className="container">
                <PhotoEdit photos={[{image: ''}, {image: ''}]}/>
            </div>
        )
    }

}

