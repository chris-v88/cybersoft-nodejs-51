import { Server } from 'socket.io';
import { tokenService } from '../../services/token.service';
import prisma from '../prisma/init.prisma';

const createKeyForSingleChat = (userId1, userId2) => {
  return [userId1, userId2].sort((x, y) => x - y).join('-');
};

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    /* options */
  });

  io.on('connection', (socket) => {
    socket.on('CREATE_ROOM', async (data, callback) => {
      const { targetUserIds, accessToken, name } = data;
      // console.log(`🔌 ~ initSocket ~ data:`, data);

      try {
        // @ts-ignore
        const { userId } = tokenService.verifyAccessToken(accessToken);

        const uniqueUserIds = Array.from(new Set([...targetUserIds, userId]));
        const countUser = uniqueUserIds.length;

        let chatGroup = null;
        let keyForChatOne = null;

        // nhóm chat 2 người
        if (countUser === 2) {
          const [userId1, userId2] = uniqueUserIds;
          keyForChatOne = createKeyForSingleChat(userId1, userId2);

          chatGroup = await prisma.chatGroups.findUnique({
            where: {
              keyForChatOne: keyForChatOne,
            },
          });

          if (!chatGroup) {
            // tạo transaction nếu có nhiều thao tác liên quan đến nhiều bảng
            chatGroup = await prisma.$transaction(async (tx) => {
              const chatGroupTransaction = await tx.chatGroups.create({
                data: {
                  keyForChatOne: keyForChatOne,
                  ownerId: userId,
                },
              });

              await tx.chatGroupMembers.createMany({
                data: [
                  {
                    chatGroupId: chatGroupTransaction.id,
                    userId: userId1,
                  },
                  {
                    chatGroupId: chatGroupTransaction.id,
                    userId: userId2,
                  },
                ],
              });

              return chatGroupTransaction;
            });
          }

          // bê này vô trong cái transaction
          // chatGroup = await prisma.chatGroups.create({
          //   data: {
          //     keyForChatOne: keyForChatOne,
          //     ownerId: userId,
          //     // cách 1 để tạo thành viên trong group
          //     // ChatGroupMembers: {
          //     //   create: [
          //     //     {
          //     //       userId: userId1,
          //     //     },
          //     //     {
          //     //       userId: userId2,
          //     //     },
          //     //   ],
          //     // },
          //   },
          // });

          // cách 2 để tạo thành viên trong group
          //   await prisma.chatGroupMembers.createMany({
          //     data: [
          //       {
          //         chatGroupId: chatGroup.id,
          //         userId: userId1,
          //       },
          //       {
          //         chatGroupId: chatGroup.id,
          //         userId: userId2,
          //       },
          //     ],
          //   });
          // }

          // đảm bảo chatGroup luôn có dữ liệu
          // đảm bảo chatGroup luôn có dữ liệu
          socket.join(`chat:${chatGroup.id}`);
          callback({
            status: 'success',
            data: {
              chatGroupId: chatGroup.id,
              userId,
              uniqueUserIds,
              keyForChatOne,
              type: 'single_chat',
            },
          });
          return;
        }

        // nhóm chat nhiều người -- toạ luôn chatgroup - không cần tìm kiếm nếu phòng này tạo rồi hay chưa
        // 1 ng có thể tạo nhiều nhóm chat: có cùng thành viên, có cùng tên
        // (hoặc unique cái tên như discord)
        // không ràng buộc người dùng tạo nhiều nhóm chat, thả cho người dùng muốn tạo nhiêu tạo
        chatGroup = await prisma.$transaction(async (tx) => {
          const chatGroupTransaction = await tx.chatGroups.create({
            data: {
              name: name,
              ownerId: userId,
            },
          });

          await tx.chatGroupMembers.createMany({
            data: uniqueUserIds.map((userId) => {
              return {
                chatGroupId: chatGroupTransaction.id,
                userId: userId,
              };
            }),
          });

          return chatGroupTransaction;
        });

        socket.join(`chat:${chatGroup.id}`);
        callback({
          status: 'success',
          data: {
            chatGroupId: chatGroup.id,
          },
        });
      } catch (error) {
        console.error('CREATE_ROOM Error:', error.message);
        // Send error response back to client
        if (callback) {
          callback({
            success: false,
            error: error.message,
            code: error.name, // 'TokenExpiredError', 'JsonWebTokenError', etc.
          });
        }

        // Optionally emit an error event to the client
        socket.emit('ERROR', {
          event: 'CREATE_ROOM',
          error: error.message,
          code: error.name,
        });
      }
    });

    socket.on('JOIN_ROOM', async (data, callback) => {
      try {
        const { chatGroupId, accessToken } = data; // Fixed typo: accesToken -> accessToken
        const { userId } = tokenService.verifyAccessToken(accessToken);

        socket.join(`chat:${chatGroupId}`);

        if (callback) {
          callback({
            status: 'success',
            data: {
              chatGroupId,
              userId,
            },
          });
        }
      } catch (error) {
        console.error('JOIN_ROOM Error:', error.message);

        if (callback) {
          callback({
            success: false,
            error: error.message,
            code: error.name,
          });
        }
      }
    });

    socket.on('SEND_MESSAGE', async (data, callback) => {
      try {
        const { message, accessToken, chatGroupId } = data;

        const { userId } = tokenService.verifyAccessToken(accessToken);

        const createdAt = new Date().toISOString();

        const newMessage = await prisma.chatMessages.create({
          data: {
            messageText: message,
            userIdSender: userId,
            chatGroupId: chatGroupId,
            createdAt: createdAt,
          },
        });

        io.to(`chat:${chatGroupId}`).emit('SEND_MESSAGE', {
          messageId: newMessage.id,
          messageText: newMessage.messageText,
          userIdSender: newMessage.userIdSender,
          chatGroupId: newMessage.chatGroupId,
          createdAt: newMessage.createdAt,
        });

        if (callback) {
          callback({
            status: 'success',
            data: newMessage,
          });
        }

        console.log(`SEND_MESSAGE`, data);
      } catch (error) {
        console.error('SEND_MESSAGE Error:', error.message);

        if (callback) {
          callback({
            success: false,
            error: error.message,
            code: error.name, // 'TokenExpiredError', 'JsonWebTokenError', etc.
          });
        }

        socket.emit('ERROR', {
          event: 'SEND_MESSAGE',
          error: error.message,
          code: error.name,
        });
      }
    });

    socket.on('LEAVE_ROOM', async (data) => {
      console.log(`LEAVE_ROOM`, data);
      const { chatGroupId } = data;
      socket.leave(`chat:${chatGroupId}`);
    });
  });
};
