import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import Button from 'react-bootstrap/Button'

const demoAccount = {
  email: 'demo@demo.com',
  password: 'password'
}

class Home extends Component {
  onDemoSignIn = event => {
    const { alert, history, setUser } = this.props

    signIn(demoAccount)
      .then(res => setUser(res.data.user))
      .then(() => alert({
        heading: 'Sign In Success',
        message: 'You\'ve signed in to the demo account',
        variant: 'success'
      }))
      .then(() => history.push('/roles'))
      .catch(() => {
        alert({
          heading: 'Sign In Failed',
          message: 'Oops, something went wrong',
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <div className='home-wrapper'>
        <h2 className="header">Gloomhaven Character Log</h2>
        <p>This app can be used to keep track of character information and status for the game Gloomhaven.</p>
        {(!this.props.user) ? <Button onClick={this.onDemoSignIn} size="sm">Log in to Demo Account</Button> : ''}
        <hr/>
        <div className="home-imgs">
          <img className="char-home-img" src={`${process.env.PUBLIC_URL}/char_img/img_br.jpg`} alt={'An image of the Brute class'}/>
          <img className="char-home-img" src={`${process.env.PUBLIC_URL}/char_img/img_cr.jpg`} alt={'An image of the Cragheart class'}/>
          <img className="char-home-img" src={`${process.env.PUBLIC_URL}/char_img/img_mt.jpg`} alt={'An image of the Mindthief class'}/>
          <img className="char-home-img" src={`${process.env.PUBLIC_URL}/char_img/img_sc.jpg`} alt={'An image of the Scoundrel class'}/>
          <img className="char-home-img" src={`${process.env.PUBLIC_URL}/char_img/img_sw.jpg`} alt={'An image of the Spellweaver class'}/>
          <img className="char-home-img" src={`${process.env.PUBLIC_URL}/char_img/img_ti.jpg`} alt={'An image of the Tinkerer class'}/>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
