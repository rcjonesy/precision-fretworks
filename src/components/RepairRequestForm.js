import { fetchAllServicesFromDatabase } from "../services/AllServices"
import { useEffect, useState } from "react"
import { updateNewRepairToDatabase } from "../services/AllServices";
import { useNavigate } from "react-router-dom";
import { GoTrash } from 'react-icons/go'
import { GuitarSearch } from "./GuitarSearch";




export const RepairRequestForm = ({ currentUser }) => {


    const navigate = useNavigate()



    // const [selectedServiceId, setSelectedServiceId] = useState("0")
    // const [isServiceSelected, setIsServiceSelected] = useState(false)
    // const [selectedServiceDescription, setSelectedServiceDescription] = useState([])
    const [services, setServices] = useState([])
    const [chosenService, setChosenService] = useState("")
    const [results, setResults] = useState([])
    // const [guitars, setGuitars] = useState([])
    //state to hold search

    // const [filteredGuitars, setFilteredGuitars] = useState([])
    // const [selectedGuitar, setSelectedGuitar] = useState("")


    const [newOrder, setNewOrder] = useState({

        name: "",
        email: "",
        phoneNumber: "",
        guitarType: "",
        serviceId: "",
        dropoffDate: "",
        isRushed: false,
        additionalDetails: "",
        isCompleted: false,
        userId: currentUser.id,
        message: ""
    })

    function generateRandomOrderNumber() {
        // Generate a random number between 100,000 and 999,999
        const min = 100000;
        const max = 999999;
        const randomOrderNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        return randomOrderNumber
    }

    useEffect(() => {
        fetchAllServicesFromDatabase().then((servicesArray) => {
            setServices(servicesArray)
        })
    }, [])

    useEffect(() => {
        setNewOrder((blankObj) => ({
            ...blankObj,
            userId: currentUser.id,
        }))
    }, [currentUser])



    const handleRemoveService = () => {
        const copy = { ...newOrder }
        copy.serviceId = ""
        setNewOrder(copy)
        setChosenService("")
    }

    const handleServiceChange = (event) => {
        const selectedServiceId = parseInt(event.target.value);
        const copy = { ...newOrder }
        copy.serviceId = selectedServiceId

        setNewOrder(copy)
        const findService = services.find((service) => {
            return service.id === selectedServiceId
        })
        setChosenService(findService)
    }


    const handleSaveRepairToDatabase = (event) => {
        event.preventDefault()
        const copy = { ...newOrder }
        copy.orderNumber = generateRandomOrderNumber()
        updateNewRepairToDatabase(copy).then(() => {
            navigate(`/repairrequest/`)
        })

    }

    return (
        <div className="min-h-screen flex justify-start ml-80 pt-11">
            <form className="w-full max-w-md">
                <div className="mb-6">

                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-200 gray-900 placeholder-gray-500"
                        required
                        type="text"
                        placeholder="Full Name"
                        onChange={(event) => {
                            const copy = { ...newOrder }
                            copy.name = event.target.value;
                            setNewOrder(copy)
                        }}
                    />
                </div>

                <div className="mb-6">

                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-200 placeholder-gray-500"
                        required
                        type="text"
                        placeholder="Email"
                        onChange={(event) => {
                            const copy = { ...newOrder }
                            copy.email = event.target.value;
                            setNewOrder(copy)
                        }}
                    />
                </div>

                <div className="mb-6">

                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-200 placeholder-gray-500"
                        required
                        type="text"
                        placeholder="Phone Number"
                        onChange={(event) => {
                            const copy = { ...newOrder }
                            copy.phoneNumber = event.target.value;
                            setNewOrder(copy)
                        }}
                    />
                </div>

                <div className="mb-6 text-white">
                    <div className="mb-2">  </div>
                    <GuitarSearch
                        newOrder={newOrder}
                        setNewOrder={setNewOrder}
                        setResults={setResults}
                        results={results}
                    />

                </div>



                <div className="mb-6">
                    <label className="block text-gray-200 text-sm mb-2 ">Drop Off Date</label>

                    <div className="flex items-center">
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                            required
                            type="date"
                            placeholder="mm/dd/yy"
                            onChange={(event) => {
                                const copy = { ...newOrder }
                                // const date = new Date(event.target.value)
                                // const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
                                copy.dropoffDate = event.target.value
                                setNewOrder(copy)
                            }}
                        />
                        <div>
                            <label className="block text-gray-200 text-sm ml-2 pr-2">$75 fee for under 2 day turnaroud.</label>
                        </div>


                        <label className="switch-form">
                            <input
                                className="form-checkbox h-5 w-5 text-green-600 ml-2"

                                type="checkbox"
                                onChange={(event) => {
                                    setNewOrder({ ...newOrder, isRushed: !newOrder.isRushed })
                                }}
                            />
                            <span className="slider round"></span>
                        </label>




                    </div>
                </div>

                <div className="mb-6 flex">
                    <div className="w-1/2 pr-2">
                        <label className="block text-gray-200 text-sm mb-2">Select services</label>
                        <select
                            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                            onChange={handleServiceChange}
                        >
                            <option value={0}>Choose a service</option>
                            {services?.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service?.service_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-1/2 pl-2">
                        <ul className="text-gray-200">

                            {newOrder?.serviceId && (
                                <li className="text-gray-200">
                                    <p
                                        className="text-gray-200 mr-5">{chosenService?.description} - ${chosenService.fee}
                                        <span>
                                            {/* <div> */}
                                            <button className="trash mt-1.5 text-2xl" onClick={handleRemoveService}><GoTrash /></button>
                                            {/* </div> */}

                                        </span>
                                    </p>
                                </li>

                            )}
                        </ul>
                    </div>
                </div>

                <div className="mb-6">

                    <textarea
                        className="appearance-none border rounded w-full py-2 px-3 black leading-tight focus:outline-none focus:shadow-outline h-32  bg-gray-200 placeholder-gray-500"

                        placeholder="Any additional details"
                        onChange={(event) => {
                            const copy = { ...newOrder }
                            copy.additionalDetails = event.target.value;
                            setNewOrder(copy);
                        }}
                    ></textarea>
                </div>


                <button className="bg-blue-600  hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"
                    onClick={handleSaveRepairToDatabase}>
                    Submit Repair Request
                </button>

            </form>
        </div>

    )
};
