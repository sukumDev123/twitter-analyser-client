import React, { useState, useEffect, useContext } from 'react'
import './ListOfFile.css'
import { fetchData } from '../../service/connect-toserver'
import { db_read_namefiles } from '../../firebase/db'
import {
  HashtagFileHasgTagContext,
  HASHTAGADD
} from '../hadlefileandhashTag/HanleFileAndHashTagProvider'

const setDataBaseF = setListFile => {
  const handleDb = snap => {
    if (snap) {
      const toArray = Object.values(snap.val())
      setListFile(toArray)
    }
  }
  db_read_namefiles().on('value', handleDb)
}

function ListFileShow({ ind, dataClick }) {
  const cut_onlyWord = dataClick.split('.')[0]
  const { dispatchHashTag } = useContext(HashtagFileHasgTagContext)

  const whenUserClick = e => {
    const nameFile = JSON.stringify({
      name_file: dataClick
    })
    fetchData(nameFile)
      .then(data => {
        const features = data.data.features
        const idfs = data.data.idf
        const userName = data.data.userTopRetweet.userName
        const retweets_count = data.data.userTopRetweet.retweets_count
        const hashTagDis = HASHTAGADD
        hashTagDis.payload.features = features
        hashTagDis.payload.idf = idfs
        hashTagDis.payload.userTopRetweet.userName = userName
        hashTagDis.payload.userTopRetweet.retweet_count = retweets_count
        dispatchHashTag(hashTagDis)
      })
      .catch(err => console.log({ err }))
  }
  return (
    <h3 className={ind} onClick={whenUserClick}>
      {cut_onlyWord}
    </h3>
  )
}

export default function ListOfFile() {
  const [listFile, setListFile] = useState([])
  const [cssStyle, setCssStyle] = useState(Array(listFile.length).fill('none'))

  useEffect(() => {
    setDataBaseF(setListFile)
  }, [0])
  return (
    <div className="list-of-file-box">
      <div className="list-of-file-in">
        {listFile.length > 0
          ? listFile.map((data, ind) => (
              <ListFileShow
                className={cssStyle[ind]}
                dataClick={data}
                key={ind}
              ></ListFileShow>
            ))
          : ''}
      </div>
    </div>
  )
}
