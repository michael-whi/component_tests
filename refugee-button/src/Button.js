import React from 'react';
import 'font-awesome/css/font-awesome.css';

import { getRandomInt } from './utils'

export default class Button extends React.Component {

    getRandomPosition(){
        const newTop = getRandomInt(0, window.innerHeight)
        const newLeft = getRandomInt(0, window.innerWidth)
        return ({ top: newTop, left: newLeft })
    }

    validateValue(newPosition){
        // we have to check for a negative value, cause the button can run away beyond the screen 
        return newPosition < 0 ? newPosition * -1 : newPosition
    }

    componentWillUnmount(){
        this.buttonElement.onmouseover = null
    }

    componentDidMount(){
        const randomPosition = this.getRandomPosition()
        const buttonElement = document.getElementsByClassName('refugee-button')[0]
 
        buttonElement.style.top = `${this.validateValue(randomPosition.top - buttonElement.offsetHeight)}px`
        buttonElement.style.left = `${this.validateValue(randomPosition.left - buttonElement.offsetWidth)}px`

        buttonElement.onmouseover = () => {
            const newPos = this.getRandomPosition()
            buttonElement.style.top = `${this.validateValue(newPos.top - buttonElement.offsetHeight)}px`
            buttonElement.style.left = `${this.validateValue(newPos.left - buttonElement.offsetWidth)}px`
        }

        this.buttonElement = buttonElement
    }

    render(){
        return(
            <React.Fragment>
                <button
                    className="refugee-button"
                >
                    <div className="refugee-button__icon-block">
                        <i className="fa fa-frown-o" style={{ 
                            //I am sorry
                            fontSize: '40px', 
                            color: '#4fabff', 
                            width: '50px', 
                            marginTop: '3px' 
                        }}/>
                    </div>
                    <div className="refugee-button__title-block">
                        <div className="refugee-button__title">{this.props.title}</div>
                    </div>
                </button>
            </React.Fragment>
        )
    }
}