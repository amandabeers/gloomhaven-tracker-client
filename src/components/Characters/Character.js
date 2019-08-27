import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// // import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class Character extends Component {
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
      console.log(res)
      this.setState({ character: res.data.character })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { character } = this.state
    return (
      <div>
        { character && (
          <Fragment>
            <h2 className="mt-3 mb-4">Character Information</h2>
            <h4 className="mb-3">{character.name} | {character.role.role_name} | Level {character.level}</h4>
            <div className="char-wrapper">
              <p>Total Experience: {character.experience}</p>
              <p>Gold: {character.gold}</p>
              <h6>Items</h6>
              <p>{character.items}</p>
              <h6>Notes</h6>
              <p>{character.notes}</p>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Character)
