
import { Component, inject, OnInit, signal } from '@angular/core';
import { TeamsService } from '../../service/teams/teams-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './teams.html',
  styleUrls: ['./teams.css'],
})
export class Teams implements OnInit {
  teams = signal([] as any[]);
  token: string = '';
  showCreateTeamForm: boolean = false;
  newTeamName: string = '';
  private teamsService = inject(TeamsService);

  // // Getter חוקי ל־template
  // get teamsList() {
  //   return this.teams();
  // }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    if (this.token) {
      this.loadTeams();
    }
  }

  loadTeams() {
    this.teamsService.getTeams(this.token).subscribe({
      next: (data) => this.teams.set(data),
      error: (err) => console.error('Error loading teams', err)
    });
  }

  createTeam() {
    if (!this.newTeamName.trim()) return;

    this.teamsService.createTeam(this.newTeamName, this.token).subscribe({
      next: (team) => {
        this.teams.update(ts => [...ts, team]);
        this.newTeamName = '';
        this.showCreateTeamForm = false;
      },
      error: (err) => console.error('Error creating team', err)
    });
  }
}
