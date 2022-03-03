import { useState, useEffect } from "react";
import './Login.css';
import { account } from "../../api/account";
const Login = () => {
    const [user, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState('');
    const [signUp, setSignUp] = useState(false);
    const [rUser, setRUsername] = useState("");
    const [email, setEmail] = useState("");
    const [rPassword, setRPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const api = new account();

    useEffect(() => {
        if (err) {
            setTimeout(() => {
                setErr("");
            }, 4000);
        }

    }, [err]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (signUp) {
            if (rPassword !== cPassword) {
                setErr("passwords do not match");
            } else {
                api.register(rUser, email, rPassword)
                    .then((res) => {
                        console.log(res);
                        alert("successfully registered");
                    })
                    .catch((err) => {
                        setErr(err);
                        console.log(err);
                    });
            }

        } else {
            api.login(user, password).then((res) => {
                alert(res)
            }).catch((err)=>{
                alert(err +"catch");
            });
        }
        
    }
    const toggleSignUp = (e) => {
        e.preventDefault();
        setSignUp(prev => !prev);
    }
    return (
        <div className="login">
            <form>
                <div className="login-container">
                    {
                        !signUp ?
                            <>
                                <div className="login-form-field">
                                    <label htmlFor="user">Username</label>
                                    <input type="text" value={user} name="user" id="user" onChange={e => setUsername(e.target.value)} />
                                </div>

                                <div className="login-form-field">
                                    <label htmlFor="password"> Password</label>
                                    <input type="text" value={password} name="user" id="password" onChange={e => setPassword(e.target.value)} />
                                </div>
                            </>
                            :
                            <>
                                {err ? <p>{err}</p> : ''}
                                <div className="login-form-field">
                                    <label htmlFor="user">Username</label>
                                    <input type="text" value={rUser} name="rUser" id="rUser" onChange={e => setRUsername(e.target.value)} />
                                </div>
                                <div className="login-form-field">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" value={email} name="email" id="email" onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="login-form-field">
                                    <label htmlFor="rPassword">Password</label>
                                    <input type="text" value={rPassword} name="rPassword" id="rPassword" onChange={e => setRPassword(e.target.value)} />
                                </div>
                                <div className="login-form-field">
                                    <label htmlFor="cPassword">Confirm Password</label>
                                    <input type="text" value={cPassword} name="cPassword" id="cPassword" onChange={e => setCPassword(e.target.value)} />
                                </div>



                            </>
                    }
                    <button type="button" onClick={handleSubmit}>{signUp ? "Register" : "Login"}</button>
                    <button onClick={toggleSignUp}>{signUp ? "login instead" : "sign up"}</button>
                </div>
            </form>
        </div>
    )
}
export default Login;