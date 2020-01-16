const chatService = require("../Services/chatService");
const ChatController = {};
//signup user
ChatController.createUser = async (req, res) => {
  try {
    const { body } = req;
    const result = await chatService.createUserService(body);
    const token = result.generateAuthToken();
    res.status(200).send({ result, token });
  } catch (e) {
    res.status(400).send(e);
  }
};
ChatController.loginUser = async (req, res) => {
  try {
    const { body } = req;
    const user = await chatService.loginUserService(body);
    const token = await user.generateAuthToken();
    if (!user) {
      res.send("Please Enter Valid Email/Password");
    }
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};
ChatController.sendMessage = async (req, res) => {
  try {
    const { body } = req;
    const result = await chatService.messageService(body);
    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
};
ChatController.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send("Logged Out");
  } catch (e) {
    res.status(500).send();
  }
};
module.exports = ChatController;
