import React, { useState } from 'react';
import Home from './Home';
import axios from 'axios';
function App() {
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [subject, setSubject] = useState("");
  const [emails, setEmails] = useState([]);
  const handlemsg = (event) => {
    setMsg(event.target.value);
  }
  const send = () => {
    setStatus(true);
    axios.post("http://localhost:3000/sendemail", { msg: msg, subject: subject, emailsList: emails })
      .then((data) => {
        if (data.data === true) {
          alert("Email sent successfully");
          setStatus(false);
          setMsg("");
          setSubject("");
        } else {
          alert("Error sending email");
          setStatus(false);
          setMsg("");
          setSubject("");
        }

      })
  }
  return (
    <>
      <Home handlemsg={handlemsg} msg={msg} send={send} subject={subject} setSubject={setSubject} status={status} emails={emails} setEmails={setEmails} />
    </>
  );
}

export default App;
