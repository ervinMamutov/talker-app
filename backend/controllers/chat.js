import Chat from '../models/chat.js';
import User from '../models/user.js';
import exp from 'constants';

const chat = {
  new: async (req, res) => {
    try {
      const { userId } = req.body;

      const isChat = await Chat.find({
        isGroupChat: false,
        $and: [{ users: { $elemMatch: { $eq: req.userId } } }]
      })
        .populate('user', '-password')

        .populate({
          path: 'latestMessage',
          populate: {
            path: 'sender',
            select: 'name, pic, email'
          }
        })
        .exec();

      if (isChat && isChat.length > 0) {
        res.status(400).json({
          success: false,
          message: 'The chat room already exist',
          chatRoom: isChat[0]
        });
      } else {
        const data = {
          chatName: 'sender',
          isGroupChat: false,
          users: [userId]
        };

        console.log('Data before creating chat:', data);

        const createdChat = await Chat.create(data);

        const fullChat = await Chat.findOne({
          _id: createdChat._id
        }).populate('users', '-password');

        res.status(201).json({
          success: true,
          message: 'The new chat room has been successfully created',
          chatRoom: fullChat
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message || 'The new chat no created'
      });
    }
  },
  getChats: async (req, res) => {
    try {
      const { userId } = req.body;
      const chatsFind = await Chat.find({
        users: { $elemMatch: { $eq: userId } }
      })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate('latestMessage')
        .sort({ updateAt: -1 })
        .exec();

      if (!chatsFind || !chatsFind.length > 0) {
        res.status(400).json({
          success: false,
          message: `User's chats not found`
        });
      } else {
        res.status(200).json({
          success: true,
          chatsFind
        });
        console.log(chatsFind);
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message || 'The Chats not found'
      });
    }
  },
  group: async (req, res) => {
    try {
      const { name, userId } = req.body;
      const adminId = req.cookies._id;
      userId.push(adminId);
      console.log(userId);

      if (!name || !userId) {
        return res.status(400).json({
          success: false,
          message: 'Please fill in all the fields'
        });
      }

      if (userId.length < 2) {
        return res.status(400).json({
          success: true,
          message: 'There must be at least 3 participants in a group chat room'
        });
      }

      const existingGroupChat = await Chat.findOne({
        isGroupChat: true,
        chatName: name
      });

      if (existingGroupChat) {
        return res.status(400).json({
          success: false,
          message: `This group chat ${name} already exist`
        });
      } else {
        const data = {
          chatName: name,
          users: userId,
          isGroupChat: true,
          groupAdmin: adminId
        };

        console.log('Data before creating chat:', { data });

        const createChat = await Chat.create(data);

        const groupChat = await Chat.findOne({
          _id: createChat._id
        })
          .populate('users', '-password')
          .populate('groupAdmin', '-password');

        res.status(201).json({
          success: true,
          groupChat: groupChat
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message || 'The Group Chat not created'
      });
    }
  },
  rename: async (req, res) => {},
  delete: async (req, res) => {},
  add: async (req, res) => {}
};

export default chat;
