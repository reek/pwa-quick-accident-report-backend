## Deploy on Heroku

- Create account on Heroku
- Download and install heroku CLI
- Put your project on GIT
- Be sure no modifications are pending
- On your project root execute command `heroku login`
- On your project root execute command `heroku create`
- On Heroku dashboard go to your project settings
- Add nodejs as Buildpack
- Add your env variable
- On your project root execute command `git remote add heroku [heroku git url]`
- Execute `npm run deploy`
