const dotenv = require('dotenv');
dotenv.config();

const projectEnvVars = [
    'DB_USERNAME',
    'DB_PASSWORD'
]
 
module.exports = function() {
    let undefEnvVars = new Array();
    projectEnvVars.forEach( envVar => {
        if (!process.env[envVar])
            undefEnvVars.push(envVar);
    });

    if (undefEnvVars.length > 0) {
        throw new Error(`environmental variable(s) ${undefEnvVars} were not defined`);
    }

}
