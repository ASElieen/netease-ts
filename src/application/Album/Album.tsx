import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./albumStyle";
import { CSSTransition } from "react-transition-group";
import AlbumHeader from "../../components/AlbumHeader/AlbumHeader";

const Album = () => {
  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState(true);

  //开启退出动画
  const handleBack = ()=>{
    setShowStatus(false)
  }
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={()=>navigate(-1)}
    >
      <Container>
        <AlbumHeader title={'返回'} handleClick={handleBack}/>
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Album);
