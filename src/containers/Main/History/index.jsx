import React, { Component } from 'react'
import './index.css'

export default class History extends Component {
    state = {
        offset: 0
    }
    
    componentDidMount(){
        setTimeout(() => {
            this.setState({offset: -40})
        }, 10)
    }

    render() {
        const {offset} = this.state
        return (
            <div className="history_wrapper" style={{transform: `translate(${offset}%, 0)`}}>
                
            </div>
        )
    }
}
