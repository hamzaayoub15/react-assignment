const userModel = require("../Models/Users");
const messageModel = require("../Models/Messages");
const bcrypt = require("bcryptjs");

class ChatService {
  static async createUserService(body) {
    return await userModel.create(body);
  }
  static async loginUserService(body) {
    const user = await userModel.findOne({ userName: body.userName });
    const result = await bcrypt.compare(body.password, user.password);
    if (!result || !user) {
      return;
    }
    return user;
  }
  static async messageService(body) {
    return await messageModel.create(body);
  }
}
module.exports = ChatService;
