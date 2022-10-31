
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