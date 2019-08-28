import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class Character extends Component {
  constructor () {
    super()

    this.state = {
      character: null,
      show: false
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

  deleteCharacter = async () => {
    try {
      await axios({
        url: `${apiUrl}/characters/${this.props.match.params.id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ show: false })
      this.props.alert({ heading: 'Success!',
        message: 'Your character has been deleted',
        variant: 'success'
      })
      this.props.history.push('/characters')
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { character, show } = this.state
    const handleClose = () => this.setState({ show: false })
    const handleShow = () => this.setState({ show: true })
    return (
      <div>
        { character && (
          <Fragment>
            <h2 className="header">Character Information</h2>
            <div className="d-flex justify-content-between">
              <h4 className="mb-3">{character.name} | {character.role.role_name} | Level {character.level}</h4>
              <Button variant="danger" onClick={handleShow}>
                Delete
              </Button>
            </div>
            <div className="char-wrapper">
              <p>Total Experience: {character.experience}</p>
              <p>Gold: {character.gold}</p>
              <h6>Items</h6>
              <p>{character.items}</p>
              <h6>Notes</h6>
              <p>{character.notes}</p>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this character?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  No
                </Button>
                <Button variant="primary" onClick={this.deleteCharacter}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>

            <Link to='/characters'>Back to all characters</Link>
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Character)
