import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Participation } from "../entity/Participation";

export class ParticipationController {

    private participationRepository;

    constructor() {
        this.participationRepository = AppDataSource.getRepository(Participation);
    }

    all = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const participations = await this.participationRepository.find();
            response.send(participations);
        } catch (error) {
            console.log('An error occurred in fetching users participations:', error);
            response.status(500).send({ error: 'Internal Server Error' });
        }
    }

    one = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const participations = await this.participationRepository.findBy({user: request.user.userId});
            response.send(participations);
        } catch (error) {
            console.log("An error occurred in fetching user's participations: ", error);
            response.status(500).send({ error: "An error occurred in fetching user's participations" });
        }
    }

    save = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const { won } = request.body;
            const date = new Date().toLocaleDateString("fr-CA", {year:"numeric", month: "2-digit", day:"2-digit"});
            const user =  request.user.userId;
            const prizes = [
                "Gift card",
                "Wireless headphones",
                "Coffee mug",
                "Movie tickets",
                "Board game"
            ];

            let prize = null;

            if (won) prize = prizes[Math.floor(prizes.length * Math.random())];
                
            const participation = Object.assign(new Participation(), {
                date,
                won,
                prize,
                user
            });

            const saved = await this.participationRepository.save(participation);

            response.status(201).send(saved);
        } catch (error) {
            console.log('An error occurred in saving participation:', error);
            response.status(500).send('An error occurred in saving participation');
        }
    }
}