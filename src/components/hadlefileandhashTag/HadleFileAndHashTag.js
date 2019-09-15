import React from 'react'
import './HadleFileAndHashTag.css'
import ListOfFile from './listoffiles/ListOfFile'
import HadleFileAndHashTagProvider from '../hadlefileandhashTag/HanleFileAndHashTagProvider'
import ShowResultHashTag from './showresulthashtag/ShowResultHashTag'
export default function HadleFileAndHashTag() {
  return (
    <HadleFileAndHashTagProvider>
      <div>
        <div className="box-file-hashtag">
          <ListOfFile />
          <ShowResultHashTag />
        </div>
      </div>
    </HadleFileAndHashTagProvider>
  )
}
