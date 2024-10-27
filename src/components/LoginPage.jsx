import { Link } from "react-router-dom"
import styles from "./LoginPage.module.css"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../services/mutations";
import { setCookie } from "../utils/cookie";

// ---------------------------------------------------------------------------------------------------

function LoginPage() {

    const [form, setForm] = useState({
        username: "",
        password: "",
      });
    // ----------------------------------------------------
      const navigate = useNavigate();
      const { mutate } = useLogin();
    // ----------------------------------------------------    
      const changeHandler = (event) => {
        setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
      };
    // ----------------------------------------------------    
      const loginHandler = (event) => {
        event.preventDefault();
    
        const { username, password } = form;
    
        if (!username || !password)
          return alert("User Name and Password is Necessary");
        
        if (event.target.value ==! username || event.target.value ==! password)
            return alert ("username or password does not match")

        mutate(form, {
          onSuccess: (data) => {
            console.log(data.data);
            setCookie("token", data.data?.token);
            navigate("/");
          },
          onError: (error) => 
            ((error.response.data.message === "Invalid credentials") ? (alert("invalid username or password"))
            : (console.log(error.response.data.message)) )
        });
      };

// ----------------------------------------------------------------------------------------------------------
  return (
    <>
        <form className={styles. container} onSubmit={loginHandler}>
            <img src="src/assets/login-logo.svg" alt="login logo" />
            <p>Login form</p>
            <input type="text" placeholder="username" name="username" value={form.username} onChange={changeHandler}/>
            <input type="password" placeholder="password" name="password" value={form.password} onChange={changeHandler}/>
            <button type="submit">Login</button>
            <Link className={styles.link} to={"/signUpPage"}>
                <h3>Create an account!</h3>
            </Link>
        </form>
    </>
  )
}

export default LoginPage