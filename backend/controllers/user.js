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
      const { email, password, rePassword } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({
          success: false,
          message: 'User already exist'
        });
      } else {
        if (
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
            email,
            password: hashedPassword
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
  login: async (req, res) => {},
  logout: async (req, res) => {}
};

export default user;
