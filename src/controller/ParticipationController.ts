import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Participation } from "../entity/Participation";

export class ParticipationController {

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const participationRepository = AppDataSource.getRepository(Participation);
            const participations = await participationRepository.find();
            response.send(participations);
        } catch (error) {
            console.log('An error occurred in fetching users:', error);
            response.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const { won, user, prize } = request.body;
            const date = new Date().toLocaleDateString("fr-CA", {year:"numeric", month: "2-digit", day:"2-digit"});
           // const user =  // retrieve with jwt middleware

           const participation = Object.assign(new Participation(), {
                date,
                won,
                prize,
                user
           });

           const participationRepository = AppDataSource.getRepository(Participation);
           const saved = await participationRepository.save(participation);

           response.status(201).send(saved);
        } catch (error) {
            console.log('An error occurred in saving participation:', error);
            response.status(500).send({ error: error });
        }
    }
}