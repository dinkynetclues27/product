const sequelize = require('../database');
const nodemailer = require('nodemailer');
const cron = require('node-cron');


async function updateEmailCounter() {
  try {
    await sequelize.query('UPDATE email_counter SET count = count + 1');
    console.log('Email counter updated');
  } catch (error) {
    throw error;
  }
}

async function sendMail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dinkyjani27@gmail.com',
      pass: 'ccqf nslr ojkt tkug'
    }
  });

  const mailOptions = {
    from: 'dinkyjani27@gmail.com',
    to: 'jdinky.netclues@gmail.com',
    subject: 'Rows Inserted and Email Count',
    text: ''
  };

  try {
    const result = await sequelize.query('SELECT COUNT(*) AS rowCount FROM pro_excel', {
      type: sequelize.QueryTypes.SELECT
    });
    const rowCount = result[0].rowCount;

    await updateEmailCounter();

    const emailCountResult = await sequelize.query('SELECT count FROM email_counter', {
      type: sequelize.QueryTypes.SELECT
    });
    const emailCount = emailCountResult[0].count;

    mailOptions.text = `Number of rows inserted: ${rowCount}\nEmail count: ${emailCount}`;

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  updateEmailCounter,
  sendMail
};