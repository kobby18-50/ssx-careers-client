import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utils/baseUrl";
import Swal from "sweetalert2";


const RegisterAdmin = () => {

    const [name, setName] = useState('')
    const [industryEmail, setIndustryEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e : React.FormEvent<HTMLElement>) => {
        e.preventDefault()

        const data = { name, industryEmail, password }

        setLoading(true)

        await axios.post(`${BASE_URL}/auth/registerAdmin`, data)
        .then((res) => {
            Swal.fire({
                icon: "success",
                title: "Account created",
                text: res.data.msg,
              });
              setLoading(false)
        })
        .catch((err) =>{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.msg || "Something went wrong!",
            })
            setLoading(false)
            
        })
    }
    return ( 
        <section>
           <section className="grid grid-cols-2 p-20">

<h1>Register as an admin</h1>

<form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
    <div>
        <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
        </div>
        <TextInput id="name" type="text" placeholder="name" required value={name} onChange={e => setName(e.target.value)} />
    </div>
    <div>
        <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required value={industryEmail} onChange={e => setIndustryEmail(e.target.value)}/>
    </div>
    <div>
        <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
    </div>
    
    {loading ? <Button type="submit" disabled> Loading...</Button> : <Button type="submit">Submit</Button>}

    <span>Want a user account? <Link className="underline text-cyan-700" to={"/auth/register-user"}>Create one here</Link></span>
</form>

</section>
        </section>
     );
}
 
export default RegisterAdmin;