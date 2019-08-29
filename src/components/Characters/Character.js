import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
// import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import apiUrl from './../../apiConfig'

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

class Character extends Component {
  constructor () {
    super()

    this.state = {
      character: null,
      show: false,
      nextLevel: null,
      nextLevelXp: null,
      canCharLevel: false
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
      const nextLevel = res.data.character.level + 1
      const nextLevelXp = xpCalc[nextLevel]
      const canCharLevel = res.data.character.experience >= nextLevelXp
      this.setState({
        character: res.data.character,
        nextLevel: nextLevel,
        nextLevelXp: nextLevelXp,
        canCharLevel: canCharLevel
      })
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

  handleLevelUp = async () => {
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
            level: this.state.nextLevel
          }
        }
      })
      this.props.alert({ heading: 'Success!',
        message: 'Your character has leveled up!',
        variant: 'success'
      })
      this.props.history.push(`/characters/${res.data.character.id}`)
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { character, show, nextLevelXp, canCharLevel } = this.state
    const handleClose = () => this.setState({ show: false })
    const handleShow = () => this.setState({ show: true })

    // const levelOptions = {}
    // levelOptions.disablebutton = (character && (canCharLevel && character.location === 'Gloomhaven')) ? '' : 'disabled'
    // const levelDisabled = (character && (canCharLevel && character.location === 'Gloomhaven')

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
              <DropdownButton title="Update Actions" id="bg-nested-dropdown">
                <Dropdown.Item eventKey="1" as="a" href={`#characters/${character.id}/scenario-update`}>Scenario Success</Dropdown.Item>
                <Dropdown.Item eventKey="2" as="a" href={`#characters/${character.id}/event-update`}>City/Road Event</Dropdown.Item>
                <Dropdown.Item eventKey="2" as="a" href={`#characters/${character.id}/buy-sell-items`}>Buy/Sell Items</Dropdown.Item>
                <Dropdown.Item eventKey="2" as="a" href={`#characters/${character.id}/change-location`}>Change Location</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="char-wrapper">
              <h6>Location</h6>
              <p>{character.location}</p>
              <div className="d-flex">
                <h6>Experience</h6>
                {(canCharLevel && character.location === 'Gloomhaven') ? <Button variant="success" size="sm" onClick={this.handleLevelUp}>Level Up</Button> : ''}
              </div>
              <p>Total: {character.experience} | Until next Level: {nextLevelXp > character.experience ? `${nextLevelXp - character.experience}` : 'You can level up when you return to Gloomhaven!'}</p>
              <h6>Gold</h6>
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
