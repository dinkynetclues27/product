    const XLSX = require('xlsx');
    const sequelize = require('../database');

    const productexport = async (req, res) => {
        try {
            
            const data = await sequelize.query(`
                SELECT p.product_name, c.category_name, p.sku, p.price, p.discount_percent
                FROM pro_excel p
                JOIN cat c ON p.category_id = c.category_id
            `, { type: sequelize.QueryTypes.SELECT });

       
            const formattedData = data.map(row => {
                const discountedPrice = row.price * (1 - row.discount_percent / 100);
                return {
                    product_name: row.product_name,
                    category_name: row.category_name,
                    sku: row.sku,
                    price: row.price,
                    discounted_price: discountedPrice
                };
            });

          
            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      
            const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
            res.setHeader('Content-Disposition', 'attachment; filename="updated_file.xlsx"');
            res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.send(buffer);
        } catch (error) {
            console.error('Error exporting data:', error);
            res.status(500).json({ error: 'Error exporting data' });
        }
    };

  module.exports = productexport;
