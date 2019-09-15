import React, { useContext } from 'react'
import './UserRetweets.css'
import { HashtagFileHasgTagContext } from '../hadlefileandhashTag/HanleFileAndHashTagProvider'
import DivBox from '../div-box/DivBox'

export default function UserRetweets() {
  const { hashTag } = useContext(HashtagFileHasgTagContext)
  const userTopRetweet = hashTag.userTopRetweet
  return userTopRetweet ? (
    <DivBox
      datas={hashTag.userTopRetweet.userName}
      text={'Username Top Retweets'}
    ></DivBox>
  ) : (
    ''
  )
}
