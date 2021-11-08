import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Item extends Component {
    handleDelete = (id) => {
        return () => {
            this.props.deleteRecord(id)
        }
    }

    handleFlashback = (lhs) => {
        return () => {
            PubSub.publish('flashback', lhs)
        }
    }

    render() {
        const {id, lhs, rhs} = this.props
        return (
            <li className="item">
                <button id="item_del" onClick={this.handleDelete(id)}></button>
                <button id="item_flashback" onClick={this.handleFlashback(lhs)}></button>
                <span id="item_content">
                    <span id="item_lhs">{lhs.length > 16 ? '......' : lhs}</span>
                    <span id="item_eq">=</span>
                    <span id="item_rhs">{rhs.length > 16 ? '......' : rhs}</span>
                </span>
            </li>
        )
    }
}
