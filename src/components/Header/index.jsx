import React, { Component } from 'react'
import logo from '../../img/Logo.png'
import './index.css'

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <img src={logo} alt="logo" />
            </div>
        )
    }
}
