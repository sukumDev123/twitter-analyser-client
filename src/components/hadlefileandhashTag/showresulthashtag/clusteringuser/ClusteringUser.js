import React, { useContext } from 'react'
import './ClusteringUser.css'
import { HashtagFileHasgTagContext } from '../../HanleFileAndHashTagProvider'
import { money_format } from '../../../../presenters/money_format'
function ShowUiOfGrop({ grop, gropis, nameUserTopTen }) {
  const followers = grop.follower
  const retweets = grop.retweet
  const followersMinMaxToInt = followers
    ? {
        min: money_format(parseFloat(followers.min)),
        max: money_format(parseFloat(followers.max))
      }
    : {
        min: 0,
        max: 0
      }
  const retweetsMinMaxToInt = retweets
    ? {
        min: money_format(parseFloat(retweets.min)),
        max: money_format(parseFloat(retweets.max))
      }
    : {
        min: 0,
        max: 0
      }
  return followers ? (
    <div className="grop-div">
      <div className="grop-box-parant">
        <h3>{`Group : ${gropis}`}</h3>
        <div className="handle-textofretweet-and-follower">
          <h5>
            Follower: {followersMinMaxToInt.min} -> {followersMinMaxToInt.max}{' '}
          </h5>

          <h5>
            Retweet: {retweetsMinMaxToInt.min} -> {retweetsMinMaxToInt.max}{' '}
          </h5>
        </div>
        <ShowUserNameTopTenEachOfGrop
          gropData={nameUserTopTen}
        ></ShowUserNameTopTenEachOfGrop>
      </div>
    </div>
  ) : (
    ''
  )
}
function ShowUserNameTopTenEachOfGrop({ gropData }) {
  return (
    <div className="grop-div-inside">
      <div className="grop-box">
        {gropData.map((data, ind) => (
          <h5 key={ind}>@{data}</h5>
        ))}
        {/* <h5>Min: {followersMinMaxToInt.min}</h5> */}
      </div>
    </div>
  )
}
export default function ClusteringUser() {
  const { hashTag } = useContext(HashtagFileHasgTagContext)
  const { clustering_grop } = hashTag
  const { grop_detail } = clustering_grop
  const { show_user_grop } = clustering_grop
  return (
    <div className="cluster-div">
      <h2>Clustering Top 10 User Group In This HashTag</h2>
      <div className="cluster-box">
        <div className="cluster-min-max-grop">
          <ShowUiOfGrop
            grop={grop_detail.grop1}
            gropis={1}
            nameUserTopTen={show_user_grop.grop1}
          ></ShowUiOfGrop>
          <ShowUiOfGrop
            grop={grop_detail.grop2}
            gropis={2}
            nameUserTopTen={show_user_grop.grop2}
          ></ShowUiOfGrop>
          <ShowUiOfGrop
            grop={grop_detail.grop3}
            gropis={3}
            nameUserTopTen={show_user_grop.grop3}
          ></ShowUiOfGrop>
        </div>
      </div>
    </div>
  )
}
