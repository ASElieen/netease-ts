import React, { useRef, useEffect } from "react";
import Scroll from "../../components/Scroll/Scroll";
import { List, ListItem } from "./horizenStyle";

type ListProps = {
  name: string;
  key: string;
};

interface HorizenProps {
  list: ListProps[]; //分类数组
  oldVal: string; //判断选中样式
  title: string; //分类和首字母
  handleClick: (key: string) => void;
}

const HorizenItem: React.FC<HorizenProps> = (props) => {
  const { list, oldVal, title, handleClick } = props;
  const category = useRef<HTMLDivElement>(null);

  //初始化内容宽度
  useEffect(() => {
    let categoryDOM = category.current;
    let tagElements = (categoryDOM as HTMLDivElement).querySelectorAll(
      "span"
    );
    let totalWidth = 0;
    Array.from(tagElements).forEach((ele) => {
      totalWidth += ele.offsetWidth;
    });
    (categoryDOM as HTMLDivElement).style.width = `${totalWidth}px`;
  },[]);

  return (
    <Scroll direction={"horizental"}>
      <div ref={category}>
        <List>
          <span>{title}</span>
          {list.map((item) => (
            <ListItem
              key={item.key}
              className={`${oldVal === item.key ? "selected" : ""}`}
              onClick={() => handleClick(item.key)}
            >
              {item.name}
            </ListItem>
          ))}
        </List>
      </div>
    </Scroll>
  );
};

export default React.memo(HorizenItem);
