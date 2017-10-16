import { Character } from './character';
import { Monster } from './monster';



export class Encounter {
    name: string;
    characters: Array<Character>;
    monsters: Array<Monster>;
}
