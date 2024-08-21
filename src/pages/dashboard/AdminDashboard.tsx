import { Button,  Label, Modal, Table, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { INDUSTRY } from "../../utils/models"
import axios from "axios"
import { BASE_URL } from "../../utils/baseUrl"
import { useNavigate } from "react-router-dom"

type AGENTS = {
    name : string,
    email : string
}[]


const AdminDashboard = () => {

    const [industry, setIndustry] = useState({} as INDUSTRY)
    const [agents, setAgents] = useState([] as AGENTS)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [modalloading, setModalLoading] = useState(false)

    const navigate = useNavigate()



    const fetchAllAgents = async () => {
        setLoading(true)

        await axios.get(`${BASE_URL}/agents/myagents`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        .then((res) => {
            setAgents(res.data.agents)
            setLoading(false)
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
        
    }

    const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

//   create agents
const createAgent = async (e : React.FormEvent<HTMLElement>) =>{
    e.preventDefault()
    setModalLoading(true)
    const data = {
        name,
        email
    }

    await axios.post(`${BASE_URL}/agents`, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
        console.log(res.data)
        fetchAllAgents()
        setModalLoading(false)
        setOpenModal(false)
    })
    .catch((err) => {
        console.log(err)
        setModalLoading(false)
        setOpenModal(false)
    })
    console.log(name, email)
}


const handleLogout = async () => {
    navigate('/')
    localStorage.clear()
}

    // passing in use effect to prevent rerender
    // not doing so will create infinite renders
    useEffect(() => {
        const storedIndustry = localStorage.getItem('industry')
        if (storedIndustry) {
            setIndustry(JSON.parse(storedIndustry))
        }
        else {
            alert('Error passing data')
        }

        // fetch all agents
        fetchAllAgents()


    }, [])


    return (
        <div className="m-10">
            <h1 className="text-center">Welcome {industry.industryName}</h1>

            <div className="flex justify-center my-5">
            <Button onClick={() => setOpenModal(true)}>Add Agent</Button>
            </div>

            <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Agent Name</Table.HeadCell>
          <Table.HeadCell>Contact Detail</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Delete</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {loading && <p>Loading...</p>}
            {agents.length < 1 && !loading ? <p>No data to display</p> : null}

            {
                agents.map((agent) => (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {agent.name}
            </Table.Cell>
            <Table.Cell>{agent.email}</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Delete
              </a>
            </Table.Cell>
          </Table.Row>
                ))
            }
        </Table.Body>
      </Table>
    </div>

    {/* logout */}

   <div className="flex w-full items-end justify-end">
   <Button  color={"failure"} onClick={handleLogout}>Logout</Button>
   </div>


    
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={createAgent} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Agent</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Agent Name" />
              </div>
              <TextInput
                id="name"
                placeholder="Agent name"
                value={name}
                onChange={(e) => setName(e.target.value)}               
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Agent email" />
              </div>
              <TextInput id="email" type="email" placeholder="Agent email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            
              
            
            <div className="w-full">
                {modalloading ? <Button className="w-full" disabled>Loading...</Button> : 
              <Button type="submit" className="w-full">Add Agent</Button>}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    
        </div>
    );
}

export default AdminDashboard;