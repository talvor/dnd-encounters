import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharactersComponent } from './components/characters/characters.component';
import { MonstersComponent } from './components/monsters/monsters.component';
import { EncountersComponent } from './components/encounters/encounters.component';
import { EncounterRunnerComponent } from './components/encounter-runner/encounter-runner.component';

const routes: Routes = [
    { path: '', redirectTo: '/characters', pathMatch: 'full'},
    { path: 'characters', component: CharactersComponent, data: {title: 'Characters'} },
    { path: 'monsters', component: MonstersComponent, data: {title: 'Monsters'} },
    { path: 'encounters', component: EncountersComponent, data: {title: 'Encounters'} },
    { path: 'runner', component: EncounterRunnerComponent, data: {title: 'Encounter Runner'} }  
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
