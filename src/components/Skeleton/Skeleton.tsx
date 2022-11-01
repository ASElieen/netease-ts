import React from 'react'
import { Container,Info } from './skeletonStyle'

const Skeleton = () => {
  return (
    <>
      <Container>
        <div className="loading img_wrapper"></div>
        <Info>
          <div className="loading top"></div>
          <div className="loading top"></div>
          <div className="loading top"></div>
          <div className='loading bottom'></div>
        </Info>
      </Container>
    </>
  );
}

export default Skeleton