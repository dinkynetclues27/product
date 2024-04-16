const { QueryTypes } = require('sequelize');
const sequelize = require('../database');

const deleteProduct = async (req, res) => {
    try {

        const product_id = req.params.product_id; 
        
        const product = await sequelize.query(
            `SELECT * FROM pro_excel WHERE product_id = :product_id`,
            {
                replacements: { product_id },
                type: QueryTypes.SELECT
            }
        );

        if (!product.length) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await sequelize.query(
            `DELETE FROM pro_excel WHERE product_id = :product_id`,
            {
                replacements: { product_id },
                type: QueryTypes.DELETE
            }
        );

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = deleteProduct;
