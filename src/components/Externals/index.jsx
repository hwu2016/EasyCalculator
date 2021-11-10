import React, { Component} from 'react'
import wechat from '../../img/wechat.jpeg'
import './index.css'

export default class Externals extends Component {
    state = {imgDisplay: false}

    showQR = () => {
        const {imgDisplay} = this.state
        this.setState({imgDisplay: !imgDisplay})
    }

    render() {
        const {imgDisplay} = this.state
        return (
            <div>
                <div className="links">
                    <span id="copyright">Copyright &#169; 2021 EasyCalculator, Ryan Wu. All Rights Reserved</span>
                    <a className="links-wrapper" href="/#" onClick={this.showQR}>
                        <span className="icon icon-wechat"></span>
                    </a>
                    <a className="links-wrapper" rel="noreferrer" target="_blank" href="https://github.com/hwu2016">
                        <span className="icon icon-github"></span>
                    </a>
                    <img src={wechat} style={{display: imgDisplay ? 'block' : 'none'}} alt="wechatimg" className="wechat_img"/>
                </div>
            </div>
        )
    }
}
