const demoController = {
  checkServer: (request, response, next) => {
    response.json('hello world');
  },
  checkQuery: (request, response, next) => {
    const query = request.query;

    response.json({
      message: 'Query received',
      query: query,
    });
  },
  checkPath: (request, response, next) => {
    const param = request.params;

    console.log('Path parameter:', param);

    // Thực hiện cập nhật dữ liệu
    response.json({
      message: 'Data updated successfully',
      data: null,
    });
  },
  delete: (request, response, next) => {
    const headers = request.headers;

    console.log('Headers:', headers);

    // Thực hiện xóa dữ liệu
    response.json({
      message: 'Data deleted successfully',
      data: headers,
    });
  },
  postBody: (request, response, next) => {
    const body = request.body;

    response.json({
      message: 'Body received',
      body: body,
    });
  },
};

export default demoController;
