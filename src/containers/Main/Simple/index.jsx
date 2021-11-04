import React, { Component } from 'react'

import {clickTypeInAction, deleteAction, typeDivideTimesAction} from '../../../redux/actions/simple';

import {connect} from 'react-redux'

import './index.css'


class Simple extends Component {
    //点击输入除等号和AC外的其他键
    clickTypeIn = (e) => {
        const data = e.target.innerHTML
        //显示状态和设定状态是异步的，这里也可以用setTimeout
        let updateState = new Promise((res, rej) => {
            this.props.doClickType(data)
            res()
        })
        updateState.then(
            v => {
                const {userInput} = this.props
                this.input.value = userInput
            }
        )
    }

    //统一处理键盘事件
    kbEvent = (e) => {
        const current_input = this.input.value

        switch (e.key) {
            case 'Backspace':
                this.props.doDelete(current_input)
                this.input.value = this.props.userInput
                break;
            case '/':
                this.props.doTypeDivideTimes(this.divideNode.innerHTML)
                this.input.value = this.props.userInput
                break;
            case '*':
                this.props.doTypeDivideTimes(this.timesNode.innerHTML)
                this.input.value = this.props.userInput
                break;
            default:
                break;
        }
    }


    //注册键盘事件
    componentDidMount(){
        document.addEventListener('keydown', this.kbEvent)
    }

    render() {
        return (
            <div className="simple_wrapper">
                <div className="simple_grids">
                    <input ref={c => this.input = c} id="user_input" type="text" maxLength="30"/>
                    <button onClick={this.clickTypeIn} className="num">7</button>
                    <button onClick={this.clickTypeIn} className="num">8</button>
                    <button onClick={this.clickTypeIn} className="num">9</button>
                    <button onClick={this.clickTypeIn} className="operator" ref={c => this.divideNode = c}>&divide;</button>
                    <button onClick={this.clickTypeIn} className="special">(</button>
                    <button onClick={this.clickTypeIn} className="num">4</button>
                    <button onClick={this.clickTypeIn} className="num">5</button>
                    <button onClick={this.clickTypeIn} className="num">6</button>
                    <button onClick={this.clickTypeIn} className="operator" ref={c => this.timesNode = c}>&times;</button>
                    <button onClick={this.clickTypeIn} className="special">)</button>
                    <button onClick={this.clickTypeIn} className="num">1</button>
                    <button onClick={this.clickTypeIn} className="num">2</button>
                    <button onClick={this.clickTypeIn} className="num">3</button>
                    <button onClick={this.clickTypeIn} className="operator">-</button>
                    <button className="special">AC</button>
                    <button onClick={this.clickTypeIn} className="bottom-left num">0</button>
                    <button onClick={this.clickTypeIn} className="dot">.</button>
                    <button onClick={this.clickTypeIn} className="operator">+</button>
                    <button className="bottom-right equal">=</button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({userInput: state}),
    {
        doClickType: clickTypeInAction,
        doDelete: deleteAction,
        doTypeDivideTimes: typeDivideTimesAction,
    }
)(Simple)
