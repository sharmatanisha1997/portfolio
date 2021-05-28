Steps to run dev environment
```sh
git clone https://github.com/sharmatanisha1997/portfolio.git <DIR>
cd <DIR>
npm i
touch .env
cat <<EOT >> .env
SECRET=<YOUR_SECRET_KEY>
EMAIL_HOST=<EMAIL_HOST>
EMAIL_SERVICE=<EMAIL_SERVICE>
EMAIL_USERNAME=<EMAIL_USERNAME>
EMAIL_PASSWORD=<EMAIL_PASSWORD>
ENABLE_EMAILS=<boolean>
EOT
npm start
```

Run server at http://localhost:5000