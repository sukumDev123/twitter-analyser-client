import React, { useState, useEffect, useContext } from 'react'
import './ListOfFile.css'
import { fetchData } from '../../../service/connect-toserver'
import { db_read_namefiles } from '../../../firebase/db'
import {
  HashtagFileHasgTagContext,
  HASHTAGADD,
  HASHTAGREMOVE
} from '../HanleFileAndHashTagProvider'

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

function ListFileShow({
  ind,
  dataClick,
  setCssStyle,
  cssStyle,
  predClicked,
  setPredClicked
}) {
  const cut_onlyWord = dataClick.split('.')[0]
  const { dispatchHashTag, setClickShowData } = useContext(
    HashtagFileHasgTagContext
  )
  const { setShowLoader } = useContext(LoderContext)

  const whenUserClick = ind => {
    console.log({ predClicked })
    if (predClicked !== '') {
      cssStyle[predClicked] = 'none'
      cssStyle[ind] = 'clicked'
      setPredClicked(ind)
    } else {
      cssStyle[ind] = 'clicked'
      setPredClicked(ind)
    }

    setCssStyle(cssStyle)

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
        const grop_detail = data.data.clustering_grop.grop_detail
        const show_user_grop = data.data.clustering_grop.show_user_grop
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
        hashTagDis.payload.clustering_grop.grop_detail = grop_detail
        hashTagDis.payload.clustering_grop.show_user_grop = show_user_grop
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
    <div className={cssStyle[ind]} onClick={e => whenUserClick(ind)}>
      <strong className={'strong_style'}>{cut_onlyWord}</strong>
    </div>
  )
}

export default function ListOfFile() {
  const [listFile, setListFile] = useState([])
  const [cssStyle, setCssStyle] = useState([])
  const [predClicked, setPredClicked] = useState('')

  const { setShowLoader } = useContext(LoderContext)
  const sizeOfList = listFile.length
  useEffect(() => {
    setDataBaseF(setListFile, setShowLoader)
  }, [])
  useEffect(() => {
    setCssStyle(Array(listFile.length).fill('none'))
  }, [listFile.length])
  return (
    <div className="list-of-file-box">
      <h3 className="list-of-hashtag-title">List of hashtags</h3>
      <div className="list-of-file-in">
        {sizeOfList > 0
          ? listFile.map((data, ind) => (
              <ListFileShow
                setCssStyle={setCssStyle}
                cssStyle={cssStyle}
                dataClick={data}
                key={ind}
                ind={ind}
                predClicked={predClicked}
                setPredClicked={setPredClicked}
              ></ListFileShow>
            ))
          : ''}
      </div>
      {/* <h5 onClick={e => setShowAddNewHashTag(true)}>add new hashtag.</h5> */}
    </div>
  )
}
