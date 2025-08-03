export const responseSuccess = (data, message = 'Success', code = 200) => {
  return {
    status: 'success',
    statusCode: code,
    message,
    data,
  };
};

export const responseError = (error, message = 'Error', code = 500) => {
  return {
    status: 'error',
    statusCode: code,
    message,
    error: error instanceof Error ? error.message : error,
  };
};
