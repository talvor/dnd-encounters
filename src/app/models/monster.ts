import { ITrait, IAction } from './commonTypes';

export interface IMonster {
    name: string;
    size: string;
    type: string;
    ac: number;
    hp: number;
    hitDice: string;
    speed: string;
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    skill: string;
    resist?: string;
    immune?: string;
    conditionImmune: string;
    senses?: string;
    passive: number;
    languages: string;
    cr: number;
    traits?: ITrait[];
    actions?: IAction[];
    legendaryActions?: IAction[];
}

export class Monster {
    name: string;
    size: string;
    type: string;
    ac: number;
    hp: number;
    hitDice: string;
    speed: string;
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    skill: string;
    resist?: string;
    immune?: string;
    conditionImmune: string;
    senses?: string;
    passive: number;
    languages: string;
    cr: number;
    traits?: ITrait[];
    actions?: IAction[];
    legendaryActions?: IAction[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
