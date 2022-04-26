import { useState, useEffect} from "react";
import './Reset.css';
import { resetPassword, getUserID } from "../../api/account";
import { useNavigate } from "react-router-dom";

const Reset = () => {
    const [User, setUsername] = useState("");
    const [RUser, setRUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
    }, [ ]);

    const handleSubmit = () => {
        if(Password != cPassword){
            alert("Passwords do not match");
        }
        getUserID(User).then(x => setRUsername(x[0].user_id))
        .then(resetPassword(RUser, Password)).then(() => {
            navigate("/login");
        }
        )
    }


    return (
        <form>
            <div className="reset-container">
                <div className="text-center fs-3 fw-bold">
                    Reset Password
                </div>
                <div className="form-outline mb-4">
                    <label htmlFor="user" className="form-label">Username</label>
                    <input type="text" value={User} className ="form-control" name="user" id="user" onChange={event => setUsername(event.target.value)} />
                </div>
                <div className="form-outline mb-4">
                    <label htmlFor="password" className="form-label"> Password</label>
                    <input type="password" className ="form-control" value={Password} name="user" id="password" onChange={event => setPassword(event.target.value)} />
                </div>
                <div className="form-outline mb-4">
                    <label htmlFor="password" className="form-label"> Confirm Password</label>
                    <input type="password" className ="form-control" value={cPassword} name="user" id="password" onChange={event => setCPassword(event.target.value)} />
                </div>
                <button type="button" className="btn btn-primary mb-4" onClick={() => handleSubmit()}>Reset Password</button>
            </div>

        </form>


    )
}
export default Reset;