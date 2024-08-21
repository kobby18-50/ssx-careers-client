import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/baseUrl";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {

    const [industryEmail, setIndustryEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e : React.FormEvent<HTMLElement>) => {
        setLoading(true)
        e.preventDefault()

        const data = { industryEmail, password }

        await axios.post(`${BASE_URL}/auth/login`, data)
        .then((res) => {
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: res.data.msg,
              })

            //   save to local storage
            localStorage.setItem('industry', JSON.stringify(res.data.industry))

            localStorage.setItem('token', res.data.token)

              setLoading(false)

            //   user based routing
              if(res.data.industry.role === "admin"){
                navigate('/adminDashboard')
              }else{
                navigate('/dashboard')
              }
        })
        .catch((err) =>{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.msg || "Something went wrong!",
            })
        })
        setLoading(false)
    }
    return (
        <div>
            <section className="grid grid-cols-2 p-20">

                <h1>SSX Careers</h1>

                <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email"/>
                        </div>
                        <TextInput id="email" type="email" placeholder="name@flowbite.com" required value={industryEmail} onChange={(e) => setIndustryEmail(e.target.value)} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    
                   {loading ? <Button disabled>Loading...</Button> : <Button type="submit">Login</Button>}

                    <span>Do not have an account? <Link className="underline text-cyan-700" to={"/auth/register-user"}>Create one here</Link></span>
                </form>

            </section>
        </div>
    );
}

export default Login;