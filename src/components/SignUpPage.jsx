import { Link } from "react-router-dom"
import styles from "./SignUpPage.module.css"

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegister } from "../services/mutations";

// ----------------------------------------------------------------------------------
function SignUpPage() {

    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
      });
    
      const navigate = useNavigate();
      const { mutate } = useRegister();
    
      const changeHandler = (event) => {
        setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
      };
    
      const registerHandler = (event) => {
        event.preventDefault();
    
        const { username, password, confirmPassword } = form;
    
        if (!username || !password)
          return alert("User Name and Password is Necessary");
        if (password !== confirmPassword) return alert("Passwords Isn't The Same!");
    
        mutate(
          { username, password },
          {
            onSuccess: (data) => {
              console.log(data.data.message);
              navigate("/loginPage");
            },
            onError: (error) => console.log(error.response.data.message),
          }
        );
      };

// ---------------------------------------------------------------------------------
  return (
        <form className={styles. container} onSubmit={registerHandler} >
            <img src="src/assets/login-logo.svg" alt="login logo" />
            <p>Sign up form</p>
            <input type="text" name="username" placeholder="username" value={form.username} onChange={changeHandler}/>
            <input type="password" name="password" placeholder="password" value={form.password} onChange={changeHandler}/>
            <input type="password" name="confirmPassword" placeholder="repeat password" value={form.confirmPassword} onChange={changeHandler} />
            <button type="submit" >Sign up</button>
            <Link className={styles.link} to={"/loginPage"}>
                <h3>Already have an account?</h3>
            </Link>
        </form>
  )
}

export default SignUpPage