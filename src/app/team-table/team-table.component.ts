import { TeamService } from './../services/team.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Countries } from '../interfaces/player.interface';
import { Team } from '../interfaces/team.interface';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss'],
})
export class TeamTableComponent implements OnInit {
  public teams$: Observable<Team[]>;
  public teamsTableHeaders = ['Name', 'Country', 'Players'];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams();
    this.teams$.subscribe(a => {
      console.log(a);
    });
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length === 0) {
          const team: Team = {
            name: 'MyAmazingTeam',
            country: Countries.Peru,
            players: null,
          };
          this.teamService.addTeam(team);
        }
      });
  }
}
