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
        const {userInput} = this.state
        //限制最长字符
        if (userInput.length >= 20) return;
        const data = e.target.innerHTML 
        this.setState({userInput: userInput + data })
    }

    //CE：删除最后字符
    deleteLast = () => {
        const {userInput} = this.state
        this.setState({userInput: userInput.substr(0, userInput.length - 1)})
    }

    //AC：删除所有字符
    deleteAll = () => {
        this.setState({userInput: ''})
    }

    //统一处理键盘事件
    kbEvent = (e) => {
        const kbfilter = ['1','2','3','4','5','6','7','8','9','0','+','-','*','/','(',')','Backspace','Enter']
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
            case 'Enter':
                this.EvaluatorNode.evaluateInput()
                break
            default:
                this.setState({userInput: this.state.userInput + e.key})
                break
        }
    }


    componentDidMount(){
        //注册键盘事件
        document.addEventListener('keydown', this.kbEvent)
        //订阅从Evaluator更新的结果消息
        this.tokenResult = PubSub.subscribe('result', (_,stateObj) => {
            this.setState(stateObj)
        })
        //订阅History组件中的item，用于还原历史记录
        this.tokenFlashback = PubSub.subscribe('flashback', (_,lhs) => {
            this.setState({userInput: lhs})
        })
    }

    //每次组件更新时，发布消息，通知Error取消报错提示，通知Evaluator改变当前状态
    componentDidUpdate(){
        PubSub.publish('input')
        PubSub.publish('updateIsError')
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.tokenResult, this.tokenFlashback)
    }

    render() {
        const {userInput} = this.state
        return (
            <div className="simple_wrapper">
                <div className="simple_grids">
                    <span id="user_input">{userInput}</span>
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
                    <button onClick={this.deleteAll} className="bottom-left special">AC</button>
                    <button onClick={this.clickTypeIn} className="num">0</button>
                    <button onClick={this.clickTypeIn} className="dot">.</button>
                    <button onClick={this.clickTypeIn} className="operator">+</button>
                    <Evaluator curInput={userInput} ref={c => this.EvaluatorNode = c}/>
                    <Error/>
                </div>
            </div>
        )
    }
}

