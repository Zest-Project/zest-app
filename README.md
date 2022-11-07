# CS-348-Final-Project

Nutrition Analysis and Recipe Explorer CRUD app - final project for CS348 

# Clone zest directory

    => git clone https://github.com/Zest-Project/zest-app.git

# To run app locally: 

  In one terminal: 

    => cd client

    => npm install

    => npm start

  In another terminal:  

    => cd server

  create a new file ".env" in server directory and copy content from "Env File" on google docs into it

    => npm install

    => npm run dev 

  (runs nodemon so you don't have the retart the server with each change)



# To build and deploy

  Download heroku cli on your device (https://devcenter.heroku.com/articles/heroku-cli),
  Create a heroku account, connect your github and your heroku accounts, let me add you as contributor to the project, then:  

    => cd Zest

    => heroku login 

  (enter your email and heroku password when prompted to on the website)

    => git add .

    => git commit -am "commit message + pushing to heroku"

  if you create new env variables run: 

    => heroku config:set NEW_ENV_VARIABLE_NAME="new_env_variable_value" 

  or add using gui on the heroku website under settings for the app in config variables

  *To Deploy Automatically, from main branch run: 

    => git push origin main

  *To Deploy Manually:

  if on a branch run: 

    => git push heroku branchname:main 

  else 

    => git push heroku main
  
