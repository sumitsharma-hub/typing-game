import { NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { type ILogin, type IRegister } from "../interfaces/login";
import { type ITokenDetail, type IUser, type IUserDetail } from "../interfaces/user";
import { AccountService, GoogleLoginService } from "../services";
import { loginSchema, registerSchema } from "../validators";
import axios from "axios";
import mongoose from "mongoose";
import { signToken } from "../utils";
import { log } from "console";
import { access } from "fs/promises";

const accountService = new AccountService();
const googleLoginService = new GoogleLoginService();

export default class AccountController {
  async login(request: Request, response: Response): Promise<Response> {
    try {
      const validatedData: ILogin = await loginSchema.validateAsync(request.body);
      const data: ITokenDetail | null = await accountService.performLogin(validatedData);

      if (data === null) {
        return response.status(401).json({ detail: "Invalid credentials!" });
      }
      return response.status(201).json(data);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async detail(request: Request, response: Response): Promise<Response> {
    if (request.user === undefined) {
      return response.status(401).json({ detail: "Unauthorized" });
    }
    const data: IUserDetail = await accountService.retrieveDetails(request.user);
    return response.status(200).json(data);
  }

  async logout(request: Request, response: Response): Promise<Response> {
    if (request.user === undefined) {
      return response.status(401).json({ detail: "Unauthorized" });
    }
    const data: Record<string, unknown> = await accountService.performLogout(request.user);
    response.clearCookie("UserToken");
    return response.status(204).json(data);
  }

  async register(request: Request, response: Response) {
    try {
      const validatedData: IRegister = await registerSchema.validateAsync(request.body);
      if (validatedData.password !== validatedData.confirmPassword) {
        return response.status(400).json("password does match");
      }
      delete validatedData.confirmPassword;
      const newUser: IUser | null = await accountService.performRegisteration(validatedData);
      console.log(newUser,'========>')
      if (newUser === null) return response.status(400).json({ detail: "Already registered!" });
      delete newUser.password;
      return response.status(201).json(newUser);
    } catch (error) {
      console.log('this is not working')
      return response.status(400).json(error);
    }
  }



  
}
