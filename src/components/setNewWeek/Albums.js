import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getAlbums, postAlbums, makeInactive } from '../../api/albums'
import messages from '../AutoDismissAlert/messages'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Albums = ({ msgAlert, user }) => {
  const [currentAlbums, setCurrentAlbums] = useState([{}])
  // const [currentWeek, setCurrentWeek] = useState('')
  const [load, setReload] = useState(false)
  const [album1Artist, setAlbum1Artist] = useState('')
  const [album1, setAlbum1] = useState('')
  const [album2Artist, setAlbum2Artist] = useState('')
  const [album2, setAlbum2] = useState('')
  const [album3Artist, setAlbum3Artist] = useState('')
  const [album3, setAlbum3] = useState('')
  const [week, setWeek] = useState('')

  useEffect(() => {
    getAlbums()
      .then(albums => {
        setCurrentAlbums(albums.data.weeklyAlbums)
      })
      .catch(() => {
        msgAlert({
          heading: 'Get Current Album Failed',
          message: messages.getAlbumsFailure,
          variant: 'danger'
        })
      })
  }, [load])

  const handleChangeAlbum1Artist = event => {
    setAlbum1Artist(event.target.value)
  }
  const handleChangeAlbum1 = event => {
    setAlbum1(event.target.value)
  }
  const handleChangeAlbum2Artist = event => {
    setAlbum2Artist(event.target.value)
  }
  const handleChangeAlbum2 = event => {
    setAlbum2(event.target.value)
  }
  const handleChangeAlbum3Artist = event => {
    setAlbum3Artist(event.target.value)
  }
  const handleChangeAlbum3 = event => {
    setAlbum3(event.target.value)
  }
  const handleChangeWeek = event => {
    setWeek(event.target.value)
  }

  const onSubmitAlbums = event => {
    event.preventDefault()
    getAlbums()
      .then(data => {
        const activeAlbums = data.data.weeklyAlbums.find(week => week.active)
        console.log(activeAlbums)
        const id = activeAlbums._id
        console.log(id)
        console.log(user)
        const token = user.token
        makeInactive(album1, album2, album3, album1Artist, album2Artist, album3Artist, week, id, token)
      })
    postAlbums(album1, album2, album3, album1Artist, album2Artist, album3Artist, week, user)
      .then(() => msgAlert({
        heading: 'Posted Albums!',
        message: messages.getAlbumsSuccess,
        variant: 'success'
      })
      )
      .catch(() => {
        msgAlert({
          heading: 'Get Current Album Failed',
          message: messages.getAlbumsFailure,
          variant: 'danger'
        })
      })
    setReload(!load)
  }

  return (
    <div>
      <Form onSubmit={onSubmitAlbums}>
        <Form.Group>
          <Form.Label>Week</Form.Label>
          <Form.Control
            required
            type="number"
            name="week"
            value={week}
            onChange={handleChangeWeek}
            placeholder="Week Number"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Album 1</Form.Label>
          <Form.Control
            required
            type="text"
            name="album1Artist"
            value={album1Artist}
            onChange={handleChangeAlbum1Artist}
            placeholder="Album 1 Artist"
          />
          <Form.Control
            required
            type="text"
            name="album1"
            value={album1}
            onChange={handleChangeAlbum1}
            placeholder="Album 1"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Album 2</Form.Label>
          <Form.Control
            required
            type="text"
            name="album2Artist"
            value={album2Artist}
            onChange={handleChangeAlbum2Artist}
            placeholder="Album 2 Artist"
          />
          <Form.Control
            required
            type="text"
            name="album2"
            value={album2}
            onChange={handleChangeAlbum2}
            placeholder="Album 2"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Album 3</Form.Label>
          <Form.Control
            required
            type="text"
            name="album3Artist"
            value={album3Artist}
            onChange={handleChangeAlbum3Artist}
            placeholder="Album 3 Artist"
          />
          <Form.Control
            required
            type="text"
            name="album3"
            value={album3}
            onChange={handleChangeAlbum3}
            placeholder="Album 3"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit">Submit</Button>
      </Form>
      <h2>Current week is {currentAlbums[currentAlbums.length - 1].week}</h2>
      <CardGroup>
        <Card>
          <Card.Body>
            <h3>Album1:{currentAlbums[currentAlbums.length - 1].album1}</h3>
            <h3>Album2:{currentAlbums[currentAlbums.length - 1].album2}</h3>
            <h3>Album3:{currentAlbums[currentAlbums.length - 1].album3}</h3>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  )
}
export default withRouter(Albums)
