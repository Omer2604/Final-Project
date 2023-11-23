import React from "react";
import Form from "./../common/Form/Form";
import Joi from "joi-browser";
import { resetPassword } from "../../services/userService";
import PageHeader from "../common/pageHeader";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Confetti from "react-confetti";

function NewPasswordWrapper(props) {
  const navigate = useNavigate();
  console.log("useNavigate function:", navigate);
  const params = useParams();
  console.log("useParams:", params);

  return <NewPassword {...props} navigate={navigate} params={params} />;
}

class NewPassword extends Form {
  state = {
    data: { password: "", passwordConfirm: "" },
    errors: {},
    showConfetti: false,
  };

  componentDidMount() {
    console.log("Props in NewPassword:", this.props);
    const { navigate, params } = this.props;
    console.log("navigate:", navigate);
    console.log("params:", params);
  }

  schema = {
    password: Joi.string().required().min(6).label("New Password"),
    passwordConfirm: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .options({
        language: {
          any: {
            allowOnly: "must match password",
          },
        },
      })
      .label("Confirm Password"),
  };

  doSubmit = async () => {
    const { password } = this.state.data;
    const resetPasswordToken = this.props.params.YourPrivateKeyVer3;
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }

    try {
      console.log("Before calling resetPassword");
      const responseMessage = await resetPassword(password, {
        resetPasswordToken,
      }); // Pass the resetPasswordToken
      console.log("After calling resetPassword", responseMessage);

      if (responseMessage === "Password has been reset successfully.") {
        console.log("Inside success condition", responseMessage);
        this.setState({ showConfetti: true });

        Swal.fire({
          icon: "success",
          title: "הסיסמה עודכנה בהצלחה",
          text: "הסיסמה שלך עודכנה בהצלחה. אתה יכול כעת להתחבר עם הסיסמה החדשה.",
        }).then(() => {
          setTimeout(() => {
            this.props.navigate("/login");
          }, 3000); // Navigate after 3 seconds
        });
      } else {
        console.log("Inside else condition. Server response:", responseMessage);
        Swal.fire({
          icon: "error",
          title: "אופס...",
          text: "משהו השתבש",
          footer: <a href="contact">ניתן לדווח על התקלה בצור קשר</a>,
        });
      }
    } catch (error) {
      console.log("Inside catch block", error);
      Swal.fire({
        icon: "error",
        title: "אופס...",
        text: `משהו התשבש: ${error.message}`,
        footer: <a href="contact">ניתן לדווח על התקלה בצור קשר</a>,
      });
    } finally {
      console.log("doSubmit ended");
    }
  };

  render() {
    return (
      <div className="container">
        {this.state.showConfetti && <Confetti />}
        <PageHeader title="סיסמה חדשה" subTitle="אנא הגדר סיסמה חדשה" />
        <form
          style={{
            direction: "rtl",
            maxWidth: "500px",
            margin: "50px auto",
            padding: "15px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
          onSubmit={this.handleSubmit}
        >
          {this.renderInput("password", "סיסמה חדשה:", "password")}
          {this.renderInput("passwordConfirm", "אישור סיסמה:", "password")}
          {this.renderButton("אישור")}
        </form>
      </div>
    );
  }
}

export default NewPasswordWrapper;
