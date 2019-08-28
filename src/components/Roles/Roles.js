import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
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
          <h2 className="header text-center">Gloomhaven Starter Classes</h2>
        </div>
      )
    } else {
      return (
        <Fragment>
          <h2 className="header text-center">Gloomhaven Starter Classes</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {roles.map(role => (
              <div key={role.id} className="mb-5 pl-2 pr-2">
                <h4 className="text-center">{role.role_name}</h4>
                <Link to={`/roles/${role.id}`}>
                  <img src={`${process.env.PUBLIC_URL}/char_img_sm/${role.char_img_sm}`} alt={`An image of the ${role.role_name}`}/>
                </Link>
              </div>
            ))}
          </div>
        </Fragment>
      )
    }
  }
}

export default Roles
