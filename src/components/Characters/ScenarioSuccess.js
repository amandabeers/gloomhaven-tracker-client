import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'

import GenUpdateForm from './GenUpdateForm'

class ScenarioSuccess extends Component {
  constructor () {
    super()

    this.state = {
      character: null,
      xpGain: 0,
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
      this.props.alert({ heading: 'Error',
        message: 'Oops! Something went wrong.',
        variant: 'danger'
      })
    }
  }

  handleChange = event => {
    const fieldName = event.target.name
    if (fieldName === 'xpGain' || fieldName === 'goldChange') {
      this.setState({ ...this.state, [fieldName]: event.target.value })
    } else {
      this.setState({ character: { ...this.state.character, [fieldName]: event.target.value } })
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { character, xpGain, goldChange } = this.state
    const xp = parseInt(character.experience) + parseInt(xpGain)
    const gold = parseInt(character.gold) + parseInt(goldChange)

    if (gold < 0) {
      this.props.alert({ heading: 'Error',
        message: 'You cannot have negative gold!',
        variant: 'danger'
      })
      return
    }

    if (xp < 0) {
      this.props.alert({ heading: 'Error',
        message: 'You cannot have negative experience!',
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
            experience: xp,
            gold: gold,
            items: character.items,
            notes: character.notes
          }
        }
      })
      this.props.alert({ heading: 'Success!',
        message: 'Your character has been updated',
        variant: 'success'
      })
      this.props.history.push(`/characters/${res.data.character.id}`)
    } catch (error) {
      this.props.alert({ heading: 'Error',
        message: 'Oops! Something went wrong.',
        variant: 'danger'
      })
    }
  }

  render () {
    const { character } = this.state

    if (!character) {
      return (
        <h2 className="header">Character Update after Scenario Success</h2>
      )
    } else {
      return (
        <Fragment>
          <h2 className="header">Character Update after Scenario Success</h2>
          <GenUpdateForm
            character={character}
            xpGain={this.xpGain}
            goldChange={this.goldChange}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </Fragment>
      )
    }
  }
}

export default withRouter(ScenarioSuccess)
