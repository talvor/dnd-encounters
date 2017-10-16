import { Injectable } from '@angular/core';
import { DBService } from './db.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Encounter } from '../models/encounter';

const dbName = 'encounter';

@Injectable()
export class EncountersService {

  constructor(
    private db: DBService
  ) {
    // db.loadCollection(dbName);
  }
}
