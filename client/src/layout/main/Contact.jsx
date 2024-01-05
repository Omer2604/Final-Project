import React, { Component } from "react";
import PageHeader from "../common/pageHeader";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import "../../css/Contact.css";

const SERVICE_ID = "1";
const TEMPLATE_ID = "template_7e52n4c";
const PUBLIC_KEY = "5i2Qc7VaP2mnFP00I";

const handleOnSubmit = (e) => {
  e.preventDefault();
  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY).then(
    (result) => {
      console.log(result.text);
      Swal.fire({
        icon: "success",
        title: "!הההודעה נשלחה בהצלחה",
        text: "מענה יינתן בתוך כ-48 שעות",
      });
    },
    (error) => {
      console.log(error.text);
      Swal.fire({
        icon: "error",
        title: "אופס! משהו השתבש, אנא נסו שוב במועד מאוחר יותר",
        text: "ניתן גם לפנות אלינו בטופס צור קשר",
        // text: error.text,
      });
    }
  );
  e.target.reset();
};

class Contact extends Component {
  state = {
    isPasswordVisible: false,
  };
  render() {
    return (
      <React.Fragment>
        <PageHeader title="צור קשר" subTitle="" />
        <Form method="POST" onSubmit={handleOnSubmit}>
          <div
            style={{
              direction: "rtl",
              maxWidth: "600px",
              margin: "20px auto",
              padding: "20px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              backgroundColor: "rgba(248, 228, 247, 0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "40px",
            }}
          >
            <Form.Group className="mb-3 col-8" controlId="NameField">
              <Form.Label className="LabelName">שם:</Form.Label>
              <Form.Control
                className="NameField"
                type="text"
                placeholder="הכנס שם"
                name="name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 col-8" controlId="EmailField">
              <Form.Label className="LabelMailContact">מייל:</Form.Label>
              <Form.Control
                className="EmailFieldContact"
                type="email"
                placeholder="הכנס מייל"
                required
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3 col-8" controlId="PhoneField">
              <Form.Label className="LabelPhone">טלפון:</Form.Label>
              <Form.Control
                className="PhoneField"
                type="tel"
                placeholder="דוגמה: 050-000-0000"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                title="יש לכתוב לפי הפורמט המתאים, לדוגמה: 050-000-0000"
                required
                dir="rtl"
                name="phone"
              />
            </Form.Group>
            <Form.Label className="SelectField col-8">
              בחר דרך ליצירת קשר:
            </Form.Label>
            <select className="choice col-8" name="contact">
              <option>מייל</option>
              <option>טלפון</option>
              <option>סמס</option>
              <option>ווטסאפ</option>
              <option>אחר</option>
            </select>
            <p className="remark col-8" style={{ textAlign: "right" }}>
              במידה ואתם מסמנים אחר יש לפרט בתוכן ההודעה את האמצעי ליצירת הקשר
            </p>
            <Form.Label className="LabelSubject col-8">
              בחר את נושאי הפנייה:
            </Form.Label>
            <Form.Group className="mb-3 col-8" controlId="SubjectLabel">
              <Form.Control
                className="SubjectField"
                type="text"
                placeholder="תקלה\הזמנה\שאלה\הצעה\אחר"
                required
                name="subject"
              />
            </Form.Group>
            <Form.Label className="LabelRemarks col-8">תוכן הפנייה:</Form.Label>
            <textarea
              className="RemarksField col-8"
              value={this.state.value}
              required
              name="remarks"
              id="user_msg"
              cols="25"
              rows="5"
              placeholder="הכנס כאן את פנייתך"
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              className="buttonSend col-8"
              variant="primary"
              type="submit"
            >
              שלח
            </Button>
          </div>
        </Form>
        <p className="contactAnother">:מפת הגעה</p>
        <div
          className="map"
          dangerouslySetInnerHTML={{
            __html: `
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.198923327073!2d34.94811642588956!3d32.090909018735495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d36d223f0be09%3A0x1254457338162c89!2z15DXpNenIDQ0LCDXqNeQ16kg15TXoteZ158!5e0!3m2!1siw!2sil!4v1685137207537!5m2!1siw!2sil" width="300" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        `,
          }}
        ></div>
      </React.Fragment>
    );
  }
}

export default Contact;
