import React from 'react'
import _ from 'underscore'

function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
}

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.initialCSSProp = 29
        this.photosLength = this.props.photos.length
        this.canCalculateButtonSizes = false    // For touchMove event.
        this.swipeOffset = 0   // Swipe offset on touchstart
        this.controlsTimeout = null  // Holds the timeout to show user controls
        this.touchStartTime = 0
        this.settings = {
            controlsTimeout: 300
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

        this.touchStartTime = Date.now()
        e.persist()
        console.log(e)
        if(e.stopPropagation) e.stopPropagation()
        if(e.preventDefault) e.preventDefault()
        e.cancelBubble=true
        e.returnValue=false
        $(this.refs.carousel).addClass('_no-transition')
        $(this.refs.stripeHandle).addClass('_no-transition')
        this.swipeOffset = e.touches[0].clientX
        this.controlsTimeout = setTimeout(()=>{
            this.showControls(e)
        }, this.settings.controlsTimeout)

    }

    touchEnd(e) {

        e.persist()
        console.log(e)
        $(this.refs.carousel).removeClass('_no-transition')
        $(this.refs.stripeHandle).removeClass('_no-transition')
        if (this.controlsOpened) {
            this._controlsAction(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
            this.setState({
                photosContLeft: this.state.currentPic * $(window).width() * -1
            })
            this.controlsOpened = false
        } else {
            console.log('Should move')
            if (Date.now() - this.touchStartTime > 200) {
                if (Math.abs(e.changedTouches[0].clientX - this.swipeOffset) > $(window).width() / 2) {
                    console.log('touch fits')
                    if (e.changedTouches[0].clientX - this.swipeOffset > 0) {
                        this._move('left')
                    } else {
                        this._move('right')
                    }
                } else {
                    this._move('back')
                }
            } else {
                if (e.changedTouches[0].clientX - this.swipeOffset > 0) {
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

        console.log('move called')
        console.log(this.state.currentPic)
        if (dir === 'left') {
            console.log('left should be called')
            if (this.state.currentPic > 0) {
                console.log('left called')
                console.log('Slide is zero')
                console.log((this.state.currentPic - 1) * $(window).width())
                console.log((this.state.currentPic - 1))
                this.setState({photosContLeft: (this.state.currentPic - 1) * $(window).width() * -1})
                this.setState({currentPic: this.state.currentPic - 1})
            }
        } else if (dir === 'right') {
            console.log('right should be called')
            if (this.state.currentPic + 1 < this.photosLength) {
                console.log('right called')
                this.setState({photosContLeft: (this.state.currentPic + 1) * $(window).width() * -1})
                this.setState({currentPic: this.state.currentPic + 1})
                console.log('right move worked')
                console.log(this.state.currentPic)
                console.log(this.state.photosContLeft)
                console.log($(window).width())
            }
        } else if (dir === 'back') {
            this.setState({photosContLeft: this.state.currentPic * $(window).width() * -1})
        }

    }

    _swipe(x) {

        let left = (this.state.currentPic * $(window).width() * -1) - (this.swipeOffset - x)
        if (left > 0) {
            left = 0
        } else if (left < $(window).width() * (this.photosLength - 1) * -1) {
            left = $(window).width() * (this.photosLength - 1) * -1
        }
        this.setState({photosContLeft: left})

    }

    showControls(e) {

        console.log('Showing controls')
        e.stopPropagation()
        this.controlsOpened = true
        this._setControlsBox(e.touches[0].clientX, e.touches[0].clientY)
        $(this.refs.controlsCont).addClass('_visible')
        $(this.refs.carousel).removeClass('_no-transition')
        $(this.refs.stripeHandle).removeClass('_no-transition')
        this.setState({photosContLeft: this.state.currentPic * $(window).width() * -1})
        setTimeout(()=>{
            $(this.refs.controls).addClass('_no-transition')
        }, 400)
        setTimeout(()=>{
            this._resizeOnMove(e.touches[0].clientX, e.touches[0].clientY)
        }, 398)

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

        const side = 300
        const deviceWidth = $(window).width()
        const width = (()=> {
            if (x - (side / 2) < 0) {
                return side + ((x - (side / 2)) * 2)
            } else if (x + (side / 2) > deviceWidth) {
                return side - (x + (side / 2)) + deviceWidth
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

        this.canCalculateButtonSizes = true

        $(this.refs.controls).css('width', width + 'px').css('height', height + 'px').css('top', top + 'px').css('left', left + 'px')

    }

    _controlsAction(x, y) {

        console.log('Calling action')
        const action = this._getActionName(x, y)
        if (action !== null) this[action].call(this)

    }

    _resizeOnMove(x, y) {

        if (this.canCalculateButtonSizes) {
            const initialFontSize = 14;
            const elements = [
                {
                    type: 'top',
                    $node: $(this.refs.message)
                },{
                    type: 'right',
                    $node: $(this.refs.right)
                },{
                    type: 'bottom',
                    $node: $(this.refs.like)
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

        // First save elements + action names in an array.
        // Then map through this array and get sizes, save result in coords array
        // Then find and element in coords array, where x and y coords from the touchend
        // fit the sizes. Return action name.

        let elements, coords, action;

        const $box = $(this.refs.controlsCont)
        const boxLeft = $box.offset().left
        const boxTop = $box.offset().top
        const boxWidth = $box.width()

        elements = [
            {
                name: 'message',
                node: $(this.refs.message)
            },
            {
                name: 'like',
                node: $(this.refs.like)
            },
            {
                name: 'left',
                node: $(this.refs.left)
            },
            {
                name: 'right',
                node: $(this.refs.right)
            }
        ]

        coords = elements.map((element)=>{

            let elemWidth = parseInt(element.node.css('width'), 10)  // Using css method instead of .width(), because of a weird behavior. FIX IT!
            let elemHeight = parseInt(element.node.css('height'), 10)
            let elemLeft = element.node.offset().left
            let elemTop = element.node.offset().top

            let left = elemLeft + boxLeft
            let top = elemTop + boxTop
            let right = elemWidth + left
            let bottom = elemHeight + top
            return {
                name: element.name,
                x: [left, right],
                y: [top, bottom]
            }
        })

        console.log(coords)
        console.log(x)
        console.log(y)

        action = coords.find((item)=>{
            return item.x[0] < x && item.x[1] > x && item.y[0] < y && item.y[1] > y
        })

        if (action !== undefined) {
            return action.name
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

        let stripeLeft = this.state.photosContLeft / 3 * -1 + 'px'

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
                    <div className="carousel" ref="carousel" style={{transform: `translate3d(${this.state.photosContLeft}px, 0, 0)`, WebkitTransform: `translate3d(${this.state.photosContLeft}px, 0, 0)`}}>
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

                        <button className="write-message" ref="message"><i className="icons envelope"  style={{transform: `scale(${this.state.buttonCSSProp0})`, WebkitTransform: `scale(${this.state.buttonCSSProp0})`}}></i></button>
                        { this.props.gotRight ? (<button className="move-right" ref="right"><i className="icons heart" style={{transform: `scale(${this.state.buttonCSSProp1})`, WebkitTransform: `scale(${this.state.buttonCSSProp1})`}}></i></button>) : null}
                        <button className="like-user" ref="like"><i className="icons heart" style={{transform: `scale(${this.state.buttonCSSProp2})`, WebkitTransform: `scale(${this.state.buttonCSSProp2})`}}></i></button>
                        { this.props.gotLeft ? (<button className="move-left" ref="left"><i className="icons envelope" style={{transform: `scale(${this.state.buttonCSSProp3})`, WebkitTransform: `scale(${this.state.buttonCSSProp3})`}}></i></button>) : null}
                        <div className="glow"></div>

                    </div>

                </div>

            </div>
        )
    }

}