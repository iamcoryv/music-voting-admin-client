import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAlbums = () => {
  return axios({
    url: apiUrl + '/weeklyalbums'
  })
}

export const postAlbums = (data, user) => {
  return axios({
    url: apiUrl + '/weeklyalbums',
    method: 'POST',
    data: {
      weeklyAlbums: {
        week: data.week,
        album1Artist: data.album1Artist,
        album1: data.album1,
        album2Artist: data.album2Artist,
        album2: data.album2,
        album3Artist: data.album3Artist,
        album3: data.album3,
        active: data.active
      }
    },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
//
// export const getOneProduct = id => {
//   return axios({
//     url: apiUrl + '/products/' + id
//   })
// }

export const addToCart = (id, product, user) => {
  return axios({
    url: apiUrl + '/weeklyalbums/' + id,
    method: 'PATCH',
    data: {
      'product': product
    },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
