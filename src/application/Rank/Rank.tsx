import React,{useEffect} from 'react'
import {useNavigate,Outlet} from 'react-router-dom'
import { useAppDispatch,useAppSelector } from '../../api/customHooks';
import { filterIndex } from '../../api/utils';
import Scroll from '../../components/Scroll/Scroll';
import { ParamProps,getRankList } from '../../store/slices/rankSlice';
import { Container, List, ListItem, SongList } from "./rankStyle";
import WaveLoading from '../../components/Loading/WaveLoading/WaveLoading';

const Rank = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { rankList, isLoading } = useAppSelector((state) => state.rank);

  useEffect(()=>{
    dispatch(getRankList())
  },[dispatch])

  //全球榜开始位置
  const globalStartIndex = filterIndex(rankList);
  //划分官方榜和全球榜
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);

  //处理路由
  const enterDetail = (id:number)=>{
    navigate(`/rank/${id}`)
  }

  //歌单渲染
  const renderSongList = (list: Array<{ first: string; second: string }>) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => (
          <li key={index}>
            {index + 1}. {item.first} - {item.second}
          </li>
        ))}
      </SongList>
    ) : null;
  };

  //榜单渲染
  const renderRankList = (list: Array<ParamProps>, global?: boolean) => (
    <List globalRank={global as boolean}>
      {list.map((item, index) => (
        <ListItem key={item.coverImgId + "" + index} tracks={item.tracks} onClick={()=>enterDetail(item.id as number)}>
          <div className="img_wrapper">
            <img src={item.coverImgUrl} alt="" />
            <div className="decorate"></div>
            <span className="update_frequency">{item.updateFrequency}</span>
          </div>
          {renderSongList(item.tracks)}
        </ListItem>
      ))}
    </List>
  );

  // 榜单数据未加载出来之前都给隐藏
  const displayStyle = !isLoading ? { display: "none" } : { display: "" };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            {" "}
            官方榜{" "}
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            {" "}
            全球榜{" "}
          </h1>
          {renderRankList(globalList,true)}
          {isLoading?<WaveLoading/>:null}
        </div>
      </Scroll>
      <Outlet/>
    </Container>
  );
}

export default React.memo(Rank);