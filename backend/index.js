const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require("mongoose");
// Ensure you have installed the required packages: express, nodemailer, cors
const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
// MongoDB connection and schema setup
// Note: Replace the password with an app password or use OAuth2 for better security.
mongoose
.connect("mongodb+srv://sathiyaram5311:5311@sathiyanarayanan.ydgnlkn.mongodb.net/passkey?retryWrites=true&w=majority&appName=Sathiyanarayanan")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));
// Define a Mongoose model for the email credentials
const crediential = mongoose.model("crediential", {}, "bulkmail");
app.get("/sendemail", (req, res) => {
  var message = req.query.msg;
  var subject = req.query.subject;
  var emails = req.query.emailsList;
  console.log("Emails to send:", emails);
    
  crediential.find().then((data) => {
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
      user: data[0].toJSON().user,
      pass: data[0].toJSON().pass,
    },
  })
new Promise(async (resolve, reject) => {
    try {
      for (let i = 0; i < emails.length; i++) {
        await transporter.sendMail({
          from: "sathiyar2003@gmail.com",
          to: emails[i],
          subject: subject,
          text: message,
        }
    );
      }
      resolve( "Emails sent successfully");
    } catch (error) {
      console.error("Error sending emails:", error);
      reject(error);
    }
  }).then(() => {
    res.send(true);
  }).catch(() => {
    res.send(false);
  });
}).catch((err) => {
    console.error("Error fetching credentials from MongoDB:", err);
    res.status(500).send("Internal Server Error");
  }
);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
