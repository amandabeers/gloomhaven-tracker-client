import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'

import CreateForm from './CreateForm'

const xpCalc = {
  '1': 0,
  '2': 45,
  '3': 95,
  '4': 150,
  '5': 210,
  '6': 275,
  '7': 345,
  '8': 420,
  '9': 500
}

class CreateCharacter extends Component {
  constructor () {
    super()

    this.state = {
      character: {
        name: '',
        level: '',
        experience: null
      },
      role: null
    }
  }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/roles/${this.props.match.params.id}`)
      this.setState({ role: res.data.role })
    } catch (error) {
      this.props.alert({ heading: 'Error',
        message: 'Oops! Something went wrong.',
        variant: 'danger'
      })
    }
  }

  handleChange = event => {
    this.setState({ character: { ...this.state.character, [event.target.name]: event.target.value } })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { character, role } = this.state
    const xp = xpCalc[character.level]
    try {
      const res = await axios({
        url: `${apiUrl}/characters`,
        method: 'POST',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        },
        data: {
          character: {
            name: character.name,
            level: character.level,
            experience: xp,
            role_id: role.id
          }
        }
      })
      this.props.alert({ heading: 'Success!',
        message: 'Your character has been created',
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
    const { role } = this.state

    if (!role) {
      return (
        <h2 className="header">Create a Character</h2>
      )
    } else {
      return (
        <Fragment>
          <h2 className="header">Create a Character</h2>
          <div className="class-wrapper">
            <img className="class-img" src={`${process.env.PUBLIC_URL}/char_img/${role.char_img}`} alt={`An image of the ${role.role_name}`}/>
            <div className="w-50 pl-3">
              <h4>Class: {role.role_name}</h4>
              <CreateForm
                character={this.state.character}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            </div>
          </div>
        </Fragment>
      )
    }
  }
}

export default withRouter(CreateCharacter)
