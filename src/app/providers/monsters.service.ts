import { Injectable } from '@angular/core';
import { DBService } from './db.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

import { Monster } from '../models/monster';

const cname = 'monsters';

@Injectable()
export class MonstersService {
  dataChange: BehaviorSubject<Monster[]> = new BehaviorSubject<Monster[]>([]);
  get data(): Monster[] { return this.dataChange.value; }

  constructor(
    private db: DBService
  ) {
    this.db.createCollection(cname);
    this.getAllMonsters();
  }

  newMonster(monster: Object = {}) {
    const copiedData = this.data.slice();
    copiedData.push(new Monster(monster));
    this.dataChange.next(copiedData);
  }

  // getMonsterById(id: string): Observable<Monster> {
  //   const result = this.db.findOne<Monster>(dbName, {'_id': id});
  //   return result.map((monster) => {
  //     return new Monster(monster);
  //   });
  // }

  getAllMonsters() {
    const copiedData = this.data.slice();
    console.time('findMonsters');
    this.db.find<Monster>(cname, {})
      .then((monsters) => {
        console.timeEnd('findMonsters');

        console.time('makeMonsters');
        monsters.forEach((monster) => {
          monster = new Monster(monster);
          copiedData.push(monster);
        });
        console.timeEnd('makeMonsters');
      })
      .then(() => {
        this.dataChange.next(copiedData);
      });
  }

  updateMonster(monster: Monster): Promise<Monster> {
    const query: any = {};
    if (monster._id) {
      query._id = monster._id;
    } else {
      query.name = monster.name;
    }
    return this.db.update(cname, query, monster);
  }
  // findMonsters(query: Object): Observable<Monster[]> {
  //   return this.db.find<Monster>(dbName, query)
  //     .map((monsters) => {
  //       return monsters.map((monster) => new Monster(monster));
  //     });
  // }

  // saveMonster(monster: Monster): Observable<Monster> {
  //   return this.db.save<Monster>(dbName, monster);
  // }
}
