const dotenv = require('dotenv');
dotenv.config();

const firebase = require('firebase/compat/app')

exports.handler = async (event, context, cb) => {
   

     
 
    try {
      return {
        statusCode: 200,
        body: JSON.stringify(app),
      };
    } catch (error) {
      return {
        statusCode: 404,
        body: `${error}`,
      };
    }
};
