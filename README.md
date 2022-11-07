# CS-348-Final-Project
final project for CS 348


# To run app locally: 

  cd client
  
  npm install
  
  npm start

  cd server
  
  create a new file ".env" in server directory and copy content from Env File on google docs into it
  
  npm install
  
  npm run dev
  

# to build and deploy

  download heroku cli on your device (https://devcenter.heroku.com/articles/heroku-cli), then run: 
  
  cd Zest
  
  heroku login (enter zest gmail email and heroku password from env file when prompted to on the website)
  
  git add .
  
  git commit -am "commit message + pushing to heroku"
  

  if on a branch run: 
  
  git push heroku branchname:main 
  
  else 
  
  git push heroku main
