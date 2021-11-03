import React, { Component } from 'react'
import Externals from './components/Externals'
import Welcome from './components/Welcome'
import Main from './containers/Main'

export default class App extends Component {
  render() {
    return(
      <div>
        {/* <Welcome /> */}
        <Main/>
        <Externals />
      </div>
    )
  }
}

