import React, { useContext } from 'react'
import './ShowResultHashTag.css'
import { HashtagFileHasgTagContext } from '../HanleFileAndHashTagProvider'
import UserRetweets from './user_retweets/UserRetweets'
import DivBox from '../../div-box/DivBox'

function HasgTag() {
  const { hashTag } = useContext(HashtagFileHasgTagContext)

  return hashTag.features.length !== 0 ? (
    <DivBox datas={hashTag.features} text={'Tweet HashTags'}></DivBox>
  ) : (
    <h3 className="text-center-null">You need to select hashtag before.</h3>
  )
}
export default function ShowResultHashTag() {
  const { clickShowData } = useContext(HashtagFileHasgTagContext)

  return (
    <div className="showResult">
      {clickShowData !== '' ? (
        <h1 className="titleShowResult">Hasgtag: {clickShowData}</h1>
      ) : (
        ''
      )}

      <HasgTag></HasgTag>
      <UserRetweets></UserRetweets>
    </div>
  )
}
