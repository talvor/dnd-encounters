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

const app = remote.app;
const Db = remote.require('tingodb')().Db;

@Injectable()
export class DBService {
  db: any;

  constructor() {
    const dbPath = path.join(app.getPath('userData'), 'db');
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath);
    }
    this.db = new Db(dbPath, {});
  }

  createCollection(cname: string) {
    this.db.createCollection(cname);
  }
  insert<T> (cname: string, object: T): Promise<T> {
    const collection = this.db.collection(cname);

    return new Promise((resolve, reject) => {
      collection.insert(object, (err, result) => {
        if (err) {
          return reject(err);
        }
         return resolve(result);
      });
    });
  }

  save<T> (cname: string, object: T): Promise<T> {
    const collection = this.db.collection(cname);

    return new Promise((resolve, reject) => {
      collection.save(object, (err, result) => {
        if (err) {
          return reject(err);
        }
         return resolve(result);
      });
    });
  }

  find<T> (cname: string, query: object): Promise<T[]> {
    const collection = this.db.collection(cname);

    return new Promise((resolve, reject) => {
      collection.find(query).toArray((err, result) => {
        if (err) {
          return reject(err);
        }
          return resolve(result);
      });
    });
  }

  findOne<T> (cname: string, query: any): Promise<T> {
    const collection = this.db.collection(cname);

    return new Promise((resolve, reject) => {
      collection.findOne(query, (err, result) => {
        if (err) {
          return reject(err);
        }
          return resolve(result);
      });
    });
  }

  update<T> (cname: string, query: any, object: T): Promise<T> {
    const collection = this.db.collection(cname);

    return new Promise((resolve, reject) => {
      collection.update(query, object, (err, result) => {
        if (err) {
          return reject(err);
        }
          return resolve(result);
      });
    });
  }

  remove (cname: string, query): Promise<null> {
    const collection = this.db.collection(cname);

    return new Promise((resolve, reject) => {
      collection.remove(query, (err, result) => {
        if (err) {
          return reject(err);
        }
          return resolve(result);
      });
    });
  }
}
