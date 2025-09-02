import prisma from '../prisma/init.prisma';
import bcrypt from 'bcrypt'; // For password hashing/comparison
import { BadResquestException, UnauthorizedException } from '../helpers/exception.helper'; // For error handling
import { tokenService } from '../../services/token.service'; // For JWT token creation

// The root provides a resolver function for each API endpoint
export const root = {
  hello() {
    return 'Hello world!';
  },
  // args : dùng để lấy dữ liệu đầu vào từ client cho query/mutation
  // context : dùng để truyền thông tin/phụ trợ cho resolver trong quá trình xử lý request
  async getListArticle(args, context) {
    // nếu không có user thì
    if (!context.user) throw new UnauthorizedException('Invalid account');

    let { page, pageSize, filters } = args;
    page = Number(page) > 0 ? Number(page) : 1;
    pageSize = Number(pageSize) > 0 ? Number(pageSize) : 1;

    // Parse filters safely
    try {
      filters = filters ? JSON.parse(filters) : {};
    } catch (error) {
      filters = {};
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) {
        delete filters['id'];
        return;
      }

      if (typeof value === 'string') {
        filters[key] = {
          contains: value, // SQL: CONTAINS
          // mode: 'insensitive',
        };
      }

      // TODO: xử lý ngày tháng
    });
    // index (OFFSET) = ( page - 1 ) * pageSize
    const index = (page - 1) * pageSize;

    // debug
    console.log({ page, pageSize, index, filters });

    const articlesPromise = prisma.articles.findMany({
      skip: index, // SQL: OFFSET
      take: pageSize, // SQL: LIMIT
      where: filters,
    });

    // đếm số lượng row trong table
    const totalItemPromise = prisma.articles.count(); // SQL: COUNT

    const [articles, totalItem] = await Promise.all([articlesPromise, totalItemPromise]);

    const totalPage = totalItem / pageSize;

    return {
      page,
      pageSize,
      totalItem: totalItem,
      totalPage: Math.ceil(totalPage),
      items: articles || [],
    };
  },

  async login(args, context) {
    const { email, password } = args;
    console.log('🚀 ~ getListArticle ~ args:', args);
    console.log('🚀 ~ getListArticle ~ context:', context);

    const userExits = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExits) throw new BadResquestException('Người dùng chưa tồn tại, vui lòng đăng ký');
    // Nếu code chạy được tới đây => đảm bảo có userExits

    // do tài khoản đăng nhập bằng gmail hoặc facebook
    // lúc này tài khoản sẽ không có mật khẩu
    // nên nếu người dùng cố tình đăng nhập bằng email thì sẽ không có mật khẩu để kiểm tra
    // nên phải bắt người dùng đăng nhập bằng email vào setting để cập nhật lại mật khẩu mới
    if (!userExits.password) {
      throw new BadResquestException(
        'Vui lòng đăng nhập bằng mạng xã hội (gmail, facebook), để cập nhật lại mật khẩu mới trong setting',
      );
    }

    const isPassword = bcrypt.compareSync(password, userExits.password); // true
    if (!isPassword) throw new BadResquestException('Mật khẩu không chính xác');
    // Nếu code chạy được tới đây => người dùng này hợp lệ

    const tokens = tokenService.createTokens(userExits.id);

    console.log({ email, password });

    // sendMail(email)
    // sendMail("vulebaolong@gmail.com");

    return tokens;
  },
};
