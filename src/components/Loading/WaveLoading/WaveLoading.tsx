import React from 'react'
import { Wave } from './waveStyle'

type WaveProps = {
  margin?:string
}

const WaveLoading = (props:WaveProps) => {
  const {margin} = props
  return (
    <Wave margin={margin as string}>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </Wave>
  );
}

export default WaveLoading