const {QueryTypes} = require('sequelize');
const sequelize = require('../database');


const productfetch = async(req,res)=>{
    try{
        const fetchproduct = await sequelize.query(
            `SELECT p.product_id, p.product_name, p.sku, p.variant_id, p.price, p.discount_percent, p.description, c.category_name,(p.price * (1 - (p.discount_percent / 100))) AS discounted_price
             FROM pro_excel p 
             INNER JOIN cat c ON p.category_id = c.category_id`,
            { type: QueryTypes.SELECT }
        );
        res.status(200).json(fetchproduct);
        console.log(fetchproduct);
    }
    catch(error){   
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = productfetch;