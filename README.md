# LINFO1212_Projet_Final
## LOUEvain-Li-Nux
\
![Louvain-Li-Nux](public/favicon.ico) 

---
            Groupe PF12

        Pedro Miguel Da Silva Matos
        El Hariri Nouha
        Emile Villette
---
**[Github Link](https://github.com/Emilevillette/LINFO1212-2022-12)**

**How to run the website:**

Firstly, make sure that Node JS is installed in your machine, here's a link to download it if needed [Download Node JS page](https://nodejs.org/en/download/) \
Then, you'll go to a terminal and enter `npm install`. With that you can now enter in that same terminal `node init_database` and then `node app`. \
When all the previous tasks are done you can access our website [LOUEvain-Li-Nux](https://localhost:8080/)

**IMPORTANT**: To access the admin part of the website, head to [https://localhost:8080/](https://localhost:8080/), and press `CTRL+A+L`

If you initialized the database like mentioned before, a super-admin account has been created:
- Username: `admin@louvainlinux.org`
- Password: `supersecurepwd`


**Composition of files:**

Here's a briefly explanation of the files of our project:
- test: 
  - All Tests. 
  - _To access read the Testing section_
- views: 
  - EJS pages
- specificaitons:
  - Features' description
- scripts: 
  - Functions used in the app.js
- models: 
  - Database related files in sequelize
- public: Endpoint accessible by the user 
  - Images
  - Stylesheets 
  - Js scripts
- config:
  - database configuration


**Testing:**

To test our functions go to a terminal and enter `npm test`. \
**Warning !! `npm install` must be done before the testing!!**