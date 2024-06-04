import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class UserController {

    private userRepository; // declare property userRepository

    constructor() {
        // Initialize userRepository in the constructor
        this.userRepository = AppDataSource.getRepository(User);
    }

    // NOTE : Arrow functions do not have their own "this" context and instead inherit the "this" from the surrounding context (in this case, the UserController instance)
    all = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const users = await this.userRepository.find();
            response.send(users);
        } catch (error) {
            console.log('An error occurred in fetching users:', error);
            response.status(500).send({ error: 'An error occurred in fetching users' });
        }
    }

    one =  async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = parseInt(request.params.id);

            const user = await this.userRepository.findOne({
                where: { id }
            });
    
            if (!user) return response.status(400).send("Unregistered user");
                
            response.send(user);
        } catch (error) {
            console.log('Error occurred in fetching user:', error);
            response.status(500).send({ error: 'An error occurred in fetching user' });
        }
    }

    save = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { firstName, lastName, mail, birthDate, pass } = request.body;
            console.log(request.body)

            const exists = await this.userRepository.findOne({ where: { mail }});

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
    
            const saved = await this.userRepository.save(user);
    
            response.status(201).send("Successful registration");
        } catch (error) {
            console.log('An error occurred in saving user:', error);
            response.status(500).send({ error: "An error occurred in saving user" });
        }
    }

    login = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user = await this.userRepository.findOneBy({mail : request.body.mail });

            if (!user) return response.status(400).send("Unknown email");

            const verifyPassword = await bcrypt.compare(request.body.password, user.password);
            if (!verifyPassword) return response.status(400).send("Incorrect password");

            const token = jwt.sign(
                {userId : user.id},
                process.env.PRIVATE_KEY,
                {expiresIn: '1h'}
            );

            response.cookie("token", token, {
                origin: "http://localhost:3000",
                maxAge: 3600000,
                httpOnly: true,
                //secure: true,
                sameSite: "Lax",
            })
            .cookie("authenticated", true, {
                origin: "http://localhost:3000",
                maxAge: 3600000,
                //secure: true,
                sameSite: "Lax",
            });
            response.json({ message: 'Login successful'});

        } catch (error) {
            response.status(500).json({ error: "An error occurred during login" });
        }
    }

    modify = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = parseInt(request.params.id);
            const { firstName, lastName, mail, birthDate } = request.body;

            let user = await this.userRepository.findOne({ where: { id }});

            if (!user) return response.status(400).send({ error: "Unknown user" });

            if (firstName) user.firstName = request.body.firstName;
            if (lastName) user.lastName = lastName;
            if (mail) user.mail = request.body.mail;
            if (birthDate) user.birthDate = request.body.birthDate;

            user = await this.userRepository.save(user);

            response.send(user);

        } catch (error) {   
            console.log('Error occurred in updating user:', error);
            response.status(500).send({ error: "An error occurred in updating user" });
        }
    }

    remove = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = parseInt(request.params.id);

            let userToRemove = await this.userRepository.findOneBy({ id });
    
            if (!userToRemove) {
                return "this user not exist";
            }
    
            await this.userRepository.remove(userToRemove)
    
            response.send('User successfully removed');
        } catch (error) {
            console.log('Error occurred in removing user:', error);
            response.status(500).send({ error: 'An error occurred in removing user' });
        }
    }
}