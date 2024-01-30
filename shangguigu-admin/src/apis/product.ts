import { request } from '@/utils';
import { IGetHasTardemarkResponse } from './type';

// 获取品牌列表
function getHasTardemark(params: { page: number; limit: number }) {
  return request<any, IGetHasTardemarkResponse>({
    url: `/admin/product/baseTrademark/${params.page}/${params.limit}`,
    method: 'get',
  });
}

export { getHasTardemark };
