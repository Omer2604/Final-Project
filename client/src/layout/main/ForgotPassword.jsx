import React, { useState } from "react";
import Joi from "joi-browser";
import { forgotPassword } from "../../services/userService";
import PageHeader from "../common/pageHeader";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const SERVICE_ID = "1";
const TEMPLATE_ID = "template_yaxiwe7";
const PUBLIC_KEY = "5i2Qc7VaP2mnFP00I";

function ForgotPassword() {
  const [data, setData] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const validationErrors = {};
    for (let item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  }

  const schema = {
    email: Joi.string().required().email().label("Email"),
  };

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.currentTarget.name] = e.currentTarget.value;
    setData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors || {});
    if (validationErrors) return;

    await doSubmit();
  };

  const doSubmit = async () => {
    try {
      const { data: resetPasswordToken } = await forgotPassword(data.email);
      if (
        resetPasswordToken &&
        typeof resetPasswordToken === "object" &&
        resetPasswordToken.resetPasswordToken
      ) {
        const baseURL = "http://localhost:3000/newpassword";
        const resetLink = `${baseURL}/${resetPasswordToken.resetPasswordToken}`;

        const templateParams = {
          user_email: data.email,
          link: resetLink,
        };

        await emailjs
          .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
          .then((response) => {
            console.log("SUCCESS!", response.status, response.text);
            Swal.fire({
              icon: "success",
              title: "האימייל נשלח בהצלחה",
              text: "הוראות לשחזור הסיסמה שלך נשלחו למייל שהקלדת",
            });
          })
          .catch((err) => {
            console.log("FAILED...", err);
          });
      } else {
        console.error("Invalid reset token received:", resetPasswordToken);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error Response", error.response.data);
        Swal.fire({
          icon: "error",
          title: "מייל לא תקין",
          text: "מייל זה לא קיים במערכת, אנא וודא שהקלדת את המייל נכון",
        });
      }
    }
  };

  return (
    <div className="container">
      <PageHeader
        title="שחזור סיסמה"
        subTitle="הקלד את המייל איתו נרשמת בתיבת הטקסט על מנת לשחזר את הסיסמה"
      />
      <form
        style={{
          direction: "rtl",
          maxWidth: "350px",
          margin: "50px auto",
          padding: "15px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="email">מייל:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={data.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="alert alert-danger">{errors.email}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          שחזר
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
