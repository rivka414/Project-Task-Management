import { Component, inject, OnInit, signal } from '@angular/core';
import { CommentsTaskService } from '../../service/comments/comments-task';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskDetails } from '../../service/taskDetails/task-details';

@Component({
  selector: 'app-comments-task',
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './comments-task.html',
  styleUrl: './comments-task.css',
})
export class CommentsTask implements OnInit{
private route = inject(ActivatedRoute);
  private commentsService = inject(CommentsTaskService);

  taskId = signal<string | null>(null);
  projectId = signal<string | null>(null); // נשלוף מ-localStorage
  comments = signal<any[]>([]);
  newCommentText = signal<string>('');
  isLoading = signal<boolean>(false);

  ngOnInit() {
 // 1. נסי לשלוף את ה-ID תחת השם 'id' (כמו שמוגדר ב-Routes)
  const idFromUrl = this.route.snapshot.paramMap.get('id');
  

  if (idFromUrl) {
    this.taskId.set(idFromUrl);
    this.loadComments();
  } else {
    console.error('שגיאה: לא נמצא taskId בכתובת ה-URL!');
  }

  // שליפת ה-projectId מהזיכרון לצורך חזרה
  const pId = localStorage.getItem('currentProjectId');
  if (pId) this.projectId.set(pId);

    this.loadComments();
  }

  loadComments(shouldScroll: boolean = false) {
    if (!this.taskId()) return;
    this.isLoading.set(true);
    
    this.commentsService.getComments(this.taskId()!).subscribe({
      next: (data) => {
        // אנחנו לא עושים reverse(), כדי שהחדש יהיה למטה
        this.comments.set(data);
        this.isLoading.set(false);

        // אם ביקשנו לגלול (אחרי שליחת הודעה)
        if (shouldScroll) {
          setTimeout(() => {
            this.scrollToBottom();
          }, 100); // השהייה קלה כדי לתת ל-DOM להתעדכן
        }
      },
      error: () => this.isLoading.set(false)
    });
  }

  sendComment() {
    const text = this.newCommentText().trim();
    if (!text || !this.taskId()) return;

    this.commentsService.addComment(this.taskId()!, text).subscribe({
      next: () => {
        this.newCommentText.set('');
        // קוראים לטעינה ומבקשים לגלול למטה
        this.loadComments(true); 
      }
    });
  }

  private scrollToBottom() {
    const element = document.getElementById('bottom-of-comments');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
  
}
