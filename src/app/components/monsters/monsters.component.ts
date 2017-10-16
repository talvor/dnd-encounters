import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { MonstersService } from '../../providers/monsters.service';
import { IMonster, Monster } from '../../models/monster';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent implements OnInit {
  public displayedColumns = ['name', 'size', 'type', 'cr'];
  public dataSource: MonsterDataSource | any;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
     private monstersService: MonstersService
  ) {

  }

  ngOnInit() {
    console.log('monster.component ngOnInit');
    this.dataSource = new MonsterDataSource(this.monstersService, this.paginator, this.sort);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class MonsterDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: Monster[] = [];
  renderedData: Monster[] = [];

  constructor(
      private _monsterService: MonstersService,
      private _paginator: MatPaginator,
      private _sort: MatSort
  ) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<Monster[]> {
    const displayDataChanges = [
      this._monsterService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map((data) => {
      // Filter data
      this.filteredData = this._monsterService.data.slice().filter((item: Monster) => {
        const searchStr = (item.name + item.type).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;

    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Monster[]): Monster[] {
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'size': [propertyA, propertyB] = [a.size, b.size]; break;
        case 'type': [propertyA, propertyB] = [a.type, b.type]; break;
        case 'cr': [propertyA, propertyB] = [a.cr, b.cr]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
