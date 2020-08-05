const env = require('./environment');
const fs = require('fs');
const path = require('path');
module.exports = (app) => {
    app.locals.assetPath = function(filepath){
        if(env.name=='development')
        {
            return '/' + filepath;
        }
        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../rev-manifest.json')))[filepath];
    }
}