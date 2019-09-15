import React, { useContext } from 'react'
import './LoderCss.css'
import { LoderContext } from './LoaderProvider'
export default function LoderComponent() {
  const { showLoader } = useContext(LoderContext)

  return showLoader === true ? (
    <div className="loding-box">
      <div className="loading-circle-and-text">
        <div className="loading-circle-box">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
        <h3 className="loading-text">Loading</h3>
      </div>
    </div>
  ) : (
    ''
  )
}
