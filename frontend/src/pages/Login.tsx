import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Axios from "axios";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerMode, setRegisterMode] = useState(false);

    const navigate = useNavigate();

    function sendInfo() {

        let nrError = "";
        console.log(email)
        if (email.length < 1 || !/^[a-zA-Z0-9_.+-]+@gmail\.com$/.test(email)) {
            toast.error('Invalid email!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            nrError += ' email_err ';
        }

        if (password.length < 6) {
            toast.error('Password must have at least 6 characters!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            nrError += ' password_err ';
        }

        if (nrError.length == 0) {
            if (!registerMode) {
                Axios.post("http://localhost:8081/auth/login", {
                    email: email,
                    password: password
                }).then((res) => {
                    localStorage.setItem("email", res.data.email)
                    localStorage.setItem("token", res.data.token)
                    navigate("/homepage");
                }).catch((err) => {
                    console.error(err)
                    toast.error('Invalid credentials!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                    })
                })
            } else {
                Axios.post("http://localhost:8081/auth/register", {
                    email: email,
                    password: password
                }).then((res) => {
                    localStorage.setItem("email", res.data.email)
                    localStorage.setItem("token", res.data.token)
                    navigate("/homepage");
                }).catch((err) => {
                    console.error(err)
                    toast.error('Invalid credentials!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                    })
                })
            }

        }
    }

    return (
        <div className="h-screen content-center  ">
            <ToastContainer/>
            <div className="flex justify-center">
                <div className="card w-96 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title mb-5">{registerMode ? "Register" : "Login"}</h2>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                 className="w-4 h-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                            </svg>
                            <input type="text" className="grow" placeholder="Email" value={email}
                                   onChange={(res) => setEmail(res.target.value)}/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-7">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                 className="w-4 h-4 opacity-70">
                                <path fillRule="evenodd"
                                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                      clipRule="evenodd"/>
                            </svg>
                            <input type="password" className="grow" placeholder="Password" value={password}
                                   onChange={(res) => setPassword(res.target.value)}/>
                        </label>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary"
                                    onClick={sendInfo}>{registerMode ? "Register" : "Login"}</button>
                        </div>
                        <a className="link link-hover" onClick={() => setRegisterMode(!registerMode)}>Create account</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
