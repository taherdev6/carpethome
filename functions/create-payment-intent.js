require("dotenv").config();
const Moyasar = require("moyasar");
const moyasar = new Moyasar(process.env.REACT_APP_MOYASAR_SECRET_KEY);

const Airtable = require("airtable-node");
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
})
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

const base = new Airtable({ apiKey: process.env.AIRTABLE_SET_USER_INFO_PAT })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_USER_INFO_TABLE);
exports.handler = async function (event, context) {
  if (event.body) {
    const { id, status, message, amount, cart, shipping, email } = JSON.parse(
      event.body
    );

    const createRecord = async (fields) => {
      const createdRecord = await base.create(fields);
    };

    try {
      const data = await moyasar.payment.fetch(id);

      if (data.status !== "paid") {
        return {
          statusCode: 200,
          body: JSON.stringify({
            status: data.status,
            message: data.source.message,
          }),
        };
      }
      const purchaseID = data.id;
      const result = await Promise.all(
        cart.map(async (product, i) => {
          const productID = product.id
            .replace(product.size, "")
            .replace(product.color, "");
          let dBProduct = await airtable.retrieve(productID);
          dBProduct = { ...dBProduct.fields };

          let tempColor = product.color;
          if (tempColor.includes("brandypunch")) {
            tempColor = tempColor.replace("brandypunch", "bronze");
          }
          if (tempColor.includes("bondiblue")) {
            tempColor = tempColor.replace("bondiblue", "lightblue");
          }
          return {
            name: product.name,
            price: dBProduct.price / 100,
            size: product.size,
            quantity: product.amount,
            color: tempColor,
          };
        })
      );

      const { fullName } = shipping;
      const { phoneNumber } = shipping;
      console.log(result);
      const shipCart = result
        .map((product) => {
          return `Item 1: \n
          Name: ${
            product.name.slice(0, 1).toUpperCase() + product.name.slice(1)
          }\n
          Color: ${
            product.color.slice(0, 1).toUpperCase() + product.color.slice(1)
          }\n
          Size: ${
            product.size.slice(0, 1).toUpperCase() + product.size.slice(1)
          }\n
          Quantity: ${product.quantity}\n
          Price: ${product.price} SAR\n
          `;
        })
        .join("\n\n");
      const totalPrice = result.reduce(
        (acc, product) => acc + product.price,
        0
      );

      createRecord({
        fields: {
          name: fullName,
          phonenumber: Number(phoneNumber),
          status: "success",
          cart: shipCart,
          email: email,
          totalprice: totalPrice,
        },
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          status: " successful",
          message: "",
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: error.message,
        }),
      };
    }
  }

  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
