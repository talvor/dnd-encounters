export interface ITrait {
    name: string;
    text: string[];
    attack?: IAttack;
}

export interface IAction {
    name: string;
    text: string[];
    attack?: IAttack;
}

export interface IAttack {
    name: string;
    attack?: number;
    damage: string;
}

