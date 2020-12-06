import { Publication } from "../Models/Publication";

export const ListPublication: Publication[] = [
    { id: 1, date: new Date(), contenus: "this is the first publication.", idUser: 1, idClasse: 1 },
    { id: 2, date: new Date(), contenus: "this is the second publication.", idUser: 1, idClasse: 1 },
    { id: 3, date: new Date(), contenus: "this is the third publication.", idUser: 2, idClasse: 1 },
    { id: 4, date: new Date(), contenus: "this is the fourth publication.", idUser: 3, idClasse: 2 },
    { id: 5, date: new Date(), contenus: "this is the fifth publication.", idUser: 3, idClasse: 3 },
    { id: 6, date: new Date(), contenus: "this is the sixth publication.", idUser: 3, idClasse: 4 },
    { id: 7, date: new Date(), contenus: "this is the seventh publication.", idUser: 1, idClasse: 5 },
    { id: 8, date: new Date(), contenus: "this is the eightth publication.", idUser: 4, idClasse: 5 }

]