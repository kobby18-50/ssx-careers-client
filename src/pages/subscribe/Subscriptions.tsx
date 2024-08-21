import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Subscriptions = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [ipo, setIPO] = useState(id)
    const [subscribedShares, setSubscribedShares] = useState(0)

    const handleSubmit = async (e : React.FormEvent<HTMLElement>) => {
        e.preventDefault()

        const data = {

            ipo,
            subscribedShares
        }

        await axios.post(`${BASE_URL}/subscription`, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        .then((res) => {
            console.log(res)
            navigate('/dashboard')
        })
        .catch((err) => {
            console.log(err)
            alert(err.response.data.msg)
        })
    }
    return ( 
        <div className="grid grid-cols-2 p-20">

            <h1>Subscripe</h1>
            <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="ipo" value="IPO" />
        </div>
        <TextInput id="email1" type="text" value={ipo} required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="subscribedShares" value="Subscribed Shares" />
        </div>
        <TextInput id="subscribedShares" type="number" value={subscribedShares} onChange={(e) => setSubscribedShares(Number(e.target.value))} required />
      </div>
      <Button type="submit">Submit</Button>
    </form>
        </div>
     );
}
 
export default Subscriptions;