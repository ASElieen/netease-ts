import React from 'react'
import Player from '../Player/Player';
import {Outlet,NavLink} from 'react-router-dom'
import {Top,Tab,TabItem} from './homeStyle'
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";

const Home = () => {
  return (
    <>
      <Top>
        <span className="iconfont">
          <AiOutlineMenu />
        </span>
        <span className="title">Web</span>
        <span className="iconfont">
          <AiOutlineSearch />
        </span>
      </Top>
      <Tab>
        <NavLink
          to="/recommend"
          className={({ isActive }) => (isActive ? "selected" : undefined)}
        >
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>

        <NavLink
          to="/singer"
          className={({ isActive }) => (isActive ? "selected" : undefined)}
        >
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>

        <NavLink
          to="/rank"
          className={({ isActive }) => (isActive ? "selected" : undefined)}
        >
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      <Outlet />
      <Player/>
    </>
  );
}

export default React.memo(Home);