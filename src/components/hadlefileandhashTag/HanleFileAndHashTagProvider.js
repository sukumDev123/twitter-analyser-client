import React, { createContext, useReducer } from 'react'

export const HashtagFileHasgTagContext = createContext()
const hashTagResult = {
  features: [],
  idf: [],
  userTopRetweet: {
    userName: [],
    retweet_count: []
  }
}
export const HASHTAGADD = {
  type: 'HASHTAGADD',
  payload: {
    features: [],
    idf: [],
    userTopRetweet: {
      userName: [],
      retweet_count: []
    }
  }
}
export const HASHTAGREMOVE = {
  type: 'HASHTAGREMOVE',
  payload: {
    features: [],
    idf: [],
    userTopRetweet: {
      userName: [],
      retweet_count: []
    }
  }
}

function hashTagReducer(state = hashTagResult, action) {
  switch (action.type) {
    case HASHTAGADD.type: {
      return {
        features: action.payload.features,
        idf: action.payload.idf,
        userTopRetweet: {
          userName: action.payload.userTopRetweet.userName,
          retweet_count: action.payload.userTopRetweet.retweet_count
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
        }
      }
    }
    default: {
      return state
    }
  }
}

export default function HadleFileAndHashTagProvider({ children }) {
  const [hashTag, dispatchHashTag] = useReducer(hashTagReducer, {
    features: [],
    idf: []
  })
  return (
    <HashtagFileHasgTagContext.Provider value={{ hashTag, dispatchHashTag }}>
      {children}
    </HashtagFileHasgTagContext.Provider>
  )
}
