// in component karesh ine ke tuye router dore har component ino wrap konim miad
// baraye un route ye protection emal mikone ke msln ta karbar login nakarde va
// token set nashode karbar ro be in route nabar

import { Navigate } from "react-router-dom"
import { getCookie } from "../utils/cookie"

function AuthProvider({children}) {

    const token = getCookie("token")

    if (!token) return <Navigate to={"/loginPage"}/>

  return (children)
}

export default AuthProvider