import React, { Component } from 'react'
import Externals from './components/Externals'
import Header from './components/Header'
import Main from './components/Main'

export default class App extends Component {
  render() {
    return(
      <div>
        <Header/>
        <Main/>
        <Externals />
      </div>
    )
  }
}

