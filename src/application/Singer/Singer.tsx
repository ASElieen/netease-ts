import React,{useState} from 'react'
import HorizenItem from '../../BaseUI/HorizenItem/HorizenItem';
import { NavContainer,ListContainer } from '../../BaseUI/HorizenItem/horizenStyle';
import { categoryTypes, alphaTypes } from "../../api/mock";
import Scroll from '../../components/Scroll/Scroll';
import RenderSingerList from '../../components/RenderSingerList/RenderSingerList';
import { singerList } from '../../api/mock';

const Singer = () => {
  const [category,setCategory] = useState('')
  const [alpha,setAlpha] = useState('')

  const handleCategody = (value:string)=>{
    setCategory(value)
  }
  const handleAlpha = (value:string)=>{
    setAlpha(value)
  }
  return (
    <>
      <NavContainer>
        <HorizenItem
          list={categoryTypes}
          title={"分类 (热门):"}
          oldVal={category}
          handleClick={(value) => handleCategody(value)}
        ></HorizenItem>
        <HorizenItem
          list={alphaTypes}
          title={"首字母:"}
          oldVal={alpha}
          handleClick={(value) => handleAlpha(value)}
        ></HorizenItem>
      </NavContainer>

      <ListContainer>
        <Scroll>
          <RenderSingerList singerList={singerList}/>
        </Scroll>
      </ListContainer>
    </>
  );
}

export default React.memo(Singer);