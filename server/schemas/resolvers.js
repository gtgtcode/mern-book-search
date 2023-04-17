const {
  getSingleUser,
  createUser,
  login,
  saveBook,
  deleteBook,
} = require("./controllers/user-controller");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await getSingleUser({ user: context.user });
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await createUser({ username, email, password });
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await login({ email, password });
      return user;
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await saveBook({
          user: context.user,
          body: bookData,
        });
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await deleteBook({
          user: context.user,
          params: { bookId },
        });
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
