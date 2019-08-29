import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LocationForm = ({ character, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="location">
      <Form.Label>Location</Form.Label>
      <Form.Control
        name="location"
        type="text"
        placeholder="Location Name"
        value={character.location}
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

export default LocationForm
