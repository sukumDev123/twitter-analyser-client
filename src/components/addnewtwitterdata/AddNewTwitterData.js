import React, { useState, useContext } from 'react'
import './AddNewTwitterData.css'
import { AppContext } from '../../AppProvider'
export default function AddNewTwitterData() {
  const { showAddNewHashtag, setShowAddNewHashTag } = useContext(AppContext)
  const [hashTagNew, setHashTagNew] = useState('')
  const whenUserChangeHashtagInput = e => {
    const hashtagInput = e.target.value
    setHashTagNew(hashtagInput)
  }
  const whenUserHashtag = e => {
    e.preventDefault()
  }
  return showAddNewHashtag === true ? (
    <div className="add-twitter-box">
      <div className="handle-title-and-close">
        <h2>Save new Hashtag</h2>
        <h4 onClick={e => setShowAddNewHashTag(false)}>close</h4>
      </div>
      <form onSubmit={whenUserHashtag} className="add-twitter-div">
        <input
          placeholder="#Hashtag..."
          onChange={whenUserChangeHashtagInput}
          value={hashTagNew}
        ></input>
        <button className="btn-hashtag">add</button>
      </form>
    </div>
  ) : (
    ''
  )
}
