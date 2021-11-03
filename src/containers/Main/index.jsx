import React, { Component } from 'react'
import Simple from './Simple'
import History from './History'
import './index.css'


export default class Main extends Component {
    state = {
        opacity: 0,
        width: 0
    }

    componentDidMount(){
        let {opacity} = this.state
        this.timer = setInterval(() => {
            opacity += 0.05
            this.setState({opacity})
            if (opacity >= 1){
                clearInterval(this.timer)
            }
        }, 30)
    }

    render() {
        const {opacity} = this.state
        return (
            <div className="main_wrapper" style={{opacity: opacity}}>
                <Simple/>
                <History/>
            </div>
        )
    }
}
