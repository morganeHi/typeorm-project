import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from 'bcrypt'

export class UserController {

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
            response.send(users);
        } catch (error) {
            console.log('Error occurred in fetching users:', error);
            response.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id);

            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: { id }
            });
    
            if (!user) {
                return "unregistered user";
            }
            response.send(user);
        } catch (error) {
            console.log('Error occurred in fetching user:', error);
            response.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const { firstName, lastName, mail, birthDate, pass } = request.body;

            const userRepository = AppDataSource.getRepository(User);
            const exists = await userRepository.findOne({ where: { mail }});

            if (exists) return response.status(400).send({ error: 'User with this email already exists' });
              
            const inscriptionDate = new Date().toLocaleDateString("fr-CA", {year:"numeric", month: "2-digit", day:"2-digit"});
    
            const password = await bcrypt.hash(pass, 10);
    
            const user = Object.assign(new User(), {
                firstName,
                lastName,   
                mail,
                birthDate,
                inscriptionDate,
                password
            });
    
            const saved = await userRepository.save(user)
    
            response.status(201).send(saved);
        } catch (error) {
            console.log('Error occurred in saving user:', error);
            response.status(500).send({ error: error });
        }
    }

    async modify(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id);

            const userRepository = AppDataSource.getRepository(User);
            let user = await userRepository.findOne({ where: { id }});

            if (!user) return response.status(400).send({ error: "Unknown user" });

            if (request.body.firstName) user.firstName = request.body.firstName;
            if (request.body.lastName) user.lastName = request.body.lastName;
            if (request.body.mail) user.mail = request.body.mail;
            if (request.body.birthDate) user.birthDate = request.body.birthDate;

            user = await userRepository.save(user);

            response.send(user);

        } catch (error) {
            console.log('Error occurred in updating user:', error);
            response.status(500).send({ error: error });
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id);

            const userRepository = AppDataSource.getRepository(User);
            let userToRemove = await userRepository.findOneBy({ id });
    
            if (!userToRemove) {
                return "this user not exist";
            }
    
            await userRepository.remove(userToRemove)
    
            response.send('User successfully removed');
        } catch (error) {
            console.log('Error occurred in removing user:', error);
            response.status(500).send({ error: 'Internal Server Error' });
        }
    }

}