import React, { useContext } from 'react'
import './UserRetweets.css'
import { HashtagFileHasgTagContext } from '../../HanleFileAndHashTagProvider'
import DivBox from '../../../div-box/DivBox'

export default function UserRetweets() {
  const { hashTag } = useContext(HashtagFileHasgTagContext)
  const userTopRetweet = hashTag.userTopRetweet
  return userTopRetweet.userName.length !== 0 ? (
    <DivBox
      datas={hashTag.userTopRetweet.userName}
      text={'Username Top Retweets'}
    ></DivBox>
  ) : (
    ''
  )
}
