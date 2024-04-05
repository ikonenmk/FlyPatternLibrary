echo "Switching to master branch.."
git checkout master

echo "Building app..."
npm run build

echo "Deploying project files to server..."
scp -r dist/* mkikonen@192.168.1.89:/var/www/90.230.180.226/

echo "Done."