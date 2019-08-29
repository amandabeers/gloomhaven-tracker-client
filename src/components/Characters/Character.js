import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
// import ButtonGroup from 'react-bootstrap/ButtonGroup'
// import DropdownButton from 'react-bootstrap/DropdownButton'
// import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
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

  componentDidMount () {
    this.loadCharacter()
  }

  loadCharacter = async () => {
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
      this.props.alert({ heading: 'Error',
        message: 'Oops! Something went wrong.',
        variant: 'danger'
      })
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
      this.props.alert({ heading: 'Error',
        message: 'Oops! Something went wrong.',
        variant: 'danger'
      })
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
        message: 'Your character has leveled up! You may add a card to your deck, take a perk, and increase your health.',
        variant: 'success'
      })
      if (res) {
        this.loadCharacter()
      }
    } catch (error) {
      this.props.alert({ heading: 'Error',
        message: 'Oops! Something went wrong.',
        variant: 'danger'
      })
    }
  }

  handleDonation = async () => {
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
            gold: character.gold - 10
          }
        }
      })
      this.props.alert({ heading: 'Success!',
        message: 'You have donated 10 gold to the Great Oak and can add two Blessed cards to your deck.',
        variant: 'success'
      })
      if (res) {
        this.loadCharacter()
      }
    } catch (error) {
      this.props.alert({ heading: 'Error',
        message: 'Oops! Something went wrong.',
        variant: 'danger'
      })
    }
  }

  render () {
    const { character, show, nextLevelXp, canCharLevel } = this.state
    const handleClose = () => this.setState({ show: false })
    const handleShow = () => this.setState({ show: true })

    return (
      <div>
        { character && (
          <Fragment>
            <h2 className="header">Character Information</h2>
            <div className="char-wrapper">
              <img className="class-img" src={`${process.env.PUBLIC_URL}/char_img/${character.role.char_img}`} alt={`An image of the ${character.role.role_name}`}/>
              <div className="char-info">
                <h4 className="char-header">{character.name} | {character.role.role_name} | Level {character.level}</h4>

                <Navbar bg="light" expand="lg">
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      <NavDropdown title="Update Actions" id="basic-nav-dropdown">
                        <NavDropdown.Item eventKey="1" as="a" href={`#characters/${character.id}/scenario-update`}>Scenario Success</NavDropdown.Item>
                        <NavDropdown.Item eventKey="2" as="a" href={`#characters/${character.id}/event-update`}>City/Road Event</NavDropdown.Item>
                        <NavDropdown.Item eventKey="2" as="a" href={`#characters/${character.id}/buy-sell-items`}>Buy/Sell Items</NavDropdown.Item>
                        <NavDropdown.Item eventKey="2" as="a" href={`#characters/${character.id}/change-location`}>Change Location</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                    <Nav>
                      <Button variant="outline-danger" size="sm" onClick={handleShow}>
                        Delete
                      </Button>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>

                <div className="pl-2 pr-2">
                  <h5 className="char-section-header">Location</h5>
                  <p>{character.location}</p>
                  <h5 className="char-section-header">Experience</h5>
                  <div className="d-flex justify-content-between">
                    <p>Total: {character.experience} | {nextLevelXp > character.experience ? `Unitl next level: ${nextLevelXp - character.experience}` : 'You can level up once in Gloomhaven'}</p>
                    {(canCharLevel && character.location === 'Gloomhaven') ? <Button variant="success" size="sm" onClick={this.handleLevelUp}>Level Up</Button> : ''}
                  </div>
                  <h5 className="char-section-header">Gold</h5>
                  <div className="d-flex justify-content-between">
                    <p>{character.gold} Coins</p>
                    {(character.gold >= 10 && character.location === 'Gloomhaven') ? <Button variant="primary" size="sm" onClick={this.handleDonation}>Donate to Great Oak</Button> : ''}
                  </div>
                  <h5 className="char-section-header">Items</h5>
                  <p>{character.items ? character.items : 'You don\'t have any items'}</p>
                  <h5 className="char-section-header">Notes</h5>
                  <p>{character.notes ? character.notes : 'You don\'t have any notes'}</p>
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
              </div>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Character)
