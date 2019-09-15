import React, { useState, useEffect, useContext } from 'react'
import './ListOfFile.css'
import { fetchData } from '../../../service/connect-toserver'
import { db_read_namefiles } from '../../../firebase/db'
import {
  HashtagFileHasgTagContext,
  HASHTAGADD
} from '../HanleFileAndHashTagProvider'

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
  const { dispatchHashTag, setClickShowData } = useContext(
    HashtagFileHasgTagContext
  )

  const whenUserClick = e => {
    const nameFile = JSON.stringify({
      name_file: dataClick
    })
    setClickShowData(cut_onlyWord)
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
    <div>
      <strong className={ind + ' strong_style'} onClick={whenUserClick}>
        {cut_onlyWord}
      </strong>
    </div>
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
      <h3 className="list-of-hashtag-title">List of hashtags</h3>
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
