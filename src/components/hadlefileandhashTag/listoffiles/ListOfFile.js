import React, { useState, useEffect, useContext } from 'react'
import './ListOfFile.css'
import { fetchData } from '../../../service/connect-toserver'
import { db_read_namefiles } from '../../../firebase/db'
import {
  HashtagFileHasgTagContext,
  HASHTAGADD,
  HASHTAGREMOVE
} from '../HanleFileAndHashTagProvider'
import { AppContext } from '../../../AppProvider'
import { LoderContext } from '../../loading/LoaderProvider'

const setDataBaseF = (setListFile, setShowLoader) => {
  const handleDb = snap => {
    if (snap) {
      const toArray = Object.values(snap.val())
      setListFile(toArray)
      setShowLoader(false)
    }
  }
  db_read_namefiles().on('value', handleDb)
}

function ListFileShow({ ind, dataClick }) {
  const cut_onlyWord = dataClick.split('.')[0]
  const { dispatchHashTag, setClickShowData } = useContext(
    HashtagFileHasgTagContext
  )
  const { setShowLoader } = useContext(LoderContext)

  const whenUserClick = e => {
    setShowLoader(true)
    dispatchHashTag(HASHTAGREMOVE)
    const nameFile = JSON.stringify({
      name_file: dataClick
    })
    setClickShowData(cut_onlyWord)
    fetchData(nameFile)
      .then(data => {
        const features = data.data.features
        const idfs = data.data.idf
        const word_predict = data.data.word_predict
        const userName = data.data.userTopRetweet.userName
        const retweets_count = data.data.userTopRetweet.retweets_count
        const gooComment = data.data.text_sentiments.good
        const negCommant = data.data.text_sentiments.neg
        const neutralCommant = data.data.text_sentiments.neutral
        const hashTagDis = HASHTAGADD
        hashTagDis.payload.features = features
        hashTagDis.payload.idf = idfs
        hashTagDis.payload.userTopRetweet.userName = userName
        hashTagDis.payload.userTopRetweet.retweet_count = retweets_count
        hashTagDis.payload.word_predict = word_predict
        hashTagDis.payload.text_sentiments = {
          good: gooComment,
          neg: negCommant,
          neutral: neutralCommant
        }
        dispatchHashTag(hashTagDis)
        setShowLoader(false)
      })
      .catch(err => {
        console.log({ err })
        alert(`${err.message}`)
        setShowLoader(false)
      })
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
  const { setShowAddNewHashTag } = useContext(AppContext)
  const { setShowLoader } = useContext(LoderContext)

  useEffect(() => {
    setDataBaseF(setListFile, setShowLoader)
  }, [])
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
      <h5 onClick={e => setShowAddNewHashTag(true)}>add new hashtag.</h5>
    </div>
  )
}
