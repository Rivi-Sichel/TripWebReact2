import { useState } from "react";

const SendEmail = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    text: "",
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const sendEmail = async () => {
    try {
      const response = await fetch("http://localhost:4000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div>
      <h2>שליחת מייל</h2>
      <input
        type="email"
        name="to"
        placeholder="כתובת מייל"
        value={emailData.to}
        onChange={handleChange}
      />
      <input
        type="text"
        name="subject"
        placeholder="נושא"
        value={emailData.subject}
        onChange={handleChange}
      />
      <textarea
        name="text"
        placeholder="תוכן ההודעה"
        value={emailData.text}
        onChange={handleChange}
      />
      <button onClick={sendEmail}>שלח מייל</button>
    </div>
  );
};

export default SendEmail;
