import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { Container } from "./searchStyle";

const Search = () => {
  const navigate = useNavigate();
  //控制动画
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExit={() => navigate(-1)}
    >
        <Container>
            <div onClick={()=>setShow(false)}>返回</div>
        </Container>
    </CSSTransition>
  );
};

export default Search;
