const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')
const User = require('../../models/User');

dotenv.config()

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      try {
        const newUser = await User.create({ username, email, password });
        return newUser;
      } catch (error) {
        throw new Error(error);
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email })
        if(!user) {
          throw new UserInputError('User not found', {
            errors: {
              email: {
                email: 'User not found',
              },
            }
          })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
          throw new UserInputError('Password is incorrect', {
            errors: {
              password: 'Password is incorrect'
            },
          })
        }

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        )

        return {
          ...user.toJSON(),
          id: user.id,
          token,
        }

      } catch (error) {
        throw new Error(error)
      }
    },

    updateUser: async (_, { id, username, email, password }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { username, email, password },
          { new: true }
        );
        return updatedUser;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = resolvers;
