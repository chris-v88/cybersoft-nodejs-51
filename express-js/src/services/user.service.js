import fs from 'fs';
import path from 'path';

import { BadResquestException } from '../common/helpers/exception.helper';
import cloudinary from '../common/cloudinary/init.cloudinary';
import prisma from '../common/prisma/init.prisma';

export const userService = {
  avatarLocal: async (req) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log('🚀 ~ req.file:', req.file);

    if (!req.file) {
      throw new BadResquestException('File not found');
    }

    const user = req.user;
    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        avatar: req.file.filename,
      },
    });

    if (user.avatar) {
      const oldFilePath = path.join(process.cwd(), 'public/images', user.avatar);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    return true;
  },

  avatarCloud: async (req) => {
    console.log('🚀 ~ req.file:', req.file);

    if (!req.file) {
      throw new BadResquestException('File not found');
    }

    const user = req.user;
    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        avatar: req.file.filename,
      },
    });

    // đưa hình lên cloud
    // cloudinary;
    // const byteArrayBuffer = fs.readFileSync('shirt.jpg');
    const byteArrayBuffer = req.file.buffer;
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'images' }, (error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(byteArrayBuffer);
    });

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        avatar: uploadResult.public_id,
      },
    });

    // xoá hình cũ trên cloud nếu có avaatar
    if (user.avatar) {
      // win : \\
      // mac : //

      // xoa local
      const oldFilePath = path.join(process.cwd(), 'public/images', user.avatar);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      // xoa cloud
      cloudinary.uploader.destroy(user.avatar);
    }

    console.log('🚀 ~ uploadResult:', uploadResult);

    return `avatarCloud`;
  },

  create: async (req) => {
    return `This action create`;
  },

  findAll: async (req) => {
    let { page, pageSize, filters } = req.query;
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
        // delete filters['id']; // ❌ This always deletes 'id' regardless of the key
        delete filters[key]; // ✅ Delete the actual key, not always 'id'
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
    // eslint-disable-next-line no-undef
    console.log({ page, pageSize, index, filters });

    const usersPromise = prisma.users.findMany({
      skip: index, // SQL: OFFSET
      take: pageSize, // SQL: LIMIT
      where: filters,
    });

    // đếm số lượng row trong table
    const totalItemPromise = prisma.users.count(); // SQL: COUNT

    const [users, totalItem] = await Promise.all([usersPromise, totalItemPromise]);

    const totalPage = totalItem / pageSize;

    return {
      page,
      pageSize,
      totalItem: totalItem,
      totalPage: Math.ceil(totalPage),
      items: users || [],
    };
  },

  findOne: async (req) => {
    const user = await prisma.users.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        Roles: true,
      },
    });

    return user;
  },

  update: async (req) => {
    const user = await prisma.users.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...req.body,
      },
    });

    return user;
  },

  remove: async (req) => {
    const user = await prisma.users.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return user;
  },
};
