import React, { useContext } from 'react'
import './ShowResultHashTag.css'
import { HashtagFileHasgTagContext } from '../HanleFileAndHashTagProvider'
import UserRetweets from './user_retweets/UserRetweets'
import DivBox from '../../div-box/DivBox'
import ChartSentiment from './chartsentiment/ChartSentiment'

function HasgTag() {
  const { hashTag } = useContext(HashtagFileHasgTagContext)

  return hashTag.features.length !== 0 ? (
    <DivBox datas={hashTag.features} text={'Tweet HashTags'}></DivBox>
  ) : (
    <h3 className="text-center-null">You need to select hashtag before.</h3>
  )
}
export default function ShowResultHashTag() {
  const { clickShowData, hashTag } = useContext(HashtagFileHasgTagContext)

  return (
    <div className="showResult">
      {clickShowData !== '' ? (
        <h1 className="titleShowResult">Hasgtag: {clickShowData}</h1>
      ) : (
        ''
      )}
      {hashTag.text_sentiments.good.length ? (
        <ChartSentiment></ChartSentiment>
      ) : (
        ''
      )}
      {hashTag.features.length ? <HasgTag></HasgTag> : ''}
      {hashTag.userTopRetweet.userName.length ? (
        <UserRetweets> </UserRetweets>
      ) : (
        ''
      )}
    </div>
  )
}
