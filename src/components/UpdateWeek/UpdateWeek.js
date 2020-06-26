import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getActive, updateAlbums, deleteAlbum } from '../../api/albums'
import messages from '../AutoDismissAlert/messages'
// import Button from 'react-bootstrap/Button'
// import Card from 'react-bootstrap/Card'
// import CardGroup from 'react-bootstrap/CardGroup'
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
  const [id, setId] = useState('')

  useEffect(() => {
    getActive()
      .then(albums => {
        setCurrentAlbums(albums.data.weeklyAlbums)
        setAlbum1(albums.data.weeklyAlbums.album1)
        setAlbum2(albums.data.weeklyAlbums.album2)
        setAlbum3(albums.data.weeklyAlbums.album3)
        setAlbum1Artist(albums.data.weeklyAlbums.album1Artist)
        setAlbum3Artist(albums.data.weeklyAlbums.album3Artist)
        setAlbum2Artist(albums.data.weeklyAlbums.album2Artist)
        setWeek(albums.data.weeklyAlbums.week)
        setId(albums.data.weeklyAlbums._id)
      })
      .catch(() => {
        msgAlert({
          heading: 'Get Current Album Failed',
          message: messages.getAlbumsFailure,
          variant: 'danger'
        })
      })
  }, [load])
  // I should combine these later what are you thinking??
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

  const onSubmitAlbums = (event) => {
    event.preventDefault()
    const token = user.token
    updateAlbums(album1, album2, album3, album1Artist, album2Artist, album3Artist, week, id, token)
      .then(() => msgAlert({
        heading: 'Albums Updated!',
        message: messages.updateSuccess,
        variant: 'success'
      })
      )
      .catch(() => {
        msgAlert({
          heading: 'Album update failed!',
          message: messages.updateFailure,
          variant: 'danger'
        })
      })
    setReload(!load)
  }

  const onDelete = () => {
    const token = user.token
    deleteAlbum(token, id)
      .then(() => msgAlert({
        heading: 'Albums Updated!',
        message: messages.updateSuccess,
        variant: 'success'
      }))
      .catch(() => {
        msgAlert({
          heading: 'Album update failed!',
          message: messages.updateFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <div>
      <h2 className="text-center"> Update the albums for this week </h2>
      <Form onSubmit={onSubmitAlbums} className="albumsForm">
        <Form.Group>
          <Form.Label>Week</Form.Label>
          <Form.Control
            required
            type="number"
            name="week"
            value={week}
            onChange={handleChangeWeek}
            placeholder={currentAlbums.week}
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
            placeholder={currentAlbums.album1Artist}
          />
          <Form.Control
            required
            type="text"
            name="album1"
            value={album1}
            className="formMargins"
            onChange={handleChangeAlbum1}
            placeholder={currentAlbums.album1}
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
            placeholder={currentAlbums.album2Artist}
          />
          <Form.Control
            required
            type="text"
            name="album2"
            value={album2}
            className="formMargins"
            onChange={handleChangeAlbum2}
            placeholder={currentAlbums.album2}
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
            placeholder={currentAlbums.album3Artist}
          />
          <Form.Control
            required
            type="text"
            name="album3"
            value={album3}
            className="formMargins"
            onChange={handleChangeAlbum3}
            placeholder={currentAlbums.album3}
          />
        </Form.Group>
        <Button
          variant="dark"
          type="submit">Submit</Button>
      </Form>
      <Button
        variant="dark"
        onClick={onDelete}>Delete Current Album</Button>
    </div>
  )
}
export default withRouter(Albums)
