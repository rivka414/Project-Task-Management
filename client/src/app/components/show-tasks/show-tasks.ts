import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskDetails } from '../../service/taskDetails/task-details';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-tasks',
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './show-tasks.html',
  styleUrl: './show-tasks.css',
})
export class ShowTasks implements OnInit{
private route = inject(ActivatedRoute);
  private taskService = inject(TaskDetails);

  projectId = signal<string>('');
  tasks = signal<any[]>([]);
  
  // ניהול הטופס למשימה חדשה באמצעות אובייקט אחד
  newTask = signal({
    title: '',
    description: '',
    status: 'todo',
    priority: 'normal',
    dueDate: ''
  });

  showAddForm = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('projectId');
    if (id) {
      localStorage.setItem('currentProjectId', id);
      this.projectId.set(id);
      this.loadTasks();
    }
    
  }

  loadTasks() {
    this.taskService.getTasksByProject(this.projectId()).subscribe(data => {
      this.tasks.set(data);
    });
  }

  addTask() {
  const currentTask = this.newTask();

  // בדיקת חובה לכל השדות
  if (!currentTask.title.trim()) {
    this.errorMessage.set('נא להזין כותרת למשימה');
    return;
  }
  
  if (!currentTask.description.trim()) {
    this.errorMessage.set('נא להזין תיאור למשימה');
    return;
  }

  if (!currentTask.priority) {
    this.errorMessage.set('נא לבחור רמת עדיפות');
    return;
  }

  if (!currentTask.dueDate) {
    this.errorMessage.set('נא לבחור תאריך יעד');
    return;
  }

  // בדיקת תקינות תאריך (שלא עבר)
  const selectedDate = new Date(currentTask.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    this.errorMessage.set('תאריך היעד לא יכול להיות בעבר');
    return;
  }

  // אם הכל תקין - שליחה לשרת
  const payload = {
    ...currentTask,
    projectId: Number(this.projectId()),
    orderIndex: 0
  };

  this.taskService.createTask(payload).subscribe({
    next: () => {
      this.loadTasks();
      this.resetForm();
    },
    error: () => this.errorMessage.set('שגיאה בשמירת המשימה')
  });
}

  // עדכון סטטוס או עדיפות (PATCH)
  updateTaskField(taskId: string, field: string, value: string) {
    const updateData = { [field]: value };
    this.taskService.updateTask(taskId, updateData).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(taskId: string) {
    if (confirm('האם למחוק משימה זו?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.tasks.update(prev => prev.filter(t => t.id !== taskId));
      });
    }
  }

  resetForm() {
    this.newTask.set({
      title: '',
      description: '',
      status: 'todo',
      priority: 'normal',
      dueDate: ''
    });
    this.showAddForm.set(false);
    this.errorMessage.set(null);
  }
}