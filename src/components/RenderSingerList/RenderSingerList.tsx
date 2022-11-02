import React from 'react'
import {useNavigate} from 'react-router-dom'
import {List,ListItem} from './renderStyle'
import LazyLoad from 'react-lazyload'
import music from "../../assets/music.png";

export type Singers = {
    picUrl:string,
    name:string,
    accountId:number,
    id?:number
}

interface SingerListProps {
    singerList:Array<Singers>
}

const RenderSingerList:React.FC<SingerListProps> = (props) => {
  const { singerList } = props;
  const navigate = useNavigate();

  //跳转路由
  const enterDetail = (id: number) => {
    navigate(`/singer/${id}`);
  };

  return (
    <List>
      {singerList.map((item, index) => (
        <ListItem key={item.accountId + "" + index} onClick={()=>enterDetail(item.id as number)}>
          <div className="img_wrapper">
            <LazyLoad
              placeholder={
                <img width="100%" height="100%" src={music} alt="music" />
              }
            >
              <img
                src={`${item.picUrl}?param=300x300`}
                width="100%"
                height="100%"
                alt="singerDetail"
              />
            </LazyLoad>
          </div>
          <span className="name">{item.name}</span>
        </ListItem>
      ))}
    </List>
  );
}

export default React.memo(RenderSingerList);