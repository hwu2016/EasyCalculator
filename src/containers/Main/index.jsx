import React, { Component } from 'react'
import Simple from './Simple'
import History from './History'
import './index.css'


export default class Main extends Component {
    render() {
        return (
            <div className="main_wrapper">
                <Simple/>
                <History/>
            </div>
        )
    }
}
