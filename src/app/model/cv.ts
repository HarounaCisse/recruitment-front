import { Experience } from './experience';
import { ExperienceLevel } from './experience-level.enum';
import { Formation } from './formation';
import { Langues } from './langues.enum';

export class Cv {
  id: number;
  title: string;
  experience: Experience;
  //formation: Formation;
  langues: Langues;
  experienceLevel: ExperienceLevel;
}
