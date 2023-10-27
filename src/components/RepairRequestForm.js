import { fetchAllServicesFromDatabase } from "../services/AllServices"
import { useEffect, useState } from "react"
import { updateNewRepairToDatabase } from "../services/AllServices";
import { useNavigate } from "react-router-dom";
import { GoTrash } from 'react-icons/go'










export const RepairRequestForm = ({ currentUser }) => {


    const navigate = useNavigate()



    const [isServiceSelected, setIsServiceSelected] = useState(false)
    const [services, setServices] = useState([])
    const [selectedServiceDescription, setSelectedServiceDescription] = useState([])
    const [chosenService, setChosenService] = useState("")
    // const [renderedServices, setRenderedServices] = useState([])
    const [selectedServiceId, setSelectedServiceId] = useState("0")
    // const [selectedServiceValue, setSelectedServiceValue] = useState("0")

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
        userId: currentUser.id

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


    //  useEffect(() => {
    //     const filteredRendered = newOrder.services.filter(() => {

    //     })
    //  }, [newOrder.services])


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
        console.log("copy", copy)
        setNewOrder(copy)
        const findService = services.find((service) => {
            return service.id === selectedServiceId
        })
        setChosenService(findService)


        // if (selectedServiceId !== "0") {
        //     const selectedService = services?.find((service) => service?.id === selectedServiceId);
        //     // const selectedService = [...selectedServiceDescription]

        //     if (selectedService) {
        //         // Add the selected service's name to newOrder.services
        //         const updatedServices = [...newOrder.services, selectedService.service_name]
        //         setNewOrder({ ...newOrder, services: updatedServices })

        //         setSelectedServiceDescription(selectedService.description)
        //         setIsServiceSelected(true)
        //     } else {
        //         setSelectedServiceDescription("")
        //         setIsServiceSelected(false)
        //     }
        //     setChosenService(selectedService)

        // }
    };


    const handleSaveRepairToDatabase = (event) => {
        event.preventDefault()
        const copy = { ...newOrder }
        copy.orderNumber = generateRandomOrderNumber()
        updateNewRepairToDatabase(copy).then(() => {
            navigate(`/repairrequest/`)
        })

    }


    // const handleRemoveService = (serviceToRemove) => {
    //     const updatedServices = newOrder.services.filter(service => service !== serviceToRemove);
    //     setNewOrder({ ...newOrder, services: updatedServices });
    // };

    return (
        <div className="min-h-screen flex items-center justify-start ml-80">
            <form className="w-full max-w-md">
                <div className="mb-6">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label> */}
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
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label> */}
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
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label> */}
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

                <div className="mb-6">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2">Select Guitar Type:</label> */}
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-gray-200 placeholder-gray-500"
                        required
                        type="text"
                        placeholder="Select Guitar Type"
                        onChange={(event) => {
                            const copy = { ...newOrder }
                            copy.guitarType = event.target.value
                            setNewOrder(copy)
                        }}
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
                            {/* <li className="mb-6 text-left">{selectedServiceDescription}</li> */}
                            {newOrder?.serviceId && (
                                <li className="text-gray-200">
                                    <p
                                        className="text-gray-200 mr-5">{chosenService?.description} - ${chosenService.fee}
                                        <span>
                                            <div>
                                                <button className="trash mt-1.5 text-2xl" onClick={handleRemoveService}><GoTrash /></button>
                                            </div>

                                        </span>
                                    </p>
                                </li>
                                // <div>
                                //     {newOrder?.service?.map((service) => { return <li key={service}><div>{service}</div>
                                //      <button
                                //         className="bg-slate-500 hover-bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                //         onClick={(event) => {
                                //             event.preventDefault()
                                //             setSelectedServiceDescription("")
                                //             setIsServiceSelected(false)
                                //             newOrder.services.pop()
                                //             setSelectedServiceId("0")

                                //             // setRenderedServices(filteredRendered)
                                //         }}
                                //     >
                                //         🗑️
                                //     </button> </li>})}  

                                // </div>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mb-6">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2">Any Additional Details:</label> */}
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

                <div className="mb-6">
                    <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"
                        onClick={handleSaveRepairToDatabase}>
                        Submit Repair Request
                    </button>
                </div>
            </form>
        </div>

    )
};
