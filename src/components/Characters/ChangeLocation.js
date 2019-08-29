import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'

import LocationForm from './LocationForm'

class ChangeLocation extends Component {
  constructor () {
    super()

    this.state = {
      character: null
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
    this.setState({ character: { ...this.state.character, [fieldName]: event.target.value } })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { character } = this.state

    try {
      const res = await axios({
        url: `${apiUrl}/characters/${character.id}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        },
        data: {
          character: {
            location: character.location
          }
        }
      })
      this.props.alert({ heading: 'Success!',
        message: 'Your character\'s location has been updated',
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
        <h2 className="header">Change Character Location</h2>
      )
    } else {
      return (
        <Fragment>
          <h2 className="header">Change Character Location</h2>
          <LocationForm
            character={character}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </Fragment>
      )
    }
  }
}

export default withRouter(ChangeLocation)
