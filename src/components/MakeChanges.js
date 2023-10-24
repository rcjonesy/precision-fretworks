import { useParams } from "react-router-dom";
import { getRepairById } from "../services/AllServices";
import { useEffect, useState } from "react";
import { fetchAllServicesFromDatabase } from "../services/AllServices"
import { useNavigate } from "react-router-dom"
import { editedRepairToDatabase } from "../services/AllServices";


export const MakeChanges = ({ currentUser }) => {

    const { repairId } = useParams()
    
    const [repair, setRepair] = useState([])
    const [isServiceSelected, setIsServiceSelected] = useState(false)
    const [services, setServices] = useState([])
    const [selectedServiceDescription, setSelectedServiceDescription] = useState([])
    const [chosenService, setChosenService] = useState("")
    const navigate = useNavigate()

    const [changedOrder, setChangedOrder] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        guitarType: "",
        services: [],
        dropoffDate: "",
        isRushed: "",
        additionalDetails: "",
        isCompleted: "",
        userId: currentUser.id,
    })

    useEffect(() => {
        getRepairById(repairId).then((postArray) => {
            setRepair(postArray);

            // Now that repair data is available, set changedOrder
            setChangedOrder({
                id: repairId,
                name: postArray.name,
                email: postArray.email,
                phoneNumber: postArray.phoneNumber,
                guitarType: postArray.guitarType,
                services: [],
                dropoffDate: postArray.dropoffDate,
                isRushed: postArray.isRushed,
                additionalDetails: postArray.additionalDetails,
                isCompleted: postArray.isCompleted,
                userId: currentUser.id,
            });
        });
    }, [repairId, currentUser.id])

    useEffect(() => {
        fetchAllServicesFromDatabase().then((servicesArray) => {
            setServices(servicesArray)
        })
    }, [])

    const handleServiceChange = (event) => {
        const selectedServiceId = parseInt(event.target.value);
        if (selectedServiceId !== "0") {
            const selectedService = services?.find((service) => service?.id === selectedServiceId)

            if (selectedService) {
                // Add the selected service's name to makeChanges.services
                const updatedServices = [...changedOrder.services, selectedService.service_name]
                setChangedOrder({ ...changedOrder, services: updatedServices })

                setSelectedServiceDescription(selectedService.description)
                setIsServiceSelected(true)
            } else {
                setSelectedServiceDescription("")
                setIsServiceSelected(false)
            }
            setChosenService(selectedService)
        }
    }



    const handleEditRepairToDatabase = (event) => {
        console.log(changedOrder)
        event.preventDefault()
        editedRepairToDatabase(changedOrder).then(() => {
            navigate("/repairrequest")
        })
        
    }




    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="w-full max-w-md">
                <div className="mb-6">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label> */}
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        type="text"
                        placeholder="Full Name"
                        value={changedOrder.name}
                        onChange={(event) => {
                            const copy = { ...changedOrder }
                            copy.name = event.target.value;
                            setChangedOrder(copy)
                        }}
                    />
                </div>

                <div className="mb-6">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label> */}
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        type="text"
                        placeholder="Email"
                        value={changedOrder.email}
                        onChange={(event) => {
                            const copy = { ...changedOrder }
                            copy.email = event.target.value;
                            setChangedOrder(copy)
                        }}
                    />
                </div>

                <div className="mb-6">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label> */}
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        type="text"
                        placeholder="Phone Number"
                        value={changedOrder.phoneNumber}
                        onChange={(event) => {
                            const copy = { ...changedOrder }
                            copy.phoneNumber = event.target.value;
                            setChangedOrder(copy)
                        }}
                    />
                </div>

                <div className="mb-6">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2">Select Guitar Type:</label> */}
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        type="text"
                        placeholder="Select Guitar Type"
                        value={changedOrder.guitarType}
                        onChange={(event) => {
                            const copy = { ...changedOrder }
                            copy.guitarType = event.target.value
                            setChangedOrder(copy)
                        }}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ">Drop Off Date:</label>

                    <div className="flex items-center">
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            type="date"
                            placeholder="mm/dd/yy"
                            onChange={(event) => {
                                const copy = { ...changedOrder }
                                const date = new Date(event.target.value)
                                const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
                                copy.dropoffDate = formattedDate
                                setChangedOrder(copy)
                            }}
                        />
                        <div>
                            <label className="block text-gray-700 text-sm ml-2">$75 fee for under 2 day turnaroud.</label>
                        </div>
                        <input
                            className="form-checkbox h-5 w-5 text-green-600 ml-2"

                            type="checkbox"
                            onChange={(event) => {
                                setChangedOrder({ ...changedOrder, isRushed: !changedOrder.isRushed })
                            }}
                        />
                    </div>
                </div>

                <div className="mb-6 flex">
                    <div className="w-1/2 pr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Select services:</label>
                        <select
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleServiceChange}
                        >
                            <option value="0">Choose a service</option>
                            {services?.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service?.service_name} - ${service?.fee}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="w-1/2 pl-2">
                        <ul>
                            <li className="mb-6 text-left">{selectedServiceDescription}</li>
                            {isServiceSelected && (
                                <div>
                                    <button
                                        className="bg-slate-500 hover-bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                        onClick={(event) => {
                                            event.preventDefault()
                                            // if (chosenService) {
                                            //     const updatedServices = [...changedOrder.services, services.service_name]
                                            //     setchangedOrder({ ...changedOrder, services: updatedServices })
                                            // }
                                            setSelectedServiceDescription("")
                                            setIsServiceSelected(false)
                                            changedOrder.services = []
                                        }}
                                    >
                                        Remove Service
                                    </button>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mb-6">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2">Any Additional Details:</label> */}
                    <textarea
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"

                        placeholder="Any additional details"
                        onChange={(event) => {
                            const copy = { ...changedOrder }
                            copy.additionalDetails = event.target.value;
                            setChangedOrder(copy);
                        }}
                    ></textarea>
                </div>

                <div className="mb-6">
                    <button className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"
                        onClick={handleEditRepairToDatabase}>
                        Submit Updated Repair Request
                    </button>
                </div>
            </form>
        </div>

    )
    
}


