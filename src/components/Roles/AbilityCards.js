import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class AbilityCards extends Component {
  constructor () {
    super()

    this.state = {
      abilityCards: []
    }
  }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/roles/${this.props.match.params.id}/ability_cards`)
      this.setState({ abilityCards: res.data.ability_cards })
    } catch (error) {
      this.props.alert({ heading: 'Error',
        message: 'Oops! Something went wrong.',
        variant: 'danger'
      })
    }
  }

  render () {
    const { abilityCards } = this.state

    return (
      <div>
        {abilityCards.length > 0 && (
          <Fragment>
            <h3 className="header text-center">{abilityCards[0].role.role_name} Ability Cards</h3>
            <hr/>
            <div className="ability-card-wrapper">
              {abilityCards.reverse().map(abilityCard => (
                <Fragment key={abilityCard.id}>
                  <img className="ability-card-img" src={abilityCard.img} alt={`An image of the ${abilityCard.role.role_name} Level ${abilityCard.level === 0 ? 'X' : abilityCard.level} ability card ${abilityCard.name}`}/>
                </Fragment>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(AbilityCards)
