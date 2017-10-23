import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class SourceService {
  private abbrevToName = {
    MM: "Monster Manual",
    VG: "Volo's Guide",
    EE: "Elemental Evil",
    ToD: "Tyranny of Dragons",
    SKT: "Storm Kings Thunder",
    OotA: "Out of the Abyss",
    CoS: "Curse of Strahd"
  };

  private nameToAbbrev = {};

  constructor(  ) {
    _.forEach(this.abbrevToName, (value, key) => {
      this.nameToAbbrev[value.toLowerCase()] = key;
    });
  }

  findAbbrevFromName(name: string): string {
    const abbrev = this.nameToAbbrev[name.toLowerCase()];
    if (!abbrev) {
      console.log(`Missing source ${name}`);
    }

    return abbrev;
  }

  findNameFromAbbrev(abbrev: string): string {
    return this.abbrevToName[abbrev];
  }
}
