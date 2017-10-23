import { ITrait, IAction } from './commonTypes';
import { ObjectID } from 'tingodb';
import * as _ from 'lodash';

import { SourceService } from '../providers/source.service';

export class Monster {
    _id: ObjectID;
    name: string;
    size: string;
    type: string;
    source: string;
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

    constructor(values: any, sourceService?: SourceService) {
        if (!values.source && values.type ) {
            const parts = values.type.split(',');
            values.type = parts[0];
            values.source = sourceService ? sourceService.findAbbrevFromName(_.trim(parts[1])) : undefined;
        }

        Object.assign(this, values);
    }
}
