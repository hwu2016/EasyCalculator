import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import {evaluate, format} from 'mathjs'
import { nanoid } from 'nanoid'

export default class Evaluator extends Component {
    state = {
         isError: false,
    }

    //计算
    evaluateInput = () => {
        //开启异步任务，先查错，再发布当前input给历史记录，最后计算，添加计算结果到history
        new Promise((resolve, reject) => {
            const { curInput } = this.props
            this.findError(curInput)
            resolve(curInput)
        }).then((curInput) => {
            const { isError } = this.state
            if (!isError) {
                //对当前字符串进行反向翻译处理，乘 ->*, 除 -> /
                let modifiedInput = this.modifyStr(curInput)
                //通过第三方库解决js内置计算精度问题，以及解放科学计数上限
                const res = format(evaluate(modifiedInput),{lowerExp: -8, upperExp: 15, precision: 15})
                if (res === 'Infinity' || res === '-Infinity') {
                    this.reportError('resultError', 'The Divisor Should Not Be Zero')
                } else {
                    //将结果的字符串形式传给Simple
                    PubSub.publish('result', { userInput: res.toString() })
                    //将所需信息传给history用于遍历渲染item
                    PubSub.publish('newItem', {id: nanoid(), lhs: curInput, rhs: res})
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
        let syntax = ''
        //通过栈来测试括号是否正确闭合
        for (let i = 0; i < data.length; i++) {
            let pattern = /[0-9]/
            if (data[i] === '(') {
                //括号内必须有内容
                if (data[i + 1] === ')') {
                    syntax = 'Content Needed In Brackets'
                    break
                } else if (pattern.test(data[i - 1])){ //左括号前不能是数字
                    syntax = 'Operator Is Expected'
                    break
                } else {
                    stack.push(data[i])
                }
            }
            if (data[i] === ')') {
                if (stack.length === 0) {
                    syntax = 'Redundant Bracket Involved'
                    break
                } else if (pattern.test(data[i + 1])) { //右括号后不能是数字
                    syntax = 'Operator Is Expected'
                    break
                } else {
                    stack.pop()
                }
            }
        }
        if (stack.length !== 0 && syntax === '') syntax = 'Redundant Bracket Involved'
        if (syntax) {
            this.reportError('syntaxError', syntax)
            this.setState({ isError: true })
        }
    }

    //测试小数点
    testDecimalPt = (data) => {
        let syntax = true
        for (let i = 0; i < data.length; i++) {
            if (data[i] === '.') {
                //设定小数点前后字符的正则表达式-只能是数字
                let pattern = /[0-9]/
                let n = data.length
                if (i === (0 || n - 1) || !pattern.test(data[i - 1]) || !pattern.test(data[i + 1])) {
                    syntax = false
                    break
                }
            }
        }
        if (!syntax) {
            this.reportError('syntaxError', 'Unexpected Decimal Point')
            this.setState({ isError: true })
        }
    }

    //测试四则运算
    testOperator = (data) => {
        let syntax = true
        const n = data.length
        for (let i = 0; i < n; i++) {
            //判断乘除号
            if (data[i] === '\u00d7' || data[i] === '\u00f7') {
                //设定运算符前后字符的正则表达式-分情况加括号
                let patternBefore = /[0-9]|\)/
                let patternAfter = /[0-9]|\(/
                //首位和末位，以及前后字符不符合正则表达式报错
                if (i === (0 || n - 1) || !patternBefore.test(data[i - 1]) || !patternAfter.test(data[i + 1])) {
                    syntax = false
                    break
                }
            }
            //判断加减号，首位不报错（考虑正负号）
            if (data[i] === '+' || data[i] === '-') {
                //设定运算符前后字符的正则表达式-分情况加括号-与乘除有所不同，正负号是可以跟在左括号后的
                let patternBefore = /[0-9]|\)|\(/
                let patternAfter = /[0-9]|\(/
                //末位，以及前后字符不符合正则表达式报错
                if (i === 0) continue
                if (i === n - 1 || !patternBefore.test(data[i - 1]) || !patternAfter.test(data[i + 1])) {
                    syntax = false
                    break
                }
            }
        }
        if (!syntax) {
            this.reportError('syntaxError', 'Unexpected Operator Error')
            this.setState({ isError: true })
        }
    }

    //发布错误信息给Error组件
    reportError = (errorType, detail) => {
        PubSub.publish('error', { err: `${errorType}: ${detail}` })
    }

    componentDidMount(){
        //订阅Simple，当报错结束后，可以改变自己的状态
        this.tokenIsError = PubSub.subscribe('updateIsError', () => {
            this.setState({isError: false})
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.tokenIsError)
    }

    render() {
        return (
            <div>
                <button onClick={this.evaluateInput} className="bottom-right equal">=</button>
            </div>
        )
    }
}
