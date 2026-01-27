# TeamTasks - Angular Client

צד הלקוח של מערכת ניהול הצוותים והמשימות.  
פותח באמצעות **Angular 20** ומספק ממשק משתמש דינמי, מהיר ואינטואיטיבי לניהול פרויקטים בשיטת **Kanban / Task Board**.

---

## 🛠 טכנולוגיות וכלים

- **Framework:** Angular 20
- **State Management:** RxJS & Services
- **HTTP Client:** Angular HttpClient
- **Security:** JWT Authentication

---

## 📋 דרישות מערכת

- **Node.js:** גרסה 18 ומעלה
- **Angular CLI:** מותקן גלובלית
  ```bash
  npm install -g @angular/cli
Backend: שרת פעיל בכתובת:

http://localhost:3000
ללא השרת, האפליקציה לא תוכל למשוך נתונים

🚀 הוראות הרצה
התקנת חבילות
npm install
הרצת פרויקט הפיתוח
ng serve
האפליקציה תיפתח בכתובת:
http://localhost:4200

בנייה לייצור (Production)
ng build
🏗 מבנה המודולים באפליקציה
Auth Module
טיפול ברישום, התחברות ושמירת ה-Token ב-Local Storage

Teams Module
מסך ניהול צוותים (הצגת רשימה ויצירת צוות חדש)

Projects Module
ניהול פרויקטים תלויי הקשר של צוות

Tasks Module
ניהול המשימות (CRUD), לוח משימות, סינונים לפי פרויקט והוספת תגובות


Authorization: Bearer <your_jwt_token>
נקודות קצה מרכזיות בשימוש
POST /api/auth/login – התחברות

GET /api/teams – שליפת צוותים

GET /api/tasks?projectId=XXX – שליפת משימות לפי פרויקט

📝 דגשי פיתוח
Guards
השימוש ב-AuthGuard מונע גישה למסכי הניהול עבור משתמשים שאינם מחוברים

Models
כל ממשקי הנתונים (Interfaces) מוגדרים תחת תיקיית models
לצורך הבטחת Type-Safety
(Task, Team, Project, User)

Environment
ניתן לשנות את כתובת השרת בקובץ:

src/environments/environment.ts
