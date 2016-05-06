import React from 'react'
import PhotoEdit from '../components/PhotoEdit.jsx'
import { createContainer } from 'meteor/react-meteor-data'

class MyPhotos extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="my-photos" className="container">
                <PhotoEdit photos={this.props.photos}/>
            </div>
        )
    }

}

export default createContainer(({params})=>{

    const user = Meteor.user()
    const photos = user? user.profile.pics : []
    const isLoggingIn = Meteor.loggingIn()

    return {photos, isLoggingIn}

}, MyPhotos)

