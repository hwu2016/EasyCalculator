import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Error extends Component {
    state = {
        err: ''
    }

    componentDidMount(){
        this.tokenErr = PubSub.subscribe('error', (_,stateObj) => {
            this.setState(stateObj)
        })
        this.tokenInput = PubSub.subscribe('input', () => {
            if(this.state.err) this.setState({err: ''})
        })
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.tokenErr)
        PubSub.unsubscribe(this.tokenInput)
    }

    render() {
        return (
            <div id="error">
                <span className="error_display">{this.state.err}</span>
            </div>
        )
    }
}
