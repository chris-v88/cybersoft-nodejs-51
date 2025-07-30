const demoService = {
  service: () => {
    return 'Hello world';
  },
  query: (query) => {
    return {
      message: 'Data updated successfully',
      data: query,
    };
  },
  path: (param) => {
    console.log('Path parameter:', param);
    return {
      message: 'Path parameter received',
      data: param,
    };
  },
  delete: (headers) => {
    console.log('Headers:', headers);
    return {
      message: 'Headers received',
      data: headers,
    };
  },
  body: (body) => {
    console.log('Body:', body);
    return {
      message: 'Body received',
      data: body,
    };
  },
};

export default demoService;
