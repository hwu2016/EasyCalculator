import React, { Component } from 'react'
import Simple from './Simple'
import History from './History'
import store from '../../redux/store'
import { Provider } from 'react-redux'
import './index.css'


export default class Main extends Component {
    state = {
        opacity: 0,
        width: '100%'
    }

    componentDidMount(){
        let {opacity} = this.state
        this.timer = setInterval(() => {
            opacity += 0.05
            this.setState({opacity, width: '62rem'})
            if (opacity >= 1){
                clearInterval(this.timer)
            }
        }, 30)
    }

    render() {
        const {opacity, width} = this.state
        return (
            <div className="main_wrapper" style={{opacity, width}}>
                <Provider store={store}>
                    <Simple/>
                    <History/>
                </Provider>
            </div>
        )
    }
}
