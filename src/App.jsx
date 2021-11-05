import React, { Component } from 'react'
import Externals from './components/Externals'
// import Welcome from './components/Welcome'
import Main from './containers/Main'

export default class App extends Component {
  state = {
    isStart: false
  }

  startApp = () => {
      this.setState({isStart: true})
  }

  render() {
    return(
      <div>
        {/* {this.state.isStart === false ? <Welcome startApp={this.startApp}/> : <Main/>}  */}
        <Main/>
        <Externals />
      </div>
    )
  }
}

