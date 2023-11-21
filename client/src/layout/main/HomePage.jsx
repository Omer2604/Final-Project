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
        <span>
          <p className="Line1">
            !אז לאחר הרבה זמן סוף סוף האתר הרשמי שלנו עלה לאוויר
          </p>
        </span>
        <p className="Line2">
          באתר זה תוכלו לראות חלק מהמוצרים שלנו, לבצע הזמנות, לראות מתכונים ועוד
        </p>
        <p className="Line3">
          על מנת לשוטט באתר יש להיעזר בסרגל הניווט שנמצא בחלק העליון של הדף
        </p>
        <p className="Line4">!גלישה מהנה</p>
        <img
          className="pic"
          src="/assets/images/alphaphores.png"
          alt="alphaphores"
        />
        <img
          className="pic"
          src="/assets/images/heartCake.png"
          alt="heart cake"
        />
        <img className="pic" src="/assets/images/puffs.png" alt="puffs" />
        <p className="survey">
          {" "}
          <a href="/survey"> רוצים להגיד לנו מה אתם חושבים עלינו? לחצו כאן </a>
        </p>
      </React.Fragment>
    );
  }
}

export default HomePage;
