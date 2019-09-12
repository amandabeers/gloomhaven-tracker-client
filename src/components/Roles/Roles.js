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
      this.props.alert({ heading: 'Error',
        message: 'Oops! Something went wrong.',
        variant: 'danger'
      })
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
              <div key={role.id} className="mb-5 col-6 col-sm-4">
                <h4 className="text-center header-font mobile-h4">{role.role_name}</h4>
                <Link to={`/roles/${role.id}`}>
                  <img className="class-list-img" src={`${process.env.PUBLIC_URL}/char_img_sm/${role.char_img_sm}`} alt={`An image of the ${role.role_name}`}/>
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
