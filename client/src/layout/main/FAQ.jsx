import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import "../../css/FAQ.css";
import PageHeader from "../common/pageHeader";

class FAQ extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <PageHeader title="שאלות ותשובות" subTitle="" />
        <div className="accordion">
          <Accordion>
            <Accordion.Item eventKey="0" className="accordion1">
              <Accordion.Header>כיצד ניתן לבצע הזמנה</Accordion.Header>
              <Accordion.Body className="answer">
                על מנת לבצע הזמנה יש להיכנס לדף צור קשר ולמלא את הטופס על פי
                ההוראות. כאשר מבקשים לבצע הזמנה מיוחדת יש להקפיד לכתוב פרטים
                מלאים כמו למשל צורה, גודל, כמות וטעמים
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" className="accordion2">
              <Accordion.Header>כיצד ניתן לקבל את ההזמנה</Accordion.Header>
              <Accordion.Body className="answer">
                ניתן לקבל את ההזמנה באיסוף עצמי בלבד מהכתובת אפק 44 בראש העין.
                יש לתאם מראש לפניי ההגעה דרך הודעת אינסטגרם, ווטסאפ, מייל, סמס
                או על ידי שיחת טלפון
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2" className="accordion3">
              <Accordion.Header>כיצד ניתן ליצור איתכם קשר</Accordion.Header>
              <Accordion.Body className="answer">
                ניתן ליצור איתנו קשר באמצעות טופס צור קשר באתר. בנוסף ניתן ליצור
                איתנו קשר גם בטלפון, בסמס, בווטאספ, ובמייל אשר רשומים בטופס צור
                קשר וגם בתחתית העמוד
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3" className="accordion4">
              <Accordion.Header>
                כיצד ניתן לראות את המוצרים שלכם ולדעת את המחירים שלכם
              </Accordion.Header>
              <Accordion.Body className="answer">
                ניתן להיכנס לדף האינסטגרם שלנו אשר נמצא בתחתית העמוד ולראות שם
                את כל המוצרים שלנו. בנוסף ניתן להיכנס אל{" "}
                <a href="/gallery">הגלריה</a> ולראות שם חלק מהפריטים שלנו ואת
                המחירים שלהם
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4" className="accordion5">
              <Accordion.Header>כיצד מתבצע התשלום</Accordion.Header>
              <Accordion.Body className="answer">
                לאחר שההזמנה שלכם תאושר תתבקשו לשלם דרך אפליקציית "ביט" או דרך
                אפליקציית "פייבוקס". ניתן גם לשלם דרך האפליקציה של הבנק.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5" className="accordion6">
              <Accordion.Header>
                כיצד אני יודע שההזמנה שלי מאושרת
              </Accordion.Header>
              <Accordion.Body className="answer">
                כל פנייה מקבלת מענה. במידה והפנייה שלכם לא קיבלה מענה סימן שלא
                ראינו את הפנייה.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6" className="accordion7">
              <Accordion.Header>מה נותנת לי ההרשמה לאתר</Accordion.Header>
              <Accordion.Body className="answer">
                כאשר נרשמים לאתר ניתן לערוך ולמחוק תוכן.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7" className="accordion8">
              <Accordion.Header>למה לא הצלחתי להירשם לאתר</Accordion.Header>
              <Accordion.Body className="answer">
                על מנת להירשם לאתר יש לרשום שם פרטי עם לפחות שני תווים, אימייל
                במבנה תקין של אימייל וסיסמה ששמכילה לפחות 8 תווים עם לפחות 4
                מספרים, אות גדולה באנגלית, אות קטנה באנגלית וסימן מיוחד מהסימנים
                שבכפתורי המספרים במקלדת. במידה ועדיין ישנה בעיה ניתן לפנות אלינו
                בצור קשר.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </React.Fragment>
    );
  }
}

export default FAQ;
