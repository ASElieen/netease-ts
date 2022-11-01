import React from 'react'
import {HeaderContainer} from './headerStyle'
import {MdArrowBackIosNew} from 'react-icons/md'

interface ParamProps {
    handleClick?:()=>void,
    title?:string
}

const AlbumHeader:React.FC<ParamProps> = React.forwardRef((props,ref) => {
    const {handleClick,title} = props
  return (
    <HeaderContainer ref={ref as any}>
      <div className="svg_container">
        <MdArrowBackIosNew className="iconfont back" onClick={handleClick} />
      </div>
      <h1>{title}</h1>
    </HeaderContainer>
  );
});

export default React.memo(AlbumHeader);