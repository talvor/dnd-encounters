import { Injectable } from '@angular/core';
import { DBService } from './db.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Character } from '../models/character';

const dbName = 'characters';

@Injectable()
export class CharactersService {

  constructor(
    private db: DBService
  ) {
    // db.loadCollection(dbName);
  }
}
