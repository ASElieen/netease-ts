import React, { useRef, useEffect, useState } from "react";
import { SearchBoxWrapper } from "./boxStyle";
import {MdArrowBackIosNew} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'

interface SearchProps {
  newQuery: string; //父组件中的搜索关键词
  handleQuery: any; //对关键词的处理
}

const SearchBox: React.FC<SearchProps> = (props) => {
  const { newQuery, handleQuery } = props;
  const queryRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  // 根据关键字是否存在决定清空按钮的显示 / 隐藏
  const displayStyle = query ? { display: "block" } : { display: "none" };

  const handleChange = () => {
    // 搜索框内容改变时的逻辑
  };
  const clearQuery = () => {
    // 清空框内容的逻辑
  };

  return (
    <SearchBoxWrapper>
      <MdArrowBackIosNew className="iconfont icon-back" onClick={() => {}} />
      <input
        ref={queryRef}
        className="box"
        placeholder="搜索歌曲、歌手、专辑"
        value={query}
        onChange={handleChange}
      />
      <AiTwotoneDelete
        className="iconfont icon-delete"
        onClick={clearQuery}
        style={displayStyle}
      />
    </SearchBoxWrapper>
  );
};

export default React.memo(SearchBox);
