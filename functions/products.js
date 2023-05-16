const dotenv = require('dotenv');
dotenv.config();

const Airtable = require('airtable-node');
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
})
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context, cb) => {
  try {
    const response = await airtable.list({ maxRecords: 200 });

    const products = response.records.map((product) => {
      const { id, fields } = product;
      const {
        name,
        featured,
        price,
        colors,
        fabric,
        description,
        category,
        shipping,
        images,
        multicolor,
        pinksmallstock,
        pinklargestock,

        whitesmallstock,
        whitelargestock,

        brandypunchsmallstock,
        brandypunchlargestock,

        graysmallstock,
        graylargestock,

        brownsmallstock,
        brownlargestock,

        creamsmallstock,
        creamlargestock,

        bluesmallstock,
        bluelargestock,

        greensmallstock,
        greenlargestock,

        blacksmallstock,
        blacklargestock,

        bondibluesmallstock,
        bondibluelargestock,

        greenandbrandypunchsmallstock,
        greenandbrandypunchlargestock,

        grayandbluesmallstock,
        grayandbluelargestock,

        blueandbrandypunchsmallstock,
        blueandbrandypunchlargestock,
      } = fields;
      const { url } = images[0];
      return {
        id,
        featured,
        name,
        price,
        colors,
        fabric,
        description,
        category,
        shipping,
        image: url,
        multicolor,
        pinksmallstock,
        pinklargestock,

        whitesmallstock,
        whitelargestock,

        brandypunchsmallstock,
        brandypunchlargestock,

        graysmallstock,
        graylargestock,

        brownsmallstock,
        brownlargestock,

        creamsmallstock,
        creamlargestock,

        bluesmallstock,
        bluelargestock,

        greensmallstock,
        greenlargestock,

        blacksmallstock,
        blacklargestock,

        bondibluesmallstock,
        bondibluelargestock,

        greenandbrandypunchsmallstock,
        greenandbrandypunchlargestock,

        grayandbluesmallstock,
        grayandbluelargestock,

        blueandbrandypunchsmallstock,
        blueandbrandypunchlargestock,
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error Retrieving Products',
    };
  }
};
