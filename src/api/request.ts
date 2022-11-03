import {axiosInstance} from './config'

export const getBannerRequest = ()=>{
    return axiosInstance.get('/banner')
}

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized");
};

export const getHotSingerListRequest = (count:number = 0) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (categoryName:string, alpha:string, count:number = 0,area:number = -1) => {
  return axiosInstance.get(
    `/artist/list?type=${categoryName}&initial=${alpha.toLowerCase()}&offset=${count}&area=${area}`
  );
};

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};

export const getAlbumDetailRequest = (id:string) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};

export const getSingerInfoRequest = (id:string) => {
  return axiosInstance.get(`/artists?id=${id}`);
};