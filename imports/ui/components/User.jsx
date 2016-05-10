import React from 'react'
import _ from 'underscore'

function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
}

export default class extends React.Component {

    // !! To complicated component. Need to separate carousel, controls and a container to a separate components.
    // A component for the main apps interactions, responsible for swiping user pics and pinterest-like user interaction (like, message, change)
    // UX features: fullscreen user photos carousel is changed by a swipe gesture. If you tap and hold for some time, the controls gets opened,
    // then a user moves a finger to a needed action icon (it scales in response), and on touchend an action gets performed.

    constructor(props) {

        super(props);
        this.initialCSSProp = 29
        this.photosLength = this.props.photos.length
        this.canCalculateButtonSizes = false    // For touchMove event.
        this.swipeOffset = 0   // Swipe offset on touchstart
        this.controlsTimeout = null  // Holds the timeout to show user controls
        this.touchStartTime = 0
        this.controlsCenter = {x:0, y:0} // Holds touch coords at the moment controls were shown
        this.settings = {
            sliderStep: 102,     // In 'vw'. The step for a pics slider. A bit extended to avoid a 'vw' rendering bug
            controlsTimeout: 200,
            controlsActionOffset: 30,   // Minimum swipe offset from the center for controls to trigger action
            actions: {                  // Map swipe directions to action names (components methods)
                left: 'left',
                right: 'right',
                up: 'like',
                down: 'message'
            }
        }
        this.state = {
            currentPic: 0,
            photosContLeft: 0,
            buttonCSSProp0: this.initialCSSProp,
            buttonCSSProp1: this.initialCSSProp,
            buttonCSSProp2: this.initialCSSProp,
            buttonCSSProp3: this.initialCSSProp
        }
    }

    touchStart(e) {

        // Touch start time is set to detect a fast swipe, to change a slide

        e.persist()
        this.touchStartTime = Date.now()
        if(e.stopPropagation) e.stopPropagation()
        if(e.preventDefault) e.preventDefault()
        e.cancelBubble=true
        e.returnValue=false
        $(this.refs.carousel).addClass('_no-transition')      // Removing transition because js animation takes place
        $(this.refs.stripeHandle).addClass('_no-transition')
        this.swipeOffset = e.touches[0].clientX / $(window).width() * 100  // Converting offset to 'vw'
        this.controlsTimeout = setTimeout(()=>{
            this.showControls(e)
        }, this.settings.controlsTimeout)

    }

    touchEnd(e) {

        // First determine if controls are opened or not
        // If true, then perform an action and set a carousel to its value before swipe start
        // If false, then find out if a swipe was long enough to move a slide or not
        // ! Mind that all the pixel values are converted to 'vw' (value / windowWidth * 100)

        e.persist()
        console.log(e)
        $(this.refs.carousel).removeClass('_no-transition')
        $(this.refs.stripeHandle).removeClass('_no-transition')
        if (this.controlsOpened) {
            this._controlsAction(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
            this.setState({
                photosContLeft: this.state.currentPic * this.settings.sliderStep * -1
            })
            this.controlsOpened = false
        } else {
            console.log('Should move')
            let windowWidth = $(window).width()
            if (Date.now() - this.touchStartTime > 200) {
                if (Math.abs(e.changedTouches[0].clientX / windowWidth * 100 - this.swipeOffset) > this.settings.sliderStep / 2) {
                    console.log('touch fits')
                    if (e.changedTouches[0].clientX / windowWidth * 100 - this.swipeOffset > 0) {
                        this._move('left')
                    } else {
                        this._move('right')
                    }
                } else {
                    this._move('back')
                }
            } else {
                if (e.changedTouches[0].clientX / windowWidth * 100 - this.swipeOffset > -1) {
                    this._move('left')
                } else {
                    this._move('right')
                }
            }
        }
        clearTimeout(this.controlsTimeout)
        this.hideControls()

    }

    touchMove(e) {

        // A bit complex app-specific gesture handler
        // If a move is a swipe, then animating photo slides to reflect swiping
        // If a swiping has stopped and no touchend received (holding), then in some time (this.settings.controlsTimeout) the controls box is opened
        // If the controls box is opened, then controls buttons are being animated, depending on touchmove event coords.

        e.persist()
        e.stopPropagation()
        const x = e.changedTouches[0].clientX
        const y = e.changedTouches[0].clientY
        clearTimeout(this.controlsTimeout)
        this.controlsTimeout = setTimeout(()=>{
            this.showControls(e)
        }, this.settings.controlsTimeout)
        if (this.controlsOpened){
            this._resizeOnMove(x, y)
        } else {
            this._swipe(x)
        }

    }

    _move(dir){

        // Slides change machinery. Working with state's 'currentPic' and 'photosContLeft' props.

        if (dir === 'left') {

            if (this.state.currentPic > 0) {
                this.setState({photosContLeft: (this.state.currentPic - 1) * this.settings.sliderStep * -1})
                this.setState({currentPic: this.state.currentPic - 1})
            }

        } else if (dir === 'right') {

            if (this.state.currentPic + 1 < this.photosLength) {
                this.setState({photosContLeft: (this.state.currentPic + 1) * this.settings.sliderStep * -1})
                this.setState({currentPic: this.state.currentPic + 1})
            }

        } else if (dir === 'back') {

            this.setState({photosContLeft: this.state.currentPic * this.settings.sliderStep * -1})

        }

    }

    _swipe(x) {

        // Animation on slides swipe.
        // ! All values are converted to a 'vw'

        const windowWidth = $(window).width()
        x = (x / windowWidth) * 100    // Converting 'px' to 'vw'
        let left = (this.state.currentPic * this.settings.sliderStep * -1) - (this.swipeOffset - x)
        if (left > 0) {
            left = 0
        } else if (left < this.settings.sliderStep * (this.photosLength - 1) * -1) {
            left = this.settings.sliderStep * (this.photosLength - 1) * -1
        }
        this.setState({photosContLeft: left})

    }

    showControls(e) {

        console.log('Showing controls')
        e.stopPropagation()
        this.controlsOpened = true
        this.controlsCenter = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        }
        this._setControlsBox(e.touches[0].clientX, e.touches[0].clientY)
        $(this.refs.controlsCont).addClass('_visible')
        $(this.refs.carousel).removeClass('_no-transition')
        $(this.refs.stripeHandle).removeClass('_no-transition')
        this.setState({photosContLeft: this.state.currentPic * this.settings.sliderStep * -1})
        setTimeout(()=>{
            $(this.refs.controls).addClass('_no-transition')
        }, 400)
        this.canCalculateButtonSizes = true
        //this._resizeOnMove(e.touches[0].clientX, e.touches[0].clientY)
        const intervalsArray = (()=>{
            let arr = [];
            for (let i=0; i < 15; i++) {
                arr.push(i * 30)
            }
            return arr;
        })()
        intervalsArray.forEach((int)=>{
            setTimeout(()=>{
                this._resizeOnMove(e.touches[0].clientX, e.touches[0].clientY)
            }, int)
        })

    }

    hideControls() {

        console.log('Hiding controls')
        $(this.refs.controls).removeClass('_no-transition')
        $(this.refs.controlsCont).removeClass('_visible')
        this.canCalculateButtonSizes = false
        this.controlsOpened = false
        setTimeout(()=>{
            const indexes = [0, 1, 2, 3]
            indexes.forEach((index)=>{
                this.setState({['buttonCSSProp' + index]: this.initialCSSProp})
            })
        }, 600)

    }

    _setControlsBox(x, y) {

        // Setting a dynamic control box size, in order to avoid a situation, when controls buttons are off the screen

        const side = 300
        const deviceWidth = $(window).width()
        const width = (()=> {
            if (x - (side / 2) < 0) {
                return side + ((x - (side / 2)) * 2)
            } else if (x + (side / 2) > deviceWidth) {
                return side - (((side / 2) + x - deviceWidth) * 2)
            } else {
                return side
            }
        })()
        const height = side
        const left = x - (width / 2)
        const top = y - (side / 2)

        this.boxWidth = width
        this.boxHeight = height
        this.boxLeft = left
        this.boxTop = top

        $(this.refs.controls).css('width', width + 'px').css('height', height + 'px').css('top', top + 'px').css('left', left + 'px')

    }

    _controlsAction(x, y) {

        // Simply call an appropriate component method by its name

        console.log('Calling action')
        const action = this._getActionName(x, y)
        if (action !== null) this[action].call(this)

    }

    _resizeOnMove(x, y) {

        // Resizes control buttons, depending on how close a button is to a touch coords

        if (this.canCalculateButtonSizes) {
            const initialFontSize = 14;
            const elements = [
                {
                    type: 'top',
                    $node: $(this.refs.like)
                },{
                    type: 'right',
                    $node: $(this.refs.right)
                },{
                    type: 'bottom',
                    $node: $(this.refs.message)
                },{
                    type: 'left',
                    $node: $(this.refs.left)
                }
            ]
            elements.forEach((element, index)=>{

                let distance = calculateDistance(element.$node, x, y)
                let prop = Math.log(1000 / distance).toFixed(2)
                if (prop > 5) prop = 5
                this.setState({['buttonCSSProp' + index]: prop})

            })
        }

    }

    _getActionName(x, y) {

        // Returns appropriate action name on touchend, or null, if no action should be triggered

        // Calc offsets first
        const offsetX = x - this.controlsCenter.x
        const offsetY = y - this.controlsCenter.y

        // Then check if an action should be triggered
        if (Math.abs(offsetX) > this.settings.controlsActionOffset || Math.abs(offsetY) > this.settings.controlsActionOffset) {

            // Then find an axis
            if (Math.abs(offsetX) > Math.abs(offsetY)) {
                // X axis found. Next find the direction and return action name from the settings object
                if (offsetX > 0) {
                    return this.settings.actions.right
                } else {
                    return this.settings.actions.left
                }
            } else {
                // Y axis fround. The same
                if (offsetY > 0) {
                    return this.settings.actions.down
                } else {
                    return this.settings.actions.up
                }
            }

        } else {

            return null

        }

    }

    like(id) {
        console.log('Set like')
        this.props.likeUser(id)
    }

    message() {
        console.log('Send message')
        this.props.openMessage()
    }

    left() {
        console.log('left')
        this.props.move('left')
    }

    right(){
        console.log('right')
        this.props.move('right')
    }

    openMessages() {
        console.log('Messages opened')
    }

    render() {

        let photos = this.props.photos.sort(photo => photo.order).map((photo, index)=>{
            let image = `url(https://dcl7m3594apmn.cloudfront.net/images/${photo.name})`
            return (
                <div className="item" key={index} style={{backgroundImage: image}}></div>
            )
        })

        let stripeLeft = this.state.photosContLeft / 3 * -1 + 'vw'

        const swipeOptions = {
            startSlide: 0,
            disableScroll: true,
            continuous: false,
            callback() {
                console.log('slide changed');
            },
            transitionEnd() {
                console.log('ended transition');
            }
        };


        return (
            <div className="user-cont">

                <div
                    className="photos-cont"
                    ref="photosCont"
                    onTouchStart={this.touchStart.bind(this)}
                    onTouchMove={this.touchMove.bind(this)}
                    onTouchEnd={this.touchEnd.bind(this)}
                    >
                    <div className="bg"></div>
                    <div className="carousel" ref="carousel" style={{transform: `translate3d(${this.state.photosContLeft}vw, 0, 0)`, WebkitTransform: `translate3d(${this.state.photosContLeft}vw, 0, 0)`}}>
                        {photos}
                    </div>
                </div>

                <div className="info">
                    <div className="bg"></div>
                    <div className="used-for">{this.props.hereFor.map((name, index)=> (<i className={'icons ' + name} key={index}></i>))}</div>
                    <div className="distance">{this.props.distance}km</div>
                </div>

                <div className="stripe"><div ref="stripeHandle" style={{left: stripeLeft}}></div></div>

                <div className="controls-cont" ref="controlsCont">

                    <div className="controls-ovrl"></div>

                    <div className="user-controls" ref="controls">

                        <button className="like-user" ref="like"><i className="icons heart"  style={{transform: `scale(${this.state.buttonCSSProp0})`, WebkitTransform: `scale(${this.state.buttonCSSProp0})`}}></i></button>
                        { this.props.gotRight ? (<button className="move-right" ref="right"><i className="icons right" style={{transform: `scale(${this.state.buttonCSSProp1})`, WebkitTransform: `scale(${this.state.buttonCSSProp1})`}}></i></button>) : null}
                        <button className="write-message" ref="message"><i className="icons envelope" style={{transform: `scale(${this.state.buttonCSSProp2})`, WebkitTransform: `scale(${this.state.buttonCSSProp2})`}}></i></button>
                        { this.props.gotLeft ? (<button className="move-left" ref="left"><i className="icons left" style={{transform: `scale(${this.state.buttonCSSProp3})`, WebkitTransform: `scale(${this.state.buttonCSSProp3})`}}></i></button>) : null}
                        <div className="glow"></div>

                    </div>

                </div>

            </div>
        )
    }

}