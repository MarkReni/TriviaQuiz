import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const email = params.get("email");
  const data = {};

  const userData = await userService.findUserByEmail(email);

  if (userData.length != 1) {
      data.validationErrors = {email: { "exists": "Email doesn't exist in the system" }};
      data.email = email;
      
      render("login.eta", data);
      return;
  }

  const user = userData[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    data.validationErrors = {password: { "confirm": "Password doesn't match the email" }};
    
    render("login.eta", data);
    return;
  }

  await state.session.set("user", user);
  
  response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};


export { processLogin, showLoginForm };