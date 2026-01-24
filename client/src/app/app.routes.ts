import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Teams } from './components/teams/teams';
import { guardComponentsGuard } from './guard/guard-components-guard';
import { Projects } from './components/projects/projects';
import { Tasks } from './components/tasks/tasks';
import { TeamDetails } from './components/team-details/team-details';
import { Using } from './components/using/using';
import { Problems } from './components/problems/problems';
import { ShowTasks } from './components/show-tasks/show-tasks';
import { CommentsTask } from './components/comments-task/comments-task';


export const routes: Routes = [
    //{path: '', component: Login },
    {path: 'login', component: Login},
    {path:'teams',component:Teams, canActivate: [guardComponentsGuard] },
    {path:'tasks',component:Tasks, canActivate: [guardComponentsGuard] },
    {path:'projects',component:Projects, canActivate: [guardComponentsGuard] },
    {path:'team-details/:id',component:TeamDetails, canActivate: [guardComponentsGuard] },
    {path:'using',component:Using, canActivate: [guardComponentsGuard] },
    {path:'problems',component:Problems, canActivate: [guardComponentsGuard] },
    {path:'show-tasks/:projectId',component:ShowTasks, canActivate: [guardComponentsGuard] },
    {path:'comments-task/:id',component:CommentsTask, canActivate: [guardComponentsGuard] },
    // {path:'**',component:Teams, canActivate: [guardComponentsGuard] }
    { path: '', redirectTo: 'login', pathMatch: 'full' },
 { path: '**', redirectTo: 'login' }
];
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}