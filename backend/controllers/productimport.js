const XLSX = require('xlsx');
const sequelize = require('../database')
const nodemailer = require('nodemailer'); 
const cron = require('node-cron');
const { sendMail } = require('./mail');


const productimport =  async(req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
    
    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    try {
        await sequelize.sync();
        // const result = await sequelize.query('INSERT INTO pro_excel (product_id, product_name, sku, variant_id, price, discount_percent, description, category_id) VALUES ?', {
        //     replacements: [data.map(row => [row.product_id, row.product_name, row.sku, row.variant_id, row.price, row.discount_percent, row.description, row.category_id])],
        //     type: sequelize.QueryTypes.INSERT
        // });
        // console.log('Data inserted into MySQL');
        // console.log(result);
        // if(result==0){
        //     console.log(result);
        //     sendMail();
        // }
        const updatedRows = [];

        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            const { product_id, product_name, sku, variant_id, price, discount_percent, description, category_id } = row;

            const [result] = await sequelize.query('SELECT * FROM pro_excel WHERE product_id = ?', {
                replacements: [product_id],
                type: sequelize.QueryTypes.SELECT
            });

            if (result) {
              
                await sequelize.query('UPDATE pro_excel SET product_name=?, sku=?, variant_id=?, price=?, discount_percent=?, description=?, category_id=? WHERE product_id=?', {
                    replacements: [product_name, sku, variant_id, price, discount_percent, description, category_id, product_id],
                    type: sequelize.QueryTypes.UPDATE
                });
                updatedRows.push(product_id);
            } else {
              
                await sequelize.query('INSERT INTO pro_excel (product_id, product_name, sku, variant_id, price, discount_percent, description, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', {
                    replacements: [product_id, product_name, sku, variant_id, price, discount_percent, description, category_id],
                    type: sequelize.QueryTypes.INSERT
                });
            }
        }

        console.log('Data inserted/updated into MySQL');
        console.log('Updated rows:', updatedRows);

        if (updatedRows.length > 0) {
            sendMail();
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error inserting data into MySQL:', error);
        res.status(500).json({ error: 'Error inserting data into MySQL' });
    }
};



module.exports = productimport