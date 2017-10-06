import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './app.material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { MenuComponent } from './components/menu/menu.component';
import { CharactersComponent } from './components/characters/characters.component';
import { MonstersComponent } from './components/monsters/monsters.component';
import { EncountersComponent } from './components/encounters/encounters.component';
import { EncounterRunnerComponent } from './components/encounter-runner/encounter-runner.component';

import { ElectronService } from './providers/electron.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CharactersComponent,
    MonstersComponent,
    EncountersComponent,
    EncounterRunnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  providers: [
    ElectronService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
