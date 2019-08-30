import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateForm = ({ character, handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="name">
      <Form.Label>Character Name</Form.Label>
      <Form.Control
        name="name"
        type="text"
        placeholder="Name"
        value={character.name}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="level">
      <Form.Label>Level</Form.Label>
      <Form.Control
        name="level"
        type="number"
        placeholder="Level"
        min="1"
        max="9"
        value={character.level}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
    <Button variant="danger" type="button" as="a" href='#roles'>
      Cancel
    </Button>
  </Form>
)

export default CreateForm
