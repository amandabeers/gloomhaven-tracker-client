import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class Role extends Component {
  constructor () {
    super()

    this.state = {
      role: null
    }
  }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/roles/${this.props.match.params.id}`)
      this.setState({ role: res.data.role })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { role } = this.state

    return (
      <div>
        { role && (
          <Fragment>
            <h3 className="header text-center">{role.role_name}</h3>
            <div className="class-wrapper">
              <img className="class-img" src={`${process.env.PUBLIC_URL}/char_img/${role.char_img}`} alt={`An image of the ${role.role_name}`}/>
              <div className="w-50 pl-3">
                <p>{role.description}</p>
                {(this.props.user) ? <Button className="mb-2" href={`#/roles/${role.id}/create-character`}>Choose this Class</Button> : <p>Sign in to create a character with this class!</p>}
                <br/>
                <Link to='/roles'>Back to all classes</Link>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Role)
