import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Evaluator extends Component {
    state = {isError: false}

    //计算
    evaluate = () => {
        //开启异步任务，先查错再计算
        new Promise((resolve, reject) => {
            const {curInput} = this.props
            this.findError(curInput)
            resolve(curInput)
        }).then((curInput) => {
            const {isError} = this.state
            if (!isError) {
                //对当前字符串进行反向翻译处理，乘 ->*, 除 -> /
                let modifiedInput = this.modifyStr(curInput)
                // eslint-disable-next-line
                const res = eval(modifiedInput)
                if (res === Infinity || res === -Infinity) {
                    this.reportError('resultError', 'The Divisor Should Not Be Zero')
                } else {
                    //返回结果的字符串形式
                    this.reportResult(res.toString())
                }
            }
        })
    }

    //将乘除号转换为js能编译的语言
    modifyStr = (data) => {
        return data.replace(/\u00d7/g, '*').replace(/\u00f7/g, '/')
    } 

    //寻找输入格式错误
    findError = (data) => {
        this.testBracket(data)
        this.testDecimalPt(data)
        this.testOperator(data)
    }

    //测试括号
    testBracket = (data) => {
        const stack = []
        let syntax = true
        for (let char of data){
            if (char === '(') stack.push(char)
            if (char === ')') {
                stack.length ? stack.pop(): (syntax = false)
            }
        }
        if(stack.length !== 0) syntax = false
        if(!syntax) {
            this.reportError('syntaxError', 'Unexpected Bracket Involved')
            this.setState({isError: true})
        }
    }

    //测试小数点
    testDecimalPt = (data) => {
        let syntax = true
        for (let index in data) {
            if (data[index] === '.'){
                let pattern = /[0-9]/ 
                let n = data.length
                if ((index === 0 || n - 1) || !pattern.test(data[index - 1])){
                    syntax = false
                    break
                }
            }
        }
        if (!syntax) {
            this.reportError('syntaxError', 'Unexpected Decimal Point')
            this.setState({isError: true})
        }
    }

    //测试四则运算
    testOperator = (data) => {
        let syntax = true
        const n = data.length
        for (let i = 0; i < n; i++) {
            //判断乘除号
            if (data[i] === '\u00d7' || data[i] === '\u00f7'){
                //首位和末位，左括号后，右括号前报错
                if (i === (0 || n - 1) || data[i - 1] === '('|| data[i + 1] === ')'){
                    syntax = false
                    break
                }
            }
            //判断加减号，首位不报错（考虑正负号）
            if (data[i] === '+' || data[i] === '-'){
                //末位，左括号后，右括号前报错(需要将string的index转化成Number)
                if (i === n - 1 || data[i - 1] === '('|| data[i + 1] === ')'){
                    syntax = false
                    break
                }
            }
        }
        if (!syntax) {
            this.reportError('syntaxError', 'Unexpected Operator Error')
            this.setState({isError: true})
        }
    }

    //发布错误信息给Error组件
    reportError = (errorType, detail) => {
        PubSub.publish('error', {err: `${errorType}: ${detail}`})
    }

    //发布结果给Simple组件
    reportResult = (result) => {
        PubSub.publish('result', {userInput: result})
    }

    render() {
        return (
            <div>
                <button onClick={this.evaluate} className="bottom-right equal">=</button>
            </div>
        )
    }
}
