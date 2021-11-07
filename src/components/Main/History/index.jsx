import React, { Component } from 'react'
import './index.css'
import Item from './Item'

export default class History extends Component {
    state = {
        records: [1]                                                                                                                                                                                                                                                                                                                                                                                        
    }
    render() {
        const {records} = this.state
        return (
            <div className="history_wrapper">
                <p id='title'>Historical Records</p>
                <ul className="itemWrapper">
                    {
                        records.map((record) => {
                            return <Item/>
                        })
                    }
                </ul>
            </div>
        )
    }
}
