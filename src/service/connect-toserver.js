import axios from 'axios'

export function fetchData(data) {
  return axios({
    method: 'post',
    url: 'http://localhost:8000/api/twitter/handleDataCsv',
    headers: {
      'Content-type': 'application/json'
    },
    data: data
  })
}

// https://twitterappproject.herokuapp.com/api/twitter/handleDataCsv
