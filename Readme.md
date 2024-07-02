"Airbnb-Clone" </br>
Here is the details about this project....</br>
</br>
I'll complete this project in 3 different phase. Let me explain-; </br>
<br/>
<b>First Phase</b>

1. First of all, I've made the basic setup of the project. In which, I added these installation in main folder through terminal command prompt of VS Code. Were-; npm init -y, npm i express, npm i ejs, npm i mongoose, npm mongoose, npm i method override. And also install nodemon globally. I added the entire package to the "App.js" file, and require the final server setup. I also included mongoose url in my project from mongoose doc. So that it can connect with database file.
   </br>
2. After that, I added a folder named "Models", and created a file named "Listing.js". In which, I updated the schema of database such as-; Title, Description, Image, Price, Location and Country.
   </br>
3. Then I created a folder named "Init" and created a file whose name is "Data.js", where the whole data related to this clone is inside this file. {After that initlisation, cross checking the data in Mongoose through terminal.} After setting up the project, I created a file named "Index.js" in the same folder. I then exported the database(Data.js) into the "Index.js" file.
   </br>
4. After that, I created a folder named views and within it, a folder named "Listing" where I implemented the CRUD operations files. I also created a filed named "App.js", where I setup the route for the CRUD operations.
   </br>
5. After that, I linked all the CRUD operation routes through and EJS files, which is present inside the Listing folder.
