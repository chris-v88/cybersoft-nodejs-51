import demoService from '../services/demo.service';

const demoController = {
  service: async (request, response, next) => {
    const result = await demoService.service();
    response.json(result);
  },
  query: async (request, response, next) => {
    const query = await demoService.query(request);

    response.json(query);
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
