import React from 'react'
import './DivBox.css'

export default function DivBox({ datas, text }) {
  return (
    <div className="div-box">
      <h2>{text}</h2>
      <ul>
        {datas.map((hastT, ind) => (
          <li key={ind}>
            {ind + 1}. {hastT}
          </li>
        ))}
      </ul>
    </div>
  )
}
