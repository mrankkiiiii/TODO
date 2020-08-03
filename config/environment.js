const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const { gzip } = require('zlib');
const { Console } = require('console');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',  {
    interval: '1d',
    size: '10M',
    compress: 'gzip',
    path: logDirectory,
});

const development = {
    name:'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'todo_development',
    // smtp: {
    //     service: 'gmail',
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user:'agarg2311@gmail.com',//enter user
    //         pass:'user password'//enter password
    //     }
    // },
    google_client_id: "819487855328-dmv8055coaf1idfss8raviafjbn7b2v9.apps.googleusercontent.com",
    google_client_secret: "6zL2uDei2TArFKUBiNc5zkZl",
    google_callback_url: "http://localhost:8000/user/auth/google/callback",

    github_client_id: "fd1ffee9ac93b0aa1d8a",
    github_client_secret: "56d754e59d1e7325d3e7de40a19be96b3c8f9d6e",
    github_callback_url: "http://localhost:8000/user/auth/github/callback",

    facebook_client_id: "326669651806473",
    facebook_client_secret: "0d09e2e046eb0b17dcf3efa334499142",
    facebook_callback_url: "http://localhost:8000/user/auth/facebook/callback",
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream},
    }
}

const production = {
    name:'production',
    asset_path: process.env.TODO_ASSET_PATH,
    session_cookie_key: process.env.TODO_SESSION_COOKIE_KEY,
    db: process.env.TODO_DB,
    // smtp: {
    //     service: 'gmail',
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: process.env.CODEIAL_GMAIL_USERNAME,
    //         pass: process.env.CODEIAL_GMAIL_PASSWORD
    //     }
    // },
    google_client_id: process.env.TODO_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.TODO_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.TODO_GOOGLE_CALLBACK_URL,

    github_client_id: process.env.TODO_GITHUB_CLIENT_ID,
    github_client_secret: process.env.TODO_GITHUB_CLIENT_SECRET,
    github_callback_url: process.env.TODO_GITHUB_CALLBACK_URL,

    facebook_client_id: process.env.TODO_FACEBOOK_CLIENT_ID,
    facebook_client_secret: process.env.TODO_FACEBOOK_CLIENT_SECRET,
    facebook_callback_url: process.env.TODO_FACEBOOK_CALLBACK_URL,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);