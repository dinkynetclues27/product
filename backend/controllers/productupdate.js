const { QueryTypes } = require('sequelize');
const sequelize = require('../database');
const productupdatedata = async(req,res)=>{
    const{
        product_id,
    }=req.params
    const{
        product_name,
        sku,
        variant_id,
        price,
        discount_percent,
        description        
        }=req.body

    try{
        await sequelize.query(
            `UPDATE pro_excel set
            product_name = '${product_name}',
            sku = '${sku}',
            variant_id= '${variant_id}',
            price = '${price}' ,
            discount_percent = ' ${discount_percent}',
            description = '${description}'
            where product_id = '${product_id}'`,
            {type: QueryTypes.UPDATE});
            res.status(200).json({message: "updated"});
    }catch(error){
        console.error(error);
    }
}
module.exports = productupdatedata;