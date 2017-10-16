import { Component, OnInit } from '@angular/core';
import { EncountersService } from '../../providers/encounters.service';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.css']
})
export class EncountersComponent implements OnInit {

  constructor(
    private encountersService: EncountersService
  ) { }

  ngOnInit() {
  }

}
