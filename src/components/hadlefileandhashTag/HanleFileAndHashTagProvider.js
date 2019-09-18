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
  text_sentiments: { good: [], neg: [], neutral: [] }
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
      console.log({ typePredict, sizeOfPredict })
      return {
        features: action.payload.features,
        idf: action.payload.idf,
        userTopRetweet: {
          userName: action.payload.userTopRetweet.userName,
          retweet_count: action.payload.userTopRetweet.retweet_count
        },
        word_predict: {
          type: typePredict,
          size: sizeOfPredict
        },
        text_sentiments: {
          good: action.payload.text_sentiments.good,
          neg: action.payload.text_sentiments.neg,
          neutral: action.payload.text_sentiments.neutral
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
        text_sentiments: { good: [], neg: [], neutral: [] }
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
