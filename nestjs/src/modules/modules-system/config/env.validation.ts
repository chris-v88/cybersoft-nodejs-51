import * as Joi from 'joi'; // Import thư viện Joi để kiểm tra (validate) dữ liệu.

// Hàm kiểm tra tất cả các biến môi trường có trong file .env
export const envValidation = (config: Record<string, unknown>) => {
  // Tạo schema (mẫu) để kiểm tra các biến môi trường
  const envVarsSchema = Joi.object({
    PORT: Joi.number().default(3000), // PORT phải là số, mặc định là 3000 nếu không có.
    DATABASE_URL: Joi.string().required(), // DATABASE_URL phải là chuỗi và bắt buộc phải có.
    ACCESS_TOKEN_SECRET: Joi.string().required(), // Secret key cho access token, bắt buộc.
    ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(), // Thời gian hết hạn access token, bắt buộc.
    ACCESS_REFRESH_SECRET: Joi.string().required(), // Secret key cho refresh token, bắt buộc.
    ACCESS_REFRESH_EXPIRES_IN: Joi.string().required(), // Thời gian hết hạn refresh token, bắt buộc.
    GOOGLE_CLIENT_ID: Joi.string().required(), // Google Client ID cho OAuth, bắt buộc.
    GOOGLE_CLIENT_SECRET: Joi.string().required(), // Google Client Secret cho OAuth, bắt buộc.
    GOOGLE_CLIENT_URI_CALLBACK: Joi.string().required(), // URL callback của Google OAuth, bắt buộc.
    GMAIL_USER: Joi.string().required(), // Email Gmail để gửi mail, bắt buộc.
    GMAIL_PASS: Joi.string().required(), // Password Gmail (app password), bắt buộc.
    CLOUDINARY_NAME: Joi.string().required(), // Tên Cloudinary để upload ảnh, bắt buộc.
    CLOUDINARY_API_KEY: Joi.string().required(), // API key của Cloudinary, bắt buộc.
    CLOUDINARY_API_SECRET: Joi.string().required(), // API secret của Cloudinary, bắt buộc.
  }).unknown(); // .unknown() cho phép các biến môi trường khác của hệ thống tồn tại mà không gây lỗi

  // Kiểm tra config (biến môi trường) với schema đã định nghĩa
  const { error, value } = envVarsSchema.validate(config);

  if (error) {
    // Nếu có lỗi, ném ra exception với thông báo lỗi
    throw new Error(`Config validation error: ${error.message}`);
  }

  // Trả về giá trị đã được kiểm tra và chuẩn hóa
  return value;
};
