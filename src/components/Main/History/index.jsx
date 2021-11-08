import React, { Component } from 'react'
import Item from './Item'
import PubSub from 'pubsub-js'
import './index.css'

export default class History extends Component {
    state = {
        records: [],                                                                                                                                                                                                                                                                                                                                                                                 
    }

    deleteRecord = (id) => {
        const {records} = this.state
        const newRecords = records.filter((recordObj) => {
            return recordObj.id !== id
        })
        this.setState({records: newRecords})
    }    

    componentDidMount(){
        this.tokenNewItem = PubSub.subscribe('newItem', (_, recordObj) => {
            const {records} = this.state
            this.setState({records: [recordObj, ...records]})
        })
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.tokenNewItem)
    }


    render() {
        const {records} = this.state
        return (
            <div className="history_wrapper">
                <p id='title'>Historical Records</p>
                <ul className="itemWrapper">
                    {
                        records.map((record) => {
                            return <Item key={record.id} id={record.id} lhs={record.lhs} rhs={record.rhs} deleteRecord={this.deleteRecord}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}
