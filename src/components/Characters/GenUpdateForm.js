import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'

const GenUpdateForm = ({ character, xpGain, goldChange, handleChange, handleToggle, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="experience">
      <Form.Label>Experience Gained | Current Experience: {character.experience}</Form.Label>
      <Form.Control
        name="xpGain"
        type="number"
        placeholder="Experience Gained"
        value={xpGain}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="gold">
      <Form.Label>Gold Change | Current Gold: {character.gold}</Form.Label>
      <InputGroup>
        <Form.Control
          name="goldChange"
          type="number"
          placeholder="Change in Gold"
          value={goldChange}
          onChange={handleChange}
        />
        <InputGroup.Append>
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="goldChangeType" defaultValue={1} onChange={handleToggle}>
              <ToggleButton variant="outline-primary" value={1}>+</ToggleButton>
              <ToggleButton variant="outline-danger" value={2}>-</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>

    <Form.Group controlId="items">
      <Form.Label>Items</Form.Label>
      <Form.Control as="textarea" rows="3"
        name="items"
        type="text"
        placeholder="Items"
        value={character.items ? character.items : ''}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="notes">
      <Form.Label>Notes</Form.Label>
      <Form.Control as="textarea" rows="3"
        name="notes"
        type="text"
        placeholder="Notes"
        value={character.notes ? character.notes : ''}
        onChange={handleChange}
      />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
    <Button variant="danger" type="button" as="a" href={`#characters/${character.id}`}>
      Cancel
    </Button>
  </Form>
)

export default GenUpdateForm
