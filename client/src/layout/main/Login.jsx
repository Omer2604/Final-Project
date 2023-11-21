import React from "react";
import Form from "./../common/Form/Form";
import Joi from "joi-browser";
import PageHeader from "./../common/pageHeader";
import { toast } from "react-toastify";
import { getCurrentUser, login } from "../../services/userService";
import { Navigate } from "react-router-dom";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
    isMobile: window.innerWidth <= 480,
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    try {
      const user = { ...this.state.data };
      await login(user);
      toast.success("התחברת בהצלחה");
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400)
        this.setState({
          errors: { email: "האימייל או הסיסמה שגויים או שהמשמש לא קיים" },
        });
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
    const user = getCurrentUser();
    if (user) return <Navigate replace to="/" />;

    return (
      <div style={{ minHeight: "85vh" }} className="container-fluid pb-4">
        <div className="container">
          <PageHeader title="התחברות" subTitle="" />
          <div className="center">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              style={{ direction: "rtl" }}
              className={this.getFormClasses()}
            >
              {this.renderInput("email", "מייל:", "email")}
              {this.renderInput("password", "סיסמה:", "password")}
              {this.renderButton("התחבר")}
              <p className="forgotpassword">
                במידה ושכחתם את הסיסמה יש ללחוץ{" "}
                <a href="/forgotpassword">כאן</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
