import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "./models/userModel.js";
import jwt from "jsonwebtoken";
import axios from "axios";

class Controller {
  async login(req, res) {
    const { email, password, remember } = req.body;
    if (!req.body) return res.sendStatus(400);
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.sendStatus(400);
      }
      // const validPassword = bcrypt.compareSync(password, user.password);
      // if (!validPassword) {
      //   return res.sendStatus(400);
      // }
      const token = remember
        ? jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
        : jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: "3h", // expires in 3 hours
          });
      res.send({ username: user.username, token });
    } catch (error) {}
  }


  async singUp(req, res) {
    const { username, email, password } = req.body;
    if (!req.body) return res.sendStatus(400);
    try {
      const createUser = await User.create({ username, email, password });

      const token = jwt.sign({ userId: createUser._id }, process.env.SECRET_KEY);
      res.send({ username, token });
    } catch (error) {}

  }

  async getUsers(req, res) {
    const { username } = req.body;
    try {
      const data = await User.findOne({ username });
      return res.json(data);
    } catch (error) {
      return res.sendStatus(400);
    }
  }

  async googleAuth(req, res) {
    const { body } = req;
    try {
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${body.access_token}`,
          },
        }
      );
      const obj = {
        sub: "114249347892654154458",
        name: "Luda mamka",
        given_name: "Luda",
        family_name: "mamka",
        picture:
          "https://lh3.googleusercontent.com/a/AEdFTp4XM5t3j4KhC8Lvhc37k7y9zWmsSuKnq-p_3mO4=s96-c",
        email: "ayzekmanduar@gmail.com",
        email_verified: true,
        locale: "ru",
      };
      const { email, name } = data;
      const findUser = await User.findOne({ email });
      if (!findUser) {
        const createUser = await User.create({ username: name, password: '1234', email });
        res.send({ username: name, token: body.access_token });
      } else {
        const token = jwt.sign({ userId: findUser._id }, process.env.SECRET_KEY);
        res.send({ username: findUser.username, token });
      }
    } catch (error) {}
  }
}

export default Controller;
