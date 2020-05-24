import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerService } from './../services/player.service';
import { Player } from '../interfaces/player.interface';
import { TeamService } from '../services/team.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit {
  public players$: Observable<Player[]>;
  public selectedPlayer: Player;
  public showModal = false;
  public playersTableHeaders = [
    'Name',
    'Last Name',
    'Position',
    'Weight',
    'Height',
    'Nationality',
    'Left Footed',
    'Actions',
  ];

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.players$ = this.playerService.getPlayers();
  }

  newPlayer() {
    this.showModal = true;
    this.selectedPlayer = null;
    setTimeout(() => {
      window.location.replace('#open-modal');
    }, 0);
  }

  editPlayer(player: Player) {
    this.selectedPlayer = { ...player };
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }

  deletePlayer($key: string) {
    this.teamService.getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        const moddifiedPlayers = teams[0].players
          ? teams[0].players.filter((p: any) => p.key !== $key)
          : teams[0].players;
        const formattedTeam = {
          ...teams[0],
          players: [...moddifiedPlayers],
        };
        this.playerService.deletePlayer($key);
        this.teamService.editTeam(formattedTeam);
      });
  }

  closeDialog() {
    this.showModal = false;
  }
}
