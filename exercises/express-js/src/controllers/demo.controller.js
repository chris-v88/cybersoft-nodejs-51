import demoService from '../services/demo.service';
import {
  responseSuccess,
  responseError,
} from '../common/helpers/response.helpers';

const demoController = {
  checkServer: async (request, response, next) => {
    try {
      const result = await demoService.service();
      const resData = responseSuccess(
        result,
        'Service is running successfully'
      );

      response.json(resData);
    } catch (error) {
      console.error('Error in service:', error);
      const resData = responseError(error, 'Service is not running');
      response.status(500).json(resData);
    }
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
    // const param = await demoService.path(request.params);
    try {
      const param = await demoService.path(request.params);
      const responseData = responseSuccess(param, 'Xử lý dữ liệu thành công');

      response.json(responseData);
    } catch (error) {
      console.error('Error in path:', error);
      const responseData = responseError(error, 'Xử lý dữ liệu thất bại');
      response.status(500).json(responseData);
    }
  },
  delete: async (request, response, next) => {
    // const headers = await demoService.delete(request.headers);
    try {
      const headers = await demoService.delete(request.headers);
      const responseData = responseSuccess(headers, 'Xử lý dữ liệu thành công');

      response.json(responseData);
    } catch (error) {
      console.error('Error in delete:', error);
      const responseData = responseError(error, 'Xử lý dữ liệu thất bại');
      response.status(500).json(responseData);
    }

    // Thực hiện xóa dữ liệu
    response.json();
  },
  body: async (request, response, next) => {
    // const body = await demoService.body(request.body);
    try {
      const body = await demoService.body(request.body);
      const responseData = responseSuccess(body, 'Xử lý dữ liệu thành công');

      response.json(responseData);
    } catch (error) {
      console.error('Error in body:', error);
      const responseData = responseError(error, 'Xử lý dữ liệu thất bại');
      response.status(500).json(responseData);
    }
  },
};

export default demoController;
