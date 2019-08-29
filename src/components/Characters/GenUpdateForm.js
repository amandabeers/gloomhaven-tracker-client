import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GenUpdateForm = ({ character, xpGain, goldChange, handleChange, handleSubmit }) => (
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

    <Form.Group controlId="experience">
      <Form.Label>Change in Gold | Current Gold: {character.gold}</Form.Label>
      <Form.Control
        name="goldChange"
        type="number"
        placeholder="Change in Gold"
        value={goldChange}
        onChange={handleChange}
      />
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
