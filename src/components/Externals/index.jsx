import React, { Component } from 'react'
import './index.css'

export default class Externals extends Component {
    render() {
        return (
            <div>
                <div className="links">
                    <a className="links-wrapper" href="/#">
                        <span className="icon icon-wechat"></span>
                    </a>
                    <a className="links-wrapper" rel="noreferrer" target="_blank" href="https://github.com/hwu2016">
                        <span className="icon icon-github"></span>
                    </a>
                </div>
            </div>
        )
    }
}
