import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'

import BuySellForm from './BuySellForm'

class BuySellItems extends Component {
  constructor () {
    super()

    this.state = {
      character: null,
      goldChange: 0
    }
  }

  async componentDidMount () {
    try {
      const res = await axios({
        url: `${apiUrl}/characters/${this.props.match.params.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ character: res.data.character })
    } catch (error) {
      console.error(error)
    }
  }

  handleChange = event => {
    const fieldName = event.target.name
    if (fieldName === 'goldChange') {
      this.setState({ ...this.state, [fieldName]: event.target.value })
    } else {
      this.setState({ character: { ...this.state.character, [fieldName]: event.target.value } })
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { character, goldChange } = this.state
    const gold = parseInt(character.gold) + parseInt(goldChange)

    if (gold < 0) {
      this.props.alert({ heading: 'Error',
        message: 'You cannot have negative gold!',
        variant: 'danger'
      })
      return
    }

    try {
      const res = await axios({
        url: `${apiUrl}/characters/${character.id}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        },
        data: {
          character: {
            gold: gold,
            items: character.items
          }
        }
      })
      this.props.alert({ heading: 'Success!',
        message: 'Your character has been updated',
        variant: 'success'
      })
      this.props.history.push(`/characters/${res.data.character.id}`)
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { character } = this.state

    if (!character) {
      return (
        <h2 className="header">Buy or Sell Items</h2>
      )
    } else {
      return (
        <Fragment>
          <h2 className="header">Buy or Sell Items</h2>
          <BuySellForm
            character={character}
            goldChange={this.goldChange}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </Fragment>
      )
    }
  }
}

export default withRouter(BuySellItems)
