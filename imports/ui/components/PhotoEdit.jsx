import React from 'react'
import { MeteorCamera } from 'meteor/mdg:camera'
import { takePic, removePic } from '../../api/actions/client/pics.js'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPic: 0,
            cssLeft: 0
        }
    }

    move(index) {
        const cssLeft = $(window).width() * index * -1
        this.setState({cssLeft})
    }

    addPhoto() {
        takePic()
    }

    removePhoto(photo) {
        removePic(photo)
    }

    render() {

        const currentPic = this.state.currentPic

        let photos = this.props.photos.sort((p)=> p.order).map((photo, index)=>{
            let image = `url(https://dcl7m3594apmn.cloudfront.net/images/${photo.name})`
            return (
                <li style={{backgroundImage: image}} key={index}>
                    <div className="top-controls">
                        <button className="remove" onClick={this.removePhoto.bind(this, photo)}><div></div><div></div></button>
                    </div>
                </li>
            )
        })

        let previewItems = this.props.photos.sort((p)=> p.order).map((photo, index)=>{
            let image = `url(https://dcl7m3594apmn.cloudfront.net/images/${photo.name})`
            const activeClass = index === currentPic ? '_active' : ''
            return (
                <li className={activeClass} style={{backgroundImage: image}} key={index} onClick={this.move.bind(this, index)}></li>
            )
        })

        let noPics = (<div className="no-pics"><h3>Нет ни одного фото. Вы не можете пользоваться сервисом</h3></div>)

        let gotAddButton = this.props.photos.length < 3

        const addButton = (()=>{
            return (<li className="add" onClick={this.addPhoto.bind(this)}><div></div><div></div></li>)
        })

        return (
            <div className="photo-edit">
                <ul className="photos-cont" style={{left: this.state.cssLeft + 'px'}}>
                    {this.props.photos.length > 0 ? photos : noPics}
                </ul>
                <ul className="preview">
                    {previewItems}
                    {gotAddButton ? addButton() : null}
                </ul>
            </div>
        )

    }

}