import axios from 'axios'

export function fetchData(data) {
  return axios({
    method: 'post',
    url: 'https://twitterappproject.herokuapp.com/api/twitter/handleDataCsv',
    headers: {
      'Content-type': 'application/json'
    },
    data: data
  })
}
