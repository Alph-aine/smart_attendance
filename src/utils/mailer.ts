// utillity function to send email

import nodemailer from 'nodemailer'

const sendEmail = async (options: any): Promise<void> => {
  // create a transponder object using the default SMTP transport
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  // define the email options
  const mailOptions = {
    from: '"Attendance System"<amtesfunaab@gmail.com>',
    to: options.email,
    subject: options.subject,
    html: `<p> ${options.subject}</p>`
  }

  // send the mail
  await transport.sendMail(mailOptions)
}

export default sendEmail
