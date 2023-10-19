import { fetchAllServicesFromDatabase } from "../services/AllServices"
import { useEffect, useState } from "react"
import { updateNewRepairToDatabase } from "../services/AllServices";



//straigten drop off date and select services.
//clear form after hitting submit?
//your request has been submitted after hitting button
//render services into any additional details?
//stretch goal (search bar for guitars)





export const RepairRequestForm = () => {
    const [isServiceSelected, setIsServiceSelected] = useState(false)
    const [services, setServices] = useState([])
    const [selectedServiceDescription, setSelectedServiceDescription] = useState([])
    const [chosenService, setChosenService] = useState("")

    const [newOrder, setNewOrder] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        guitarType: "",
        services: [],
        dropoffDate: "",
        isRushed: false,
        additionalDetails: "",
        isCompleted: false,
        customerId: null,
        userId: null,
        availableServicesId: null
    })

    useEffect(() => {
        fetchAllServicesFromDatabase().then((servicesArray) => {
            setServices(servicesArray)
        })
    }, [])



    const handleServiceChange = (event) => {
        const selectedServiceId = parseInt(event.target.value)
        if (selectedServiceId !== "0") {
            const selectedService = services?.find((service) => service?.id === selectedServiceId)

            if (selectedService) {
                setSelectedServiceDescription(selectedService.description) // Set the selected service's description
                setIsServiceSelected(true)

            } else {
                setSelectedServiceDescription("")
                setIsServiceSelected(false); // No service selected
            }
            setChosenService(selectedService)
        }
    }

    const handleSaveRepairToDatabase = (event) => {
        event.preventDefault()
        updateNewRepairToDatabase(newOrder)
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
                        onChange={(event) => {
                            const copy = { ...newOrder }
                            copy.name = event.target.value;
                            setNewOrder(copy);
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
                        onChange={(event) => {
                            const copy = { ...newOrder }
                            copy.email = event.target.value;
                            setNewOrder(copy);
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
                        onChange={(event) => {
                            const copy = { ...newOrder }
                            copy.phoneNumber = event.target.value;
                            setNewOrder(copy);
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
                        onChange={(event) => {
                            const copy = { ...newOrder }
                            copy.guitarType = event.target.value
                            setNewOrder(copy);
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
                                const copy = { ...newOrder }
                                copy.dropoffDate = event.target.value
                                setNewOrder(copy)
                            }}
                        />
                        <div>
                            <label className="text-gray-700 text-sm ml-2">$75 fee for under 2 day turnaroud.</label>
                        </div>
                        <input
                            className="form-checkbox h-5 w-5 text-green-600 ml-2"

                            type="checkbox"
                            onChange={(event) => {
                                setNewOrder({ ...newOrder, isRushed: !newOrder.isRushed })
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
                                            if (chosenService) {
                                                const updatedServices = [...newOrder.services, selectedServiceDescription]
                                                setNewOrder({ ...newOrder, services: updatedServices })
                                            }
                                            setSelectedServiceDescription("")
                                            setIsServiceSelected(false)
                                        }}
                                    >
                                        Add Service
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
                            const copy = { ...newOrder };
                            copy.additionalDetails = event.target.value;
                            setNewOrder(copy);
                        }}
                    ></textarea>
                </div>

                <div className="mb-6">
                    <button className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"
                        onClick={handleSaveRepairToDatabase}>
                        Submit Repair Request
                    </button>
                </div>
            </form>
        </div>

    )
};
