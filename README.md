## Instructions

1. Make sure that you have Node.js v8.15.1, Docker and npm v5 or above installed.
2. Clone this repo using git clone https://github.com/StevanSlavnic/server.git <YOUR_PROJECT_NAME>
3. Move to the appropriate directory: cd <YOUR_PROJECT_NAME>.
4. Run in terminal 'docker-compose up -d'
5. After successfully building images, run in terminal 'sudo docker exec -it fs_node bash' to access Docker machine.
6. Run 'yarn install' in order to install dependencies.
7. At this point you can run 'yarn start' to see the app at 127.0.0.1:8093/api/docs/.
