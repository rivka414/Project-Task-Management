import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TeamsService } from '../../service/teams/teams-service';
import { TeamDetailsService } from '../../service/teamDetails/team-details';

@Component({
  selector: 'app-team-details',
  imports: [FormsModule, RouterLink],
  templateUrl: './team-details.html',
  styleUrl: './team-details.css',
})
export class TeamDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private teamsService = inject(TeamsService);
  private teamDetails = inject(TeamDetailsService);
  // משתנים לטופס יצירת פרויקט
  newProjectName = signal<string>('');
  newProjectDescription = signal<string>('');
  showCreateProjectForm = signal<boolean>(false);
 

  teamId = signal<string>('');
  projects = signal<any[]>([]);
  newMemberId = signal<string>('');

  ngOnInit() {
    // שליפת ה-ID מה-URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.teamId.set(id);
      this.loadProjects();
    }
  }

  loadProjects() {
    // כאן תשלחי את ה-teamId לשרת כדי לקבל רק את הפרויקטים שלו
    this.teamDetails.getProjectsByTeam(this.teamId()).subscribe({
      next: (data) => this.projects.set(data),
      error: (err) => console.error('שגיאה בטעינת פרויקטים', err)
    });
  }

  addMember() {
    if (!this.newMemberId().trim()) return;

    this.teamsService.addMemberToTeam(this.teamId(), this.newMemberId()).subscribe({
      next: () => {
        alert('החבר נוסף בהצלחה!');
        this.newMemberId.set('');
      },
      error: (err) => alert('שגיאה: וודא שה-ID תקין')
    });
  }

  

  createProject() {
    if (!this.newProjectName().trim()) return;

    this.teamDetails.createProject(
      this.newProjectName(),
      this.newProjectDescription(), // שליחת התיאור
      this.teamId()
    ).subscribe({
      next: (newProject) => {
        this.projects.update(allProjects => [...allProjects, newProject]);
        this.newProjectName.set('');
        this.newProjectDescription.set(''); // איפוס התיאור
        this.showCreateProjectForm.set(false);
      },
      error: (err) => alert('שגיאה ביצירת פרויקט')
    });
  }
}
