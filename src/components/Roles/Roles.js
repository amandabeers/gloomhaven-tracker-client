import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class Roles extends Component {
  constructor () {
    super()

    this.state = {
      roles: []
    }
  }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/roles`)
      console.log(res)
      this.setState({ roles: res.data.roles })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { roles } = this.state

    if (roles.length === 0) {
      return (
        <div>
          <h3>Available Roles</h3>
          <p>No roles found</p>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Available Roles</h3>
          {roles.map(role => (
            <Fragment key={role.id}>
              <p>{role.role_name}</p>
            </Fragment>
          ))}
        </div>
      )
    }
  }
}

export default Roles
