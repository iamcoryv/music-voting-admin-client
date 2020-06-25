import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAlbums = () => {
  return axios({
    url: apiUrl + '/weeklyalbums'
  })
}

export const getActive = () => {
  return axios({
    url: apiUrl + '/weeklyalbums/active'
  })
}

export const postAlbums = (album1, album2, album3, album1Artist, album2Artist, album3Artist, week, user) => {
  return axios({
    url: apiUrl + '/weeklyalbums',
    method: 'POST',
    data: {
      weeklyAlbums: {
        week: week,
        album1Artist: album1Artist,
        album1: album1,
        album2Artist: album2Artist,
        album2: album2,
        album3Artist: album3Artist,
        album3: album3,
        active: true
      }
    },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const updateAlbums = (album1, album2, album3, album1Artist, album2Artist, album3Artist, week, id, token) => {
  return axios({
    url: apiUrl + '/weeklyalbums/' + id,
    method: 'PATCH',
    data: {
      weeklyAlbums: {
        week: week,
        album1Artist: album1Artist,
        album1: album1,
        album2Artist: album2Artist,
        album2: album2,
        album3Artist: album3Artist,
        album3: album3,
        active: true
      }
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const makeInactive = (album1, album2, album3, album1Artist, album2Artist, album3Artist, week, id, token) => {
  return axios({
    url: apiUrl + '/weeklyalbums/' + id,
    method: 'PATCH',
    data: {
      weeklyAlbums: {
        week: week,
        album1Artist: album1Artist,
        album1: album1,
        album2Artist: album2Artist,
        album2: album2,
        album3Artist: album3Artist,
        album3: album3,
        active: false
      }
    },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
