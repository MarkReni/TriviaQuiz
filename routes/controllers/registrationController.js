import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";
import * as valRules from "../../validation/validationRules.js";

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const email = params.get("email");
  const password = params.get("password");

  const userData = await userService.findUserByEmail(
    params.get("email"),
  );

  if (userData.length === 1) {
      const data = {};
      data.email = email;
      data.validationErrors = {email: { "exists": "Email already exists" }};
    
      render("registration.eta", data);

  } else {

      const [passes, errors] = await validasaur.validate(
        {
            email: email,
            password: password 
        },
        valRules.registrationValidationRules
      );
    
      if (!passes) {
        const data = {};
        data.email = email;
        data.validationErrors = errors;
    
        render("registration.eta", data);
    
      } else {
        await userService.addUser(
          email,
          await bcrypt.hash(password),
        );
    
        response.redirect("/auth/login");
      };
  }
  
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};


export { registerUser, showRegistrationForm };