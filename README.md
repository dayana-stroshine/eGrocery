# eGrocery

This is the eGrocery web app! To view, please visit `http://ec2-18-216-213-10.us-east-2.compute.amazonaws.com:4100/`.

## Building App for Local Development

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Building App for Running on Remote Server

1. Run `ng build --prod`.

2. After this finishes running, check that the web app looks as expected locally by running `node server.js`. Navigate to `http://localhost:4100/`.

3. If it looks as expected, push the change to remote repository by commiting changes and running `git push`.

4. Next ssh onto the remote server and connect to VPN. Navigate to project folder. Run `git pull` to pull down all the changes that were just pushed to the remote repository.

5. After all the changes have been pulled, do a quick test of the app by running `node server.js` and then navigate to for example `http://ec2-18-216-213-10.us-east-2.compute.amazonaws.com:4100/`. Make sure no other node processes are running before running that command.

6. If the app looks as expected, stop the node process by running the keyboard command `ctrl + c`.

7. Run `forever start server.js` to have the app run continuously. 

## Acknowledgements

The authentication using JSON Web Tokens was inspired by:
“Anuglar Node MySQL - Login System” YouTube, uploaded by Jon Peppinck, 4 July, 2020.
https://www.youtube.com/watch?v=NUHHbzau_9M&list=PL9_OU-1M9E_sjaUPfH3FIp8GtJrhJhTb8

