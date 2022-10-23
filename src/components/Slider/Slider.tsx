import React from 'react'
import {SliderContainer} from './sliderStyle'
import {Swiper} from 'antd-mobile'

interface BannerList {
    bannerList:Array<{imageUrl:string}>
}


const Slider:React.FC<BannerList> = (props) => {
    const {bannerList} = props
    const item = bannerList.map((item, index) => (
      <Swiper.Item key={index}>
        <img
          src={item.imageUrl}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </Swiper.Item>
    ));
  return (
    <SliderContainer>
        <div className='slider-container'>
            <Swiper
            autoplay
            loop
            className='slider-nav'
            indicatorProps={{color:'white'}}>
                {item}
            </Swiper>
        </div>
    </SliderContainer>
  )
}

export default Slider