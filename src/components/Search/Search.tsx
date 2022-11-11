import React, { useEffect, useState,useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { Container } from "./searchStyle";
import SearchBox from "src/BaseUI/SearchBox/SearchBox";

const Search = () => {
  const navigate = useNavigate();
  //控制动画
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    setShow(true);
  }, []);

  const handleQuery = (q:string) => {
    setQuery(q);
  };

  const searchBack = useCallback(() => {
    setShow(false);
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
        <div className="search_box_wrapper">
          <SearchBox newQuery="" handleQuery={handleQuery} back={searchBack} />
        </div>
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Search);
