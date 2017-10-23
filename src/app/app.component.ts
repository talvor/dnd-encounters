import { Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { MonstersService } from './providers/monsters.service';
import { Monster } from './models/monster';
import { SourceService } from './providers/source.service';
// import { Source } from './models/source';
import { DataService } from './providers/data.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;
  appName = 'D&D Encounters';

  constructor(
    public electronService: ElectronService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private monsterService: MonstersService,
    private dataService: DataService,
    private sourceService: SourceService
  ) {
  }

  ngOnInit() {
    const name = this.appName;
    this.titleService.setTitle(this.appName);

    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this.title = event['title'];
      });
  }

  updateData() {
    this.dataService.load('bestiary.json', (err, data) => {
      data = JSON.parse(data);
      const monsters = data.compendium.monster;
      const updates = [];
      monsters.forEach(monster => {
        monster = new Monster(monster, this.sourceService);
        updates.push(this.monsterService.updateMonster(monster));
      });

      Promise.all(updates)
        .then((results) => {
          console.log(`Updated ${results.length} monsters`);
        });

    });
    // const monsterData = require('')
  }
}
