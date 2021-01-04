import { Cv } from "./cv";

export class Formation {
  etablissementId: number;
  etablissement: string;
  niveau: string;
  domaine: string;
  autreInformation: string;
  dateDebut: Date;
  dateFin: Date;
  cv: Cv;
}
