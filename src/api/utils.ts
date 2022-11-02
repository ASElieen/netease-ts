import { ParamProps } from "../store/slices/rankSlice";
export const getCount = (count:number) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
};

//Singer组件处理map数据
export const handleMapCategory = (categoryName:string,category:Map<string,{type:string,area:number}>)=>{
  const {type,area} = category.get(categoryName) || {type:'0',area:0}
  return {type,area}
}

//处理榜单分类
export const filterIndex = (rankList:Array<ParamProps>)=>{
  for(let i =0;i<rankList.length-1;i++){
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
}

// 处理歌手列表拼接歌手名字
export const getName = (list: Array<{ name: string }>) => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};