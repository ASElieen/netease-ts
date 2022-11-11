import React, { useRef, useEffect, useState, useMemo } from "react";
import { debounce } from "src/api/customHooks";
import { SearchBoxWrapper } from "./boxStyle";
import {MdArrowBackIosNew} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'

interface SearchProps {
  newQuery: string; //父组件中的搜索关键词
  handleQuery: (str:string)=>void; //对关键词的处理
  back:()=>void
}

const SearchBox: React.FC<SearchProps> = (props) => {
  const { newQuery, handleQuery,back } = props;
  const queryRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  // 根据关键字是否存在决定清空按钮的显示 / 隐藏
  const displayStyle = query ? { display: "block" } : { display: "none" };

  //监听input内容
  const handleChange = (e:any) => {
    setQuery(e.currentTarget.value);
  };
  const clearQuery = () => {
    // 清空框内容的逻辑
    setQuery("");
    (queryRef.current as HTMLInputElement).focus();
  };

  //缓存方法
  let handleQueryDebounce = useMemo(()=>{
    return debounce(handleQuery,1000)
  },[handleQuery])

  useEffect(()=>{
    if(handleQueryDebounce) handleQueryDebounce(query);
  },[query,handleQueryDebounce])

  //父组件点击关键字后更新
  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  }, [newQuery,query]);

  //进场时出现光标
  useEffect(()=>{
    (queryRef.current as HTMLInputElement).focus()
  },[])

  return (
    <SearchBoxWrapper>
      <MdArrowBackIosNew className="iconfont icon-back" onClick={back} />
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
