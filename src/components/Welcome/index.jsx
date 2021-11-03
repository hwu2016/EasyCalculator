import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Welcome extends Component {
    state = {
        opacity: 1
    }

    static propTypes = {
        startApp: PropTypes.func.isRequired
    }

    exitWelcomePage = () => {
        let { opacity } = this.state
        this.timer = setInterval(() => {
            opacity -= 0.05
            this.setState({ opacity })
            if (opacity <= 0) {
                this.props.startApp()
            }
        }, 30)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render() {
        return (
            <div className="welcome_wrapper" style={{ opacity: this.state.opacity }}>
                <div className="title">
                    <p>Cyber Calculator</p>
                </div>
                <button onClick={this.exitWelcomePage} className="confirm">Get Started!</button>
            </div>
        )
    }
}
