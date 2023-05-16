require('dotenv').config();
const Moyasar = require('moyasar');
const moyasar = new Moyasar('sk_test_AZCUdcR3NUd8EZMEGsdEcHweEEDKQPMF2KV5MbBu')

const Airtable = require('airtable-node');
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
})
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);
exports.handler = async function (event, context) {
  if (event.body) {
    const { id, status, message, amount, cart, shipping } = JSON.parse(event.body);
    
    

    try {

      
      const data = await moyasar.payment.fetch(id)
      const purchaseID = data.id
      const result =  await Promise.all(
        cart.map(async (product, i) => {
          const productID = product.id.replace(product.size, '').replace(product.color, '')
          let dBProduct = await airtable.retrieve(productID);
          dBProduct = {...dBProduct.fields};
          if(dBProduct.price === Number(product.price) && dBProduct[`${product.color}${product.size}stock`] >= product.amount){ 
            return true
            
          }
          else return false
  
        } )
      )

      if(!result.includes(false) && data.status === 'paid' && data.currency === 'SAR')
      {
        const{ fullName}= shipping;
        const {phoneNumber }= shipping;
        const shipCart = cart.map(product => {
          return `${product.name}${product.color}${product.size}${product.amount}`
        }).join(' ')

    const base = new Airtable({apiKey: process.env.AIRTABLE_SET_USER_INFO_PAT}).base(process.env.AIRTABLE_BASE).table(process.env.AIRTABLE_USER_INFO_TABLE)
      
    const createRecord = async (fields) => {
      const createdRecord = await base.create(fields);
    }

    createRecord({
      'fields' : {
        "name": fullName,
        "phonenumber": Number(phoneNumber),
        "status": "success",
        "cart":shipCart,
        "purchaseid":purchaseID
      }
      
    })
  
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            status:' successful!',
            message:''
          }),
        };
      }
      if(result.includes(false) && data.status === 'paid' && data.currency === 'SAR') {
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            status:'failed',
            message:'Cart Data Not Matching'
          }),
        }
      }
       
      else{
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            status:data.status,
            message:data.source.message
          }),
        }
        
      }
      
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          msg:error.message
         }),
      };
    }
  }

  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  };
};
