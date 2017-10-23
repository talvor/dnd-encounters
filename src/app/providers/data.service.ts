import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { remote } from 'electron';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';

// require.extensions['.txt'] = function (module, filename) {
//     module.exports = fs.readFileSync(filename, 'utf8');
// };

const app = remote.app;

@Injectable()
export class DataService {
    constructor() {
    }

    load(dataFile: string, cb: Function) {
        const dataPath = path.join(app.getAppPath(), 'data', dataFile);
        if (!fs.existsSync(dataPath)) {
            return cb(new Error(`data file ${dataFile} does not exist`));
        }

        const data = fs.readFileSync(dataPath, 'utf8');
        cb(null, data);
    }
}
