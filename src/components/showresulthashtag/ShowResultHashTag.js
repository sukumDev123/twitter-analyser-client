import React, { useContext, useState } from 'react'
import './ShowResultHashTag.css'
import { HashtagFileHasgTagContext } from '../hadlefileandhashTag/HanleFileAndHashTagProvider'
import UserRetweets from '../user_retweets/UserRetweets'
import DivBox from '../div-box/DivBox'

function HasgTag() {
  const { hashTag } = useContext(HashtagFileHasgTagContext)

  return hashTag.features.length !== 0 ? (
    <DivBox datas={hashTag.features} text={'Tweet HashTags'}></DivBox>
  ) : (
    <h3 className="text-center-null">You need to select hashtag before.</h3>
  )
}
export default function ShowResultHashTag() {
  return (
    <div>
      <HasgTag></HasgTag>
      <UserRetweets></UserRetweets>
    </div>
  )
}
