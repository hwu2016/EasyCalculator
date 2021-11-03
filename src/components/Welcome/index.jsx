import React, { Component } from 'react'
import './index.css'

export default class Welcome extends Component {
    state = {
        isExit: false,
        opacity: 1
    }

    exitWelcomePage = () => {
        let {isExit, opacity} = this.state
        this.timer = setInterval(() => {
            opacity -= 0.05
            this.setState({opacity})
            if (opacity <= 0){
                clearInterval(this.timer)
                this.setState({isExit: !isExit, opacity: 0})
            }
        }, 30)
    }

    render() {
        return (
            <div>
               <div className="welcome_wrapper" style={{opacity: this.state.opacity}}>
                    <div className="title">
                        <p>Cyber Calculator</p>
                    </div>
                    <button onClick={this.exitWelcomePage} className="confirm">Get Started!</button>   
                </div> 
            </div>
        )
    }
}
