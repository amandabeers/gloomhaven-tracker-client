import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
// import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class Characters extends Component {
  constructor () {
    super()

    this.state = {
      characters: null
    }
  }

  async componentDidMount () {
    try {
      const res = await axios({
        url: `${apiUrl}/characters`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      this.setState({ characters: res.data.characters })
    } catch (error) {
      this.props.alert({ heading: 'Error',
        message: 'Oops! Something went wrong.',
        variant: 'danger'
      })
    }
  }

  render () {
    const { characters } = this.state

    if (!characters) {
      return (
        <h2 className="header">Characters</h2>
      )
    }

    if (characters && characters.length === 0) {
      return (
        <Fragment>
          <h2 className="header">Characters</h2>
          <p>No characters found. You can go to the <a href='#roles'>Classes</a> page to add one!</p>
        </Fragment>
      )
    } else if (characters) {
      return (
        <Fragment>
          <h2 className="header">Characters</h2>
          <ListGroup>
            {characters.map(char => (
              <ListGroup.Item as="a" href={`#characters/${char.id}`} key={char.id}>
                <div className="char-list-wrapper">
                  <img className="char-list-img" src={`${process.env.PUBLIC_URL}/char_img/${char.role.char_img}`} alt={`An image of the ${char.role.role_name}`}/>
                  <div className="ml-3">
                    <h5>{char.name}</h5>
                    <h5>{char.role.role_name}</h5>
                    <h5>Level {char.level}</h5>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Fragment>
      )
    }
  }
}

export default Characters
