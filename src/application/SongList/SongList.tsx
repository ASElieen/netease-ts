import React from "react";
import { SongItem, SongListComponent } from "./songListStyle";
import { BsCollection, BsFillPlayFill } from "react-icons/bs";
import { getName } from "../../api/utils";

type HotSongs = {
  id: number;
  name: string;
  al: al;
  ar: Array<ar>;
};

interface ar {
  id?: number;
  name: string;
  alia?: string[];
}

interface al {
  id?: number;
  name: string;
  picUrl?: string;
  alia?: string[];
}

export interface SongsProp {
  id?: number;
  name: string;
  hotSongs: Array<HotSongs>;
  artist: { name: string,picUrl:string };
  ar: Array<ar>;
  al: al;
}

interface ParamProps {
  collectCount?: number;
  showCollect: boolean;
  songs: Array<HotSongs>;
}

const SongList = React.forwardRef((props: ParamProps, ref) => {
  const { collectCount, showCollect, songs } = props;
  const totalCount = songs.length;

  const songList = (list: Array<HotSongs>) => {
    let res: any = [];
    list.forEach((item, index: number) => {
      res.push(
        <li key={item.id}>
          <span className="index">{index + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {getName(item.ar)} - {item.al.name}
            </span>
          </div>
        </li>
      );
    });
    return res;
  };

  const collect = (count: number) => {
    return (
      <div className="add_list">
        <BsCollection className="iconfont" />
        <span> 收藏 ({Math.floor(count / 1000) / 10} 万)</span>
      </div>
    );
  };

  return (
    <SongListComponent showBackground={true}>
      <div className="first_line">
        <div className="play_all">
          <BsFillPlayFill className="iconfont" />
          <span>
            {" "}
            播放全部 <span className="sum">(共 {totalCount} 首)</span>
          </span>
        </div>
        {showCollect ? collect(collectCount as number) : null}
      </div>
      <SongItem>{songList(songs)}</SongItem>
    </SongListComponent>
  );
});

export default React.memo(SongList);
