import React from "react";
import Form from "./../common/Form/Form";
import PageHeader from "./../common/pageHeader";
import { toast } from "react-toastify";
import { getCurrentUser, login, signup } from "../../services/userService";
import { Navigate } from "react-router-dom";
import Joi from "joi-browser";
import Confetti from "react-confetti";
import Swal from "sweetalert2";

class Signup extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
    showConfetti: false,
  };

  schema = {
    name: Joi.string().min(2).required().label("שם"),
    email: Joi.string().email().required().label('דוא"ל'),
    password: Joi.string()
      .min(8)
      .regex(/.*[!@#$%^&*()_+\-={}';":|,.<>?].*/)
      .required()
      .label("סיסמה"),
  };

  componentDidMount() {
    Swal.fire({
      title: "!שימו לב",
      text: "יש לבחור סיסמה שמכילה לפחות 8 תווים עם אותיות גדולות, קטנות, מספרים ותווים נוספים ולרשום שם שמכיל לפחות שני תווים",
      icon: "info",
      confirmButtonText: "המשך",
    });
  }

  doSubmit = async () => {
    try {
      const user = { ...this.state.data };
      await signup(user);
      toast.success(`${user.name} נרשמת בהצלחה`);

      // Update showConfetti to true
      this.setState({ showConfetti: true }, () => {
        console.log("Updated showConfetti: ", this.state.showConfetti); // Debug line
      });

      setTimeout(async () => {
        delete user.name;
        await login(user);
        window.location = "/";
      }, 2000);
    } catch (error) {
      console.log("Error: ", error);
      if (error.response && error.response.status === 400) {
        this.setState({ errors: { email: "המשתמש קיים כבר במערכת" } });
      }
    }
  };

  getFormClasses() {
    const width = window.innerWidth;

    if (width <= 480) return "col-12";
    if (width <= 768) return "col-10 offset-1";
    if (width <= 992) return "col-md-8 offset-md-2";
    return "col-xl-6";
  }

  render() {
    console.log("Rendering... showConfetti is: ", this.state.showConfetti);
    const user = getCurrentUser();
    if (user) return <Navigate replace to="/" />;

    return (
      <div style={{ minHeight: "85vh" }} className="container-fluid pb-4">
        {this.state.showConfetti && <Confetti />}
        <div className="container">
          <PageHeader title="הרשמה" subTitle="" />
          <div className="center">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              style={{ direction: "rtl" }}
              className={this.getFormClasses()}
            >
              {this.renderInput("name", "שם:")}
              {this.renderInput("email", "מייל:", "email")}
              {this.renderInput("password", "סיסמה:", "password")}
              {this.renderButton("הרשמה", "btn btn-primary btn-lg mt-2 col-12")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
