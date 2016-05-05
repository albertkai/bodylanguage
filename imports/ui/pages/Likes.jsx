import React from 'react'
import User from '../components/User.jsx'
import i18n from 'meteor/universe:i18n'

export default class extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            filter: 'both'
        }
    }

    isActive(filter) {
        if (this.state.filter === filter) {
            return '_active'
        } else {
            return ''
        }
    }

    setFilter(filter) {
        this.setState({filter: filter})
    }

    render() {
        const T = i18n.createComponent(i18n.createTranslator('app'))
        return (
            <div id="likes" className="container">
                <div className="user-wrap">
                    <User
                        photos={[{image: ''}, {image: ''}]}
                        usesFor={['sex', 'relationships', 'communication', 'watchup']}
                        distance={3500}
                        />
                </div>
                <div className="filter">
                    <div className="button-group">
                        <button className={this.isActive.bind(this, "both")} onClick={this.setFilter.bind(this, "both")}><T>likes.both</T></button>
                        <button className={this.isActive.bind(this, "i")} onClick={this.setFilter.bind(this, "i")}><T>likes.iLiked</T></button>
                        <button className={this.isActive.bind(this, "me")} onClick={this.setFilter.bind(this, "me")}><T>likes.likedMe</T></button>
                    </div>
                </div>
            </div>
        )
    }

}