import React, { Component } from "react";
import PageHeader from "../common/pageHeader";
import "../../css/HomePage.css";

class HomePage extends Component {
  state = {
    currentTime: new Date(),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      currentTime: new Date(),
    });
  }

  render() {
    const { currentTime } = this.state;
    return (
      <React.Fragment>
        <div className="date-time">{currentTime.toLocaleString()}</div>;
        <img className="logoHome" src="/assets/images/logo.png" alt="לוגו" />
        <PageHeader title="Eden Cakes" subTitle="!ברוכים הבאים לאתר שלנו" />
        <div
          style={{
            direction: "rtl",
            maxWidth: "500px",
            margin: "20px auto",
            padding: "50px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            backgroundColor: "pink",
          }}
        >
          <span>
            <p className="Line1">
              אז לאחר הרבה זמן סוף סוף האתר הרשמי שלנו עלה לאוויר
            </p>
          </span>
          <p className="Line2">
            באתר זה תוכלו לראות חלק מהמוצרים שלנו, לבצע הזמנות, לראות מתכונים
            ועוד
          </p>
          <p className="Line3">
            על מנת לשוטט באתר יש להיעזר בסרגל הניווט שנמצא בחלק העליון של הדף
          </p>
          <p className="Line4">גלישה מהנה</p>
        </div>
        <p className="survey">
          {" "}
          <a href="/survey"> רוצים להגיד לנו מה אתם חושבים עלינו? לחצו כאן </a>
        </p>
      </React.Fragment>
    );
  }
}

export default HomePage;
