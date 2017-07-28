/**
 * 通过mockjs 模拟后台接口获取数据
 */
import Mock from 'mockjs'
import apiData from './data.json'

Mock.mock('/mock/goods' , {
  status: "ok",
  data: apiData.goods
});
Mock.mock('/mock/seller' , {
  status: "ok",
  data: apiData.seller
});
Mock.mock('/mock/ratings' , {
  status: "ok",
  data: apiData.ratings
});
