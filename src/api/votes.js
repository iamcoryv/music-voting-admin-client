import apiUrl from '../apiConfig'
import axios from 'axios'

export const getVotes = () => {
  return axios({
    url: apiUrl + '/votes'
  })
}
//
// export const getOneProduct = id => {
//   return axios({
//     url: apiUrl + '/products/' + id
//   })
// }

// export const addToCart = (id, product, user) => {
//   return axios({
//     url: apiUrl + '/shopping-cart/' + id,
//     method: 'PATCH',
//     data: {
//       'product': product
//     },
//     headers: {
//       'Authorization': `Bearer ${user.token}`
//     }
//   })
// }

// export const removeFromCart = (id, product, user) => {
//   return axios({
//     url: apiUrl + `/shopping-cart/${id}/products`,
//     method: 'PATCH',
//     data: {
//       'product': product
//     },
//     headers: {
//       'Authorization': `Bearer ${user.token}`
//     }
//   })
// }
