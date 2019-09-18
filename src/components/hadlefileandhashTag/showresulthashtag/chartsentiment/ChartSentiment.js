import React, { useContext, useState, useEffect } from 'react'
import './ChartSentiment.css'
import { HashtagFileHasgTagContext } from '../../HanleFileAndHashTagProvider'

function SentimentsText({ textSentiment, typeText, className }) {
  // typeText
  return (
    <div className={className + ' normalDIv'}>
      <h4>{typeText}</h4>
      <div className="overSentimentStyles">
        {textSentiment.map((data, ind) => (
          <p key={ind}>{data}</p>
        ))}
      </div>
    </div>
  )
}

function CreateChart({ chartSize, typeName, sizeTotal }) {
  const pesent = Math.ceil((parseInt(chartSize) / parseInt(sizeTotal)) * 100)
  const [typeString, setTypeString] = useState('')
  useEffect(() => {
    if (typeName === '1') setTypeString('Good')
    if (typeName === '0') setTypeString('Neutral')
    if (typeName === '-1') setTypeString('Neg')
  }, [typeName])

  return (
    <div className="chart-bar">
      <div
        style={{
          width: pesent + '%',
          padding: '0',
          margin: '0'
        }}
        className={'chartName' + typeName}
      >
        <h5>{typeString}</h5>
      </div>
      <h5>{chartSize}</h5>
    </div>
  )
}
export default function ChartSentiment() {
  const { hashTag } = useContext(HashtagFileHasgTagContext)
  const { word_predict, text_sentiments } = hashTag

  return (
    <div>
      <h2 className="title-chart"> Chart Sentiment </h2>
      <div className="chart_and_texts">
        <div className="chart-box">
          {word_predict.type
            ? word_predict.type.map((data, ind) => {
                const sizeTotal = word_predict.size.reduce(
                  (sum, val) => (sum = parseInt(sum) + parseInt(val.size)),
                  0
                )
                return (
                  <CreateChart
                    chartSize={word_predict.size[ind].size}
                    typeName={data}
                    key={ind}
                    sizeTotal={sizeTotal}
                  ></CreateChart>
                )
              })
            : ''}
        </div>
        <div className="forListOfTextSentiments">
          <SentimentsText
            textSentiment={text_sentiments.good}
            typeText={'GOOD Comment'}
            className={'good-comment'}
          />
          <SentimentsText
            textSentiment={text_sentiments.neg}
            typeText={'Neg Comment'}
            className={'neg-comment'}
          />
          <SentimentsText
            textSentiment={text_sentiments.neutral}
            typeText={'neutral Comment'}
            className={'neutral-comment'}
          />
        </div>
      </div>
    </div>
  )
}
