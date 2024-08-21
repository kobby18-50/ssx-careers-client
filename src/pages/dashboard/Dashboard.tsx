import { useEffect, useState } from "react"
import { INDUSTRY } from "../../utils/models"
import { Button, Label, Modal, Select, Table, TextInput } from "flowbite-react"
import { BASE_URL } from "../../utils/baseUrl"
import axios from "axios"
import { nanoid } from "nanoid"

const issuerIndustries = ['technology', 'finance', 'healthcare', 'energy', 'real estate', 'consumer goods', 'retail']
type IPO = {
    _id: string,
    ipoNumber: string,
    issuerName: string,
    issuerIndustry: 'technology' | 'finance' | 'healthcare' | 'energy' | 'real estate' | 'consumer goods' | 'retail',
    sharePrice: number,
    minimumVolumePerInvestor: number,
    totalAvailableShares: number,
    issuanceType: 'public' | 'private',
    issuanceStartDate: string
    issuanceEndDate: string,
    recievingAgents: string
}[]

const Dashboard = () => {
    const [industry, setIndustry] = useState({} as INDUSTRY)
    const [loading, setLoading] = useState(false)
    const [ipos, setIPOs] = useState([] as IPO)
    const [modalloading, setModalLoading] = useState(false)
    const [ipoNumber, setIPONumber] = useState(nanoid())
    const [issuerName, setIssuerName] = useState('')
    const [issuerIndustry, setIssuerIndustry] = useState('')
    const [sharePrice, setSharePrice] = useState(0)
    const [minimumVolumePerInvestor, setMinimumVolumePerInvestor] = useState(0)
    const [totalAvailableShares, setTotalAvailableShares] = useState(0)
    const [issuanceType, setIssuanceType] = useState('')
    const [issuanceStartDate, setIssuanceStartDate] = useState('')
    const [issuanceEndDate, setIssuanceEndDate] = useState('')
    const [recievingAgents, setRecievingAgents] = useState('')
    const [agents, setAgents] = useState([] as {_id : string, name : string, email : string}[])


    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }



    const fetchIPOs = async () => {
        setLoading(true)
        await axios.get(`${BASE_URL}/ipo`)
            .then((res) => {
                setIPOs(res.data.ipo)
                console.log(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)

            })
    }


    const fetchAgents = async () => {
        await axios.get(`${BASE_URL}/agents`)
        .then((res) => {
            setAgents(res.data.agents)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleCreateIPO = async (e : React.FormEvent<HTMLElement>) => {
        const data = {
            ipoNumber,
            issuerName,
            issuerIndustry,
            sharePrice,
            minimumVolumePerInvestor,
            totalAvailableShares,
            issuanceType,
            issuanceStartDate,
            issuanceEndDate,
            recievingAgents}
        e.preventDefault()
    await axios.post(`${BASE_URL}/ipo`,  data, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
    .then((res) => {
        console.log((res))
        fetchIPOs()
        setModalLoading(false)
        setOpenModal(false)
        
    }).catch((err) => {
        console.log(err)
        setOpenModal(false)
    })


    }
    useEffect(() => {
        const storedIndustry = localStorage.getItem('industry')
        if (storedIndustry) {
            setIndustry(JSON.parse(storedIndustry))
        }
        else {
            alert('Error passing data')
        }

        fetchAgents()

        fetchIPOs()


    }, [])
    return (

        <div className="m-10">
            <h1 className="text-center">Welcome {industry.industryName}</h1>

            <div>
                <Button onClick={() => setOpenModal(true)}>Create IPO</Button>
            </div>

            <div className="overflow-x-auto">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>IPO Number</Table.HeadCell>
                        <Table.HeadCell>Issuer Name</Table.HeadCell>
                        <Table.HeadCell>Issuer Industry</Table.HeadCell>
                        <Table.HeadCell>Minumum Volume</Table.HeadCell>
                        <Table.HeadCell>Total Available Shares</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Subscripe</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {loading && <p>Loading...</p>}
                        {ipos.length < 1 && !loading ? <p>No data to display</p> : null}

                        {
                            ipos.map((ipo) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {ipo.ipoNumber}
                                    </Table.Cell>
                                    <Table.Cell>{ipo.issuerName}</Table.Cell>
                                    <Table.Cell>{ipo.issuerIndustry}</Table.Cell>
                                    <Table.Cell>{ipo.minimumVolumePerInvestor}</Table.Cell>
                                    <Table.Cell>{ipo.totalAvailableShares}</Table.Cell>
                                    <Table.Cell>
                                        <a href={`/dashboard/subscribe/${ipo._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Subscribe
                                        </a>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
            </div>



            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleCreateIPO} className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add IPO</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="iponumber" value="IPO NaNumber" />
                            </div>
                            <TextInput
                                id="iponumber"
                                value={ipoNumber}
                                disabled
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="issuerName" value="Issuer Name" />
                            </div>
                            <TextInput id="issuerName" type="text" placeholder="Issuer Name" value={issuerName} onChange={(e) => setIssuerName(e.target.value)} required />
                        </div>
                        

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="issuerIndustry" value="Issuer Industry" />
                            </div>
                            <Select id="industry" value={issuerIndustry} onChange={(e) => setIssuerIndustry(e.target.value)} required>
                                {issuerIndustries.map((industry) => (
                                    <option value={industry}>{industry}</option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="sharePrice" value="Share Price" />
                            </div>
                            <TextInput id="sharePrice" type="number" value={sharePrice} onChange={(e) => setSharePrice(Number(e.target.value))} required />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="minimumVolumePerInvestor" value="Minimum Volume Per Investor" />
                            </div>
                            <TextInput id="minimumVolumePerInvestor" type="number" value={minimumVolumePerInvestor} onChange={(e) => setMinimumVolumePerInvestor(Number(e.target.value))} required />
                        </div>


                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="totalAvailableShares" value="Total Available Shares" />
                            </div>
                            <TextInput id="totalAvailableShares" type="number" value={totalAvailableShares} onChange={(e) => setTotalAvailableShares(Number(e.target.value))} required />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="issuanceType" value="Total Available Shares" />
                            </div>
              
              <Select id="countries" value={issuanceType} onChange={(e) => setIssuanceType(e.target.value)} required>
                                <option value="public">public</option>
                                <option value="private">private</option>
                            </Select>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="issuanceStartDate" value="Issuance Start Date" />
                            </div>
                            <TextInput id="issuanceStartDate" type="date" value={issuanceStartDate} onChange={(e) => setIssuanceStartDate(e.target.value)} required />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="issuanceEndDate" value="Issuance End Date" />
                            </div>
                            <TextInput id="issuanceEndDate" type="date" value={issuanceEndDate} onChange={(e) => setIssuanceEndDate(e.target.value)} required />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="recievingAgents" value="Recieving Agents" />
                            </div>
                            <Select value={recievingAgents} onChange={e => setRecievingAgents(e.target.value)}>
                                {agents.map((agent) => (
                                    <option value={agent._id}>{agent.name}</option>
                                ))}
                            </Select>
                        </div>








                        <div className="w-full">
                            {modalloading ? <Button className="w-full" disabled>Loading...</Button> :
                                <Button type="submit" className="w-full">Add IPO</Button>}
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Dashboard;