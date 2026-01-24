// import { Component, inject, OnInit, signal } from '@angular/core';
// import { TeamsService } from '../../service/teams/teams-service';
// import { FormsModule } from '@angular/forms';
// import { SignalValuePipe } from '../../pipes/json-to-array-pipe';

// @Component({
//   selector: 'app-teams',
//   imports: [FormsModule, SignalValuePipe],
//   templateUrl: './teams.html',
//   styleUrl: './teams.css',
// })
// export class Teams implements OnInit {
//   // teams: any[] = [];
//   teams = signal([] as any[]);
//   token: string = '';
//   showCreateTeamForm: boolean = false;
//   newTeamName: string = '';
//   private teamsService = inject(TeamsService);

// //count = signal(0);
//   ngOnInit(): void {
//     this.token = localStorage.getItem('token') || '';
//     if (this.token) {
//       this.loadTeams();
//     }
//   }

//   teamsArray: any[] = []; // Array רגיל ל־template

// loadTeams() {
//   this.teamsService.getTeams(this.token).subscribe({
//     next: (data) => {
//       this.teams.set(data);
//       this.teamsArray = data; // שימוש ב־array רגיל ל־@for
//     },
//     error: (err) => console.error('Error loading teams', err)
//   });
// }

// createTeam() {
//   if (!this.newTeamName.trim()) return;

//   this.teamsService.createTeam(this.newTeamName, this.token).subscribe({
//     next: (team) => {
//       this.teams.update(ts => [...ts, team]);
//       this.teamsArray.push(team); // עדכון array רגיל
//       this.newTeamName = '';
//       this.showCreateTeamForm = false;
//     },
//     error: (err) => console.error('Error creating team', err)
//   });
// }

// }

//=============================================================================
// import { Component, inject, OnInit, signal } from '@angular/core';
// import { TeamsService } from '../../service/teams/teams-service';
// import { FormsModule } from '@angular/forms';
// import { NgFor, NgIf } from '@angular/common';
// import { SignalValuePipe } from '../../pipes/json-to-array-pipe';

// @Component({
//   selector: 'app-teams',
//   standalone: true,
//   imports: [FormsModule, SignalValuePipe, NgFor, NgIf],
//   templateUrl: './teams.html',
//   styleUrls: ['./teams.css'], // תיקון
// })
// export class Teams implements OnInit {
//   teams = signal([] as any[]);
//   token: string = '';
//   showCreateTeamForm: boolean = false;
//   newTeamName: string = '';
//   private teamsService = inject(TeamsService);

//   ngOnInit(): void {
//     this.token = localStorage.getItem('token') || '';
//     if (this.token) {
//       this.loadTeams();
//     }
//   }

//   loadTeams() {
//     this.teamsService.getTeams(this.token).subscribe({
//       next: (data) => this.teams.set(data),
//       error: (err) => console.error('Error loading teams', err)
//     });
//   }

//   createTeam() {
//     if (!this.newTeamName.trim()) return;

//     this.teamsService.createTeam(this.newTeamName, this.token).subscribe({
//       next: (team) => {
//         this.teams.update(ts => [...ts, team]);
//         this.newTeamName = '';
//         this.showCreateTeamForm = false;
//       },
//       error: (err) => console.error('Error creating team', err)
//     });
//   }
// }
//=============================================================================
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
