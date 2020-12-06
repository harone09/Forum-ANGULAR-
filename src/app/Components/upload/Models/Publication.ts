import { DatePipe } from '@angular/common';

export interface Publication {
    id: number;
    date: Date;
    contenus: string;
    idUser: number;
    idClasse: number;
}