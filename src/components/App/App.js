import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Roles from './../Roles/Roles'
import Role from './../Roles/Role'
import Characters from './../Characters/Characters'
import Character from './../Characters/Character'
import CreateCharacter from './../Characters/CreateCharacter'
import ScenarioSuccess from './../Characters/ScenarioSuccess'
import EventUpdate from './../Characters/EventUpdate'
import BuySellItems from './../Characters/BuySellItems'
import ChangeLocation from './../Characters/ChangeLocation'
import Home from './../Home/Home'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <Route exact path='/' render={() => (
            <Home alert={this.alert} setUser={this.setUser} user={user} />
          )} />
          <Route exact path='/roles' render={() => (
            <Roles alert={this.alert}/>
          )} />
          <Route exact path='/roles/:id' render={() => (
            <Role user={user} alert={this.alert}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/roles/:id/create-character' render={() => (
            <CreateCharacter alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/characters' render={() => (
            <Characters alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/characters/:id' render={() => (
            <Character alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/characters/:id/scenario-update' render={() => (
            <ScenarioSuccess alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/characters/:id/event-update' render={() => (
            <EventUpdate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/characters/:id/buy-sell-items' render={() => (
            <BuySellItems alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/characters/:id/change-location' render={() => (
            <ChangeLocation alert={this.alert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
