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

    clearHistory = () => {
        this.setState({records: []})
    }

    componentDidMount(){
        this.tokenNewItem = PubSub.subscribe('newItem', (_, recordObj) => {
            const {records} = this.state
            this.setState({records: [recordObj, ...records]})
        })
    }

    componentDidUpdate(){
        //check是否当前已达到record, 若达到则删除队尾
        const {records} = this.state
        if (records.length === 10) {
            records.pop()
            this.setState({records: records})
        }
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.tokenNewItem)
    }


    render() {
        const {records} = this.state
        return (
            <div className="history_wrapper">
                <div id='title'>
                    <p>Historical Records</p>
                    <button id="clearAll" onClick={this.clearHistory}></button>
                </div>
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
