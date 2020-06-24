import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getVotes } from '../../api/votes'
import { getActive } from '../../api/albums'
import messages from '../AutoDismissAlert/messages'
// import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const VotesPage = ({ msgAlert }) => {
  const [weeklyVotes, setWeeklyVotes] = useState([])
  const [currentWeek, setCurrentWeek] = useState('')
  const [album1, setAlbum1] = useState(0)
  const [album2, setAlbum2] = useState(0)
  const [album3, setAlbum3] = useState(0)

  useEffect(() => {
    getActive()
      .then(albums => setCurrentWeek(albums.data.weeklyAlbums.week))

    getVotes()
      .then(votes => {
        setWeeklyVotes(votes.data.weeklyVotes)
      })
      // .then(getActive())
      .catch(() => {
        msgAlert({
          heading: 'Get Votes Failed',
          message: messages.getVotesFailure,
          variant: 'danger'
        })
      })
  }, [])

  const handleChange = event => {
    setCurrentWeek(event.target.value)
  }

  const onWeekSearch = event => {
    event.preventDefault()
    currWeeksVotes = []
    // currWeeksVotes = []
    // setCurrentWeek(event)
    for (let i = 0; i < weeklyVotes.length; i++) {
      // console.log(typeof weeklyVotes[i].week)
      // console.log(typeof currentWeek)
      if (weeklyVotes[i].week === parseInt(currentWeek)) {
        currWeeksVotes.push(weeklyVotes[i])
        // console.log()
      }
      if (currWeeksVotes.length === 0) {
        msgAlert({
          heading: 'No Votes!',
          message: messages.noVotesFailure,
          variant: 'danger'
        })
      }
    }
    setAlbum1((currWeeksVotes.reduce((accumulator, current) => accumulator + current.album1Vote, 0)) / currWeeksVotes.length)
    setAlbum2((currWeeksVotes.reduce((accumulator, current) => accumulator + current.album2Vote, 0)) / currWeeksVotes.length)
    setAlbum3((currWeeksVotes.reduce((accumulator, current) => accumulator + current.album3Vote, 0)) / currWeeksVotes.length)
  }
  // const album1total = currWeeksVotes.reduce((accumulator, current) => accumulator + current.album1Vote, 0)
  // const album1 = album1total / currWeeksVotes.length
  // console.log(album1)
  // const album2total = currWeeksVotes.reduce((accumulator, current) => accumulator + current.album2Vote, 0)
  // const album2 = album2total / currWeeksVotes.length
  // const album3total = currWeeksVotes.reduce((accumulator, current) => accumulator + current.album3Vote, 0)
  // const album3 = album3total / currWeeksVotes.length
  let currWeeksVotes = []

  return (
    <div className="container ">
      <div className="row col-6 voteResults">
        <h2>Voting Results</h2>
        <div className="row col-12">
          <Form inline onSubmit={onWeekSearch}>
            <Form.Group controlId="weekSearch">
              <Form.Label className="weekForm">Enter Week Number</Form.Label>
              <Form.Control
                className="weekForm"
                required
                type="number"
                name="weekSearch"
                onChange={handleChange}
                value={currentWeek}
                placeholder="#"
              />
            </Form.Group>
            <Button
              variant="dark"
              className="weekForm"
              type="submit">Submit</Button>
          </Form>
        </div>
        <CardGroup>
          <Card>
            <Card.Body>
              <h4>Week {currentWeek.week}</h4>
              <h3>Album1:{album1.toFixed()}%</h3>
              <h3>Album2:{album2.toFixed()}%</h3>
              <h3>Album3:{album3.toFixed()}%</h3>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
      <CardGroup className="row col-12">
        {weeklyVotes.map(weeklyVotes => (
          <div key={weeklyVotes._id}>
            <Card style={{ width: '18rem' }} >
              <Card.Body>
                <h6>Vote by {weeklyVotes.username}</h6>
                <h6>Week {weeklyVotes.week}</h6>
                <Card.Title><h3>{weeklyVotes.album1Vote}</h3></Card.Title>
                <Card.Title><h3>{weeklyVotes.album2Vote}</h3></Card.Title>
                <Card.Title><h3>{weeklyVotes.album3Vote}</h3></Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </CardGroup>
    </div>
  )
}

export default withRouter(VotesPage)
