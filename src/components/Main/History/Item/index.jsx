import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Item extends Component {
    render() {
        return (
            <li className="item">
                <button id="item_del"></button>
                <button id="item_back"></button>
                <span id="item_content">123</span>
            </li>
        )
    }
}
