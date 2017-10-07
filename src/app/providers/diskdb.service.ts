import { Injectable } from '@angular/core';
import { remote } from 'electron';

import * as path from 'path';
import * as fs from 'fs';

const app = remote.app;
const diskdb = remote.require('diskdb');

@Injectable()
export class DiskDBService {
  db: any;

  constructor() {
    const dbPath = path.join(app.getPath('userData'), 'db');
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath);
    }
    this.db = diskdb.connect(dbPath);
  }

}
