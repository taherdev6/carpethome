const dotenv = require('dotenv');
dotenv.config();

const Airtable = require('airtable-node');
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
})
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context, cb) => {
    const { cart } = JSON.parse(event.body);
    try {
      
        const result =  await Promise.all(
            cart.map(async (product, i) => {
              const productID = product.id.replace(product.size, '').replace(product.color, '')
              let dBProduct = await airtable.retrieve(productID);
              dBProduct = {...dBProduct.fields};
              return dBProduct.price
      
            } )
          )


      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (error) {


      return {
        statusCode: 404,
        body: `${error}`,
      };
    }
  
};