import { RequestHandler } from "express";
import User from "../models/user";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const user = User.build({});
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.phone = req.body.phone;
    const result = await user.save();

    res.status(201).json({ result: result, message: "Create user successfully." });
  } catch (err) {
    //throw err;
    res.status(400).json({ result: "", message: "Create user failed.", error: err });
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await User.findAll();
    res.status(200).json({ result, message: "" });
  } catch (err) {
    res.status(400).json({ result: "", message: "Get users failed.", error: err });
  }
};

export const updateUser: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const user = await User.findByPk(id);
    if (user) {
      user.name = req.body.name || user.name;
      user.password = req.body.password || user.password;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      const result = await user.save();
      res.status(200).json({ result, message: "Update user successfully." });
    } else {
      res.status(404).json({ result: "", message: "User not found." });
    }  
  } catch (err) {
    //throw err; 
    res.status(400).json({ result: "", message: "Update user failed.", error: err });
  }
};

export const deleteUser: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const user = await User.findByPk(id);
    if (user) {
      const result = await user.destroy();
      res.status(200).json({ result, message: "Delete user successfully." });
    } else {
      res.status(404).json({ result: "", message: "User not found." });
    }  
  } catch (err) {
    res.status(400).json({ result: "", message: "Delete user failed.", error: err });
  }
};
