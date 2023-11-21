import React, { useState } from "react";
import emailjs from "emailjs-com";
import PageHeader from "../common/pageHeader";
import Question from "../common/Survey/question";
import Swal from "sweetalert2";
import "../../css/Survey.css";

const questions = [
  {
    name: "phoneNumber",
    questionText:
      "רק לפניי שנתחיל, נשמח לדעת את מספר הטלפון שלכם (יש לכתוב בפורמט 054-555-5555)",
    pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
  },
  {
    name: "question1",
    questionText:
      "בסולם של בין 1 ל-5 כאשר 1 זה הכי נמוך ו-5 זה הכי גבוה עד כמה היית מרוצה מאתר שלנו",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    name: "question2",
    questionText:
      "במידה וביצעת הזמנה של עוגה או כל דבר אחר, עד כמה היית מרוצה מההזמנה בסולם של בין 1 ל-5",
    options: ["1", "2", "3", "4", "5", "לא ביצעתי הזמנה"],
  },
  {
    name: "question3",
    questionText:
      "בסולם של בין 1 ל-5 מה הסיכוי שתמליץ עלינו כאשר 1 לא אמליץ בכלל ו-5 זה בטוח אמליץ",
    options: ["1", "2", "3", "4", "5"],
  },
];

const extraQuestion = {
  name: "extraQuestion",
  questionText: "?סימנת 1 אשר נחשב לציון נמוך, מדוע בחרת בציון זה",
  inputType: "textarea",
};

function Survey() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showExtraQuestion, setShowExtraQuestion] = useState(false);

  const handleChange = (name, value) => {
    setAnswers((prev) => ({ ...prev, [name]: value }));

    if (name === "question1" && (value === "1" || value === "2")) {
      setShowExtraQuestion(true);
    } else if (name === "question1") {
      setShowExtraQuestion(false);
    }

    if (name === "question2" && value === "1") {
      setShowExtraQuestion(true);
    } else if (name === "question2") {
      setShowExtraQuestion(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (showExtraQuestion) {
      if (!answers.extraQuestion || answers.extraQuestion.trim() === "") {
        alert("Please fill in the extra question");
        return;
      }

      setShowExtraQuestion(false);
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion === questions.length - 1) {
      emailjs
        .send("1", "template_nnk827f", answers, "5i2Qc7VaP2mnFP00I")
        .then((result) => {
          console.log(result.text);
          Swal.fire({
            icon: "success",
            title: "!הנתונים נשלחו בהצלחה",
            text: "תודה שהקדשת מזמנך על מנת לעזור לנו",
          });

          setAnswers({});
          setCurrentQuestion(0);
        })
        .catch((error) => {
          console.log(error.text);
          Swal.fire({
            icon: "error",
            title: "אופס! משהו השתבש",
            text: "אנא נסו שוב במועד מאוחר יותר או דיווחו לנו על התקלה בצור קשר",
          });
        });
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <>
      <PageHeader title="סקר" subTitle="" />
      <div className="Survey">
        <h2>!שתפו אותנו במה שאתם חושבים</h2>
        <form className="FormSurvey" onSubmit={handleSubmit}>
          {questions.map((question, index) => {
            if (index === currentQuestion) {
              return (
                <Question
                  key={question.name}
                  name={question.name}
                  questionText={question.questionText}
                  options={question.options}
                  value={answers[question.name] || ""}
                  onChange={handleChange}
                  inputType={question.inputType}
                  pattern={question.pattern}
                  required
                />
              );
            } else {
              return null;
            }
          })}
          {showExtraQuestion && (
            <Question
              name={extraQuestion.name}
              questionText={extraQuestion.questionText}
              value={answers[extraQuestion.name] || ""}
              onChange={handleChange}
              inputType={extraQuestion.inputType}
              required
            />
          )}
          <button type="submit">
            {showExtraQuestion
              ? "הבא"
              : currentQuestion === questions.length - 1
              ? "סיום"
              : "הבא"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Survey;
