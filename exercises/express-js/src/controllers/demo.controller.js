import demoService from '../services/demo.service';

const demoController = {
  service: (request, response, next) => {
    const result = demoService.service();
    response.json(result);
  },
  query: (request, response, next) => {
    const query = request.query;

    response.json(demoService.query(query));
  },
  path: (request, response, next) => {
    const param = request.params;

    // Thực hiện cập nhật dữ liệu
    response.json();
  },
  delete: (request, response, next) => {
    const headers = request.headers;

    // Thực hiện xóa dữ liệu
    response.json(demoService.delete(headers));
  },
  body: (request, response, next) => {
    const body = request.body;

    response.json(demoService.body(body));
  },
};

export default demoController;
