import { Button, Card } from "flowbite-react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import { useState } from "react";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
const VerifyEmail = () => {

    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const email = searchParams.get("email")
    const verificationToken = searchParams.get("token")

    const handleVerifyAccount = async () => {
        setLoading(true)
        await axios.post(`${BASE_URL}/auth/verifyEmail`, {email, verificationToken})
        .then((res)=>{
            Swal.fire({
                icon: "success",
                title: "Email Verification",
                text: res.data.msg,
              })
            setLoading(false)
            navigate("/")
        })
        .catch((err)=>{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.msg || "Something went wrong!",
            })
            setLoading(false)
        })
    }
    return ( 
        <div className="flex flex-col items-center justify-center mt-20 ">
           <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Verify your account
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 py-10">
        Account activation link has been sent to the link provided. 
        Verify with the link below
      </p>

      
      { loading ? <Button disabled>Verifying please wait.....</Button> : <Button onClick={handleVerifyAccount}>
        Verify
      </Button>}
    </Card>
        </div>
     );
}
 
export default VerifyEmail;