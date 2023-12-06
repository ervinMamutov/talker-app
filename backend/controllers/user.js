import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import validateEmail from '../utilities/validateEmail.js';
import validatePassword from '../utilities/validatePassword.js';
import matchPasswords from '../utilities/matchPasswords.js';
import hashPassword from '../utilities/hashPassword.js';

const user = {
  register: async (req, res) => {
    try {
      const { name, image, email, password, rePassword } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({
          success: false,
          message: 'User already exist'
        });
      } else {
        if (
          !name ||
          !validateEmail(email) ||
          !validatePassword(password) ||
          !matchPasswords(password, rePassword)
        ) {
          return res.status(400).json({
            success: false,
            message: 'Please, fill in the fields correctly'
          });
        } else {
          const hashedPassword = hashPassword(password);
          const user = User.create({
            name,
            email,
            password: hashedPassword,
            image
          });
          return res.status(200).json({
            success: true,
            message: `User with ${email} created successfully`
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        err: err.message
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        const isValidPassword = await bcrypt.compare(
          password,
          userExist.password
        );

        if (isValidPassword) {
          const token = jwt.sign(
            { userExist: userExist },
            process.env.TOKEN_ACCESS_SECRET
          );

          res.cookie('_id', userExist._id, {
            secure: true,
            sameSite: false
          });

          res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: false
          });

          return res.status(201).json({
            success: true,
            message: `The user at ${email} has successfully logged in`,
            token,
            id: userExist._id
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        err: err.message
      });
    }
  },
  logout: async (req, res) => {
    res.clearCookie('token');
    res.clearCookie('id');

    return res.status(200).json({
      success: true,
      message: 'Session successfully closed'
    });
  }
};

export default user;
