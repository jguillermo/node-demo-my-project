## select firestore
para esto debes estar logueado en firebase https://console.firebase.google.com/
```bash
npm install -g firebase-tools

firebase --version

firebase login

firebase init
```

```bash
 ◯ Realtime Database: Configure a security rules file for Realtime Database and (optionally) pro
vision default instance
❯◯ Firestore: Configure security rules and indexes files for Firestore
 ◯ Functions: Configure a Cloud Functions directory and its files
 ◯ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 ◯ Hosting: Set up GitHub Action deploys
 ◯ Storage: Configure a security rules file for Cloud Storage
 ```
 - crear un proyecto nuevo en la pagina web de google "demo-my-project"
 - crear una base de datos de firestore
```bash
? Please select an option: (Use arrow keys)
❯ Use an existing project 
  Create a new project 
  Add Firebase to an existing Google Cloud Platform project 
  Don't set up a default project 
 ```
 ```bash
? Please select an option: (Use arrow keys)
? Please select an option: Use an existing project
❯  Using project fir-my-project-34254 (demo-my-project)
 ```