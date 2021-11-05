import React, { Component } from 'react'
import Error from './Error'
import Evaluator from './Evaluator'
import PubSub from 'pubsub-js'

import './index.css'

export default class Simple extends Component {
    state = {
        userInput: '',
    }

    //点击输入除等号和CE外的其他键
    clickTypeIn = (e) => {
        //限制最长字符
        if (this.input.innerHTML.length >= 20) return;
        const data = e.target.innerHTML
        this.input.innerHTML += data 
        this.setState({userInput: this.input.innerHTML})
    }

    //CE：删除最后字符
    deleteLast = () => {
        let cur_input = this.input.innerHTML
        this.input.innerHTML = cur_input.substr(0, cur_input.length - 1)
        this.setState({userInput: this.input.innerHTML})
    }

    //统一处理键盘事件
    kbEvent = (e) => {
        const kbfilter = ['1','2','3','4','5','6','7','8','9','0','+','-','*','/','(',')','Backspace']
        if (kbfilter.indexOf(e.key) === -1) return;     
        switch (e.key) {
            case '(':
                this.lbrNode.click()
                break
            case ')':
                this.rbrNode.click()
                break
            case '/':
                this.divideNode.click()
                break
            case '*':
                this.timesNode.click()
                break
            case 'Backspace':
                this.deleteNode.click()
                break
            default:
                this.input.innerHTML += e.key
                this.setState({userInput: this.input.innerHTML})
                break
        }
    }


    componentDidMount(){
        //注册键盘事件
        document.addEventListener('keydown', this.kbEvent)
        //订阅从Evaluator更新的结果消息
        this.tokenResult = PubSub.subscribe('result', (_,stateObj) => {
            this.setState(stateObj)
            this.input.innerHTML = this.state.userInput
        })
    }

    //每次更新发布消息，通知取消报错提示
    componentDidUpdate(){
        PubSub.publish('input')
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.tokenResult)
    }

    render() {
        return (
            <div className="simple_wrapper">
                <div className="simple_grids">
                    <span ref={c => this.input = c} id="user_input" maxLength="15"></span>
                    <button onClick={this.clickTypeIn} className="num">7</button>
                    <button onClick={this.clickTypeIn} className="num">8</button>
                    <button onClick={this.clickTypeIn} className="num">9</button>
                    <button onClick={this.clickTypeIn} className="operator" ref={c => this.divideNode = c}>&divide;</button>
                    <button onClick={this.clickTypeIn} ref={c => this.lbrNode = c} className="special">(</button>
                    <button onClick={this.clickTypeIn} className="num">4</button>
                    <button onClick={this.clickTypeIn} className="num">5</button>
                    <button onClick={this.clickTypeIn} className="num">6</button>
                    <button onClick={this.clickTypeIn} className="operator" ref={c => this.timesNode = c}>&times;</button>
                    <button onClick={this.clickTypeIn} ref={c => this.rbrNode = c} className="special">)</button>
                    <button onClick={this.clickTypeIn} className="num">1</button>
                    <button onClick={this.clickTypeIn} className="num">2</button>
                    <button onClick={this.clickTypeIn} className="num">3</button>
                    <button onClick={this.clickTypeIn} className="operator">-</button>
                    <button onClick={this.deleteLast} ref={c => this.deleteNode = c} className="special">CE</button>
                    <button onClick={this.clickTypeIn} className="bottom-left num">0</button>
                    <button onClick={this.clickTypeIn} className="dot">.</button>
                    <button onClick={this.clickTypeIn} className="operator">+</button>
                    <Evaluator curInput={this.state.userInput}/>
                    <Error/>
                </div>
            </div>
        )
    }
}

