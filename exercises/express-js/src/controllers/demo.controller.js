import demoService from '../services/demo.service';
import {
  responseSuccess,
  responseError,
} from '../common/helpers/response.helpers';

const demoController = {
  service: async (request, response, next) => {
    const result = await demoService.service();
    const resData = responseSuccess(result, 'Service is running successfully');
    response.json(resData);
  },
  query: async (request, response, next) => {
    try {
      const result = await demoService.query(request);
      const responseData = responseSuccess(result, 'Xử lý dữ liệu thành công');
      response.json(responseData);
    } catch (error) {
      console.error('Error in query:', error);
      const responseData = responseError(error, 'Xử lý dữ liệu thất bại');
      response.status(500).json(responseData);
    }
  },
  path: async (request, response, next) => {
    const param = await demoService.path(request.params);

    // Thực hiện cập nhật dữ liệu
    response.json();
  },
  delete: async (request, response, next) => {
    const headers = await demoService.delete(request.headers);

    // Thực hiện xóa dữ liệu
    response.json();
  },
  body: async (request, response, next) => {
    const body = await demoService.body(request.body);

    response.json(body);
  },
};

export default demoController;
