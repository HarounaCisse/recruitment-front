import { Cv } from "./cv";

export class Competence {
  id:number;
  competence: string;
  cv: Cv;
  constructor(comptence: string){
    this.competence = comptence;
  }
}
