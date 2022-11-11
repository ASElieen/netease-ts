import React, { useEffect, useState, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/api/customHooks";
import {
  getHotKeyWords,
  getSuggestList,
  getResultSongList,
} from "../../store/slices/searchSlice";
import { Container, ShortcutWrapper, HotKey } from "./searchStyle";
import SearchBox from "src/BaseUI/SearchBox/SearchBox";
import Scroll from "../Scroll/Scroll";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { hotList, songsList, suggestList, isLoading, enterLoading } =
    useAppSelector((store) => store.search);
  //控制动画
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    setShow(true);
    dispatch(getHotKeyWords())
  }, [dispatch,hotList]);

  const handleQuery = (q: string) => {
    setQuery(q);
  };

  const searchBack = useCallback(() => {
    setShow(false);
  }, []);

  //-----------------------------处理部分---------------------
  //搜索框为空 展示热门搜索
  const renderHotKey = () => {
    let list = hotList ? hotList : [];
    return (
      <ul>
        {list.map((item: any) => (
          <li
            className="item"
            key={item.first}
            onClick={() => setQuery(item.first)}
          >
            <span>{item.first}</span>
          </li>
        ))}
      </ul>
    );
  };

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
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title">热门搜索</h1>
                {renderHotKey()}
              </HotKey>
            </div>
          </Scroll>
        </ShortcutWrapper>
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Search);
