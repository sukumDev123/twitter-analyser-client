import React, { createContext, useReducer, useState } from 'react'

export const HashtagFileHasgTagContext = createContext()
const hashTagResult = {
  features: [],
  idf: [],
  userTopRetweet: {
    userName: [],
    retweet_count: []
  },
  word_predict: { type: [], size: [] },
  text_sentiments: { good: [], neg: [], neutral: [] },
  clustering_grop: {
    grop_detail: {
      grop1: { retweet: [], follower: [] },
      grop2: { retweet: [], follower: [] },
      grop3: { retweet: [], follower: [] }
    },
    show_user_grop: { grop1: [], grop2: [], grop3: [] }
  }
}
export const HASHTAGADD = {
  type: 'HASHTAGADD',
  payload: hashTagResult
}
export const HASHTAGREMOVE = {
  type: 'HASHTAGREMOVE',
  payload: hashTagResult
}

function hashTagReducer(state = hashTagResult, action) {
  switch (action.type) {
    case HASHTAGADD.type: {
      const typePredict = Array.from(new Set(action.payload.word_predict)).map(
        int_ => `${int_}`
      )
      const sizeOfPredict = typePredict.map(res => {
        return {
          type: res + '',
          size: action.payload.word_predict.filter(data => `${data}` === res)
            .length
        }
      })
      return {
        features: action.payload.features,
        idf: action.payload.idf,
        userTopRetweet: {
          ...action.payload.userTopRetweet
        },
        word_predict: {
          type: typePredict,
          size: sizeOfPredict
        },
        text_sentiments: {
          ...action.payload.text_sentiments
        },
        clustering_grop: {
          ...action.payload.clustering_grop
        }
      }
    }
    case HASHTAGREMOVE.type: {
      return {
        features: [],
        idf: [],
        userTopRetweet: {
          userName: [],
          retweet_count: []
        },
        word_predict: [{ type: [], size: [] }],
        text_sentiments: { good: [], neg: [], neutral: [] },
        clustering_grop: {
          grop_detail: {
            grop1: [],
            grop2: [],
            grop3: []
          },
          show_user_grop: { grop1: [], grop2: [], grop3: [] }
        }
      }
    }
    default: {
      return state
    }
  }
}

export default function HadleFileAndHashTagProvider({ children }) {
  const [hashTag, dispatchHashTag] = useReducer(hashTagReducer, hashTagResult)
  const [clickShowData, setClickShowData] = useState('')
  return (
    <HashtagFileHasgTagContext.Provider
      value={{ hashTag, dispatchHashTag, clickShowData, setClickShowData }}
    >
      {children}
    </HashtagFileHasgTagContext.Provider>
  )
}
