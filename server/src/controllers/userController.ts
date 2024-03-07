import { Request, Response, NextFunction } from 'express';
import DB from '../mysql/DB_Setup.js';
import { IUser } from '../models/userModel.js';
import { QueryError } from 'mysql2';



const userController = {

  // 1. Get All Users Record

  getAllUsers: async function (req: Request, res: Response, next: NextFunction) {
    let query: string = `SELECT * FROM users`;
    DB.query(query, (err: QueryError, result: IUser[]) => {
      if (err) throw err;
      const userArr = result;
      res.status(200).json({
        data: result
      });
    });
  },

  // 2. Get Single Record

  getUser: async function (req: Request, res: Response, next: NextFunction) {
    let query: string = `SELECT * FROM users WHERE id = ${req.params.id}`;
    DB.query(query, (err: QueryError, result: IUser[]) => {
      if (err) throw err;
      res.status(200).json({
        data: result
      });
    });
  },


  // 3. Create Single User Record (Admin Fn)

  createUser: async function (req: Request, res: Response, next: NextFunction) {
    let user: string = `INSERT INTO users (name, gender, age, email, password, passwordConfirm) VALUES ("${req.body.name}", "${req.body.gender}", ${req.body.age}, "${req.body.email}", "${req.body.password}", "${req.body.passwordConfirm}")`;
    DB.query(user, (err: QueryError, result: IUser[]) => {
      if (err) throw err;
      console.log(result);
      res.status(200).json({
        data: result
      });
    });
  },


  // 4. Update Single User Record (Users Fn)

  updateUser: async function (req: Request, res: Response, next: NextFunction) {
    let updateFields: any = Object.entries(req.body).map(([key, value]) => `${key} = '${value}'`).join(',');
    console.log(updateFields);
    let query: string = `UPDATE users SET ${updateFields} WHERE id = ${req.params.id}`;
    console.log(query);
    DB.query(query, (err: QueryError, result: IUser[]) => {
      if (err) throw err;
      console.log(result);
      res.status(200).json({
        data: result
      });
    });
  },


  // Delete User (Admin Fn)

  deleteUser: async function (req: Request, res: Response, next: NextFunction) {
    let query: string = `DELETE FROM users WHERE id = ${req.params.id}`;
    DB.query(query, (err: QueryError, result: IUser[]) => {
      if (err) throw err;
      res.status(200).json({
        data: null
      });
    });
  },

};


export default userController;