import { useEffect, useState } from "react"
import { fetchAllRepairsServices } from "../services/AllServices"
import { fetchAllServicesFromDatabase } from "../services/AllServices"
import { fetchUsersById } from "../services/AllServices"
import { editedRepairToDatabase } from "../services/AllServices"






export const EmployeePage = ({ currentUser }) => {

  // this is expanded with services
  const [repairs, setAllRepairs] = useState([])
  // const [services, setAllServices] = useState([])
  const [user, setUser] = useState([])
  const [showTextArea, setShowTextArea] = useState({})
  const [messages, setMessages] = useState({})
  const [updatedRepair, setUpdatedRepair] = useState(null)






  //rendering all repairs 
  useEffect(() => {
    fetchAllRepairsServices().then((repairsArray) => {
      setAllRepairs(repairsArray)
    })
  }, [])

  //rendering all servicess
  // useEffect(() => {
  //   fetchAllServicesFromDatabase().then((servicesArray) => {
  //     setAllServices(servicesArray)
  //   })
  // }, [])

  //setting the current user (entire object)
  useEffect(() => {
    fetchUsersById(currentUser.id).then((employeeInfo) => {
      setUser(employeeInfo)
    })
  }, [currentUser.id])



  function generateRandomOrderNumber() {
    // Generate a random number between 100,000 and 999,999
    const min = 100000;
    const max = 999999;
    const randomOrderNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomOrderNumber
  }



  let totalPrice = 0

  const reset = () => {
    totalPrice = 0
  }

  // const calculatePrice = (serviceName) => {
  //   services.map((service) => {
  //     if (service.service_name === serviceName) {
  //       totalPrice += service.fee
  //     }
  //   })
  // }

  const handleOnChange = (event, repair) => {
    const updatedRepair = {

      name: repair.name,
      email: repair.email,
      phoneNumber: repair.phoneNumber,
      guitarType: repair.guitarType,
      serviceId: repair.serviceId,
      dropoffDate: repair.dropoffDate,
      isRushed: repair.isRushed,
      additionalDetails: repair.additionalDetails,
      isCompleted: !repair.isCompleted,
      userId: repair.userId,
      orderNumber: repair.orderNumber,
      id: repair.id,
      completedBy: user.fullName,
      message: ""
    }



    editedRepairToDatabase(updatedRepair).then(() => {
      fetchAllRepairsServices().then((repairsArray) => {
        setAllRepairs(repairsArray)

        setUpdatedRepair(updatedRepair)

      })
    })
  }

  const handleMessageButton = (event, repairId) => {
    setShowTextArea(prevState => ({
      ...prevState,
      [repairId]: !prevState[repairId]
    }))
  }

  const handleMessageChange = (event, repairId) => {
    setMessages(prevState => ({
      ...prevState,
      [repairId]: event.target.value
    }))
  }

  const handleSendMessage = (event, repairId) => {
    // Get the message for the specific repair
    const message = messages[repairId]

    if (updatedRepair) {
      const updatedRepairCopy = {
        ...updatedRepair,
        message: message,
      }
      editedRepairToDatabase(updatedRepairCopy).then(() => {
        setUpdatedRepair(updatedRepairCopy) // Update the updatedRepair state
      })
    }

    window.alert("Message Sent")

    setMessages(prevState => ({
      ...prevState,
      [repairId]: ''
    }))

    // Hide the textarea
    setShowTextArea(prevState => ({
      ...prevState,
      [repairId]: false
    }))

  }

  return (
    <section className=" bg-white bg-opacity-10 w-1/3 mb-4 mt-20 ml-40 max-h-[850px] overflow-y-auto pb-4 pl-10 pt-10 mr-40 custom-scrollbar rounded-lg custom-border">
      {repairs.map((repair) => (
        <div key={repair.id} className=" p-4 mb-4 ml-4" >
          <div className=" text-gray-200 font-bold text-lg mb-2">-Order # {reset()} {generateRandomOrderNumber()}</div>
          <div className=" text-gray-200 text-lg font-semibold mb-2">Customer: {repair.name}</div>
          <div className="text-gray-200 mb-1.5"><strong>Email:</strong> {repair.email}</div>
          <div className="text-gray-200 mb-1.5"><strong>Phone Number:</strong> {repair.phoneNumber}</div>
          <div className="text-gray-200 mb-1.5"><strong>Instrument:</strong> {repair.guitarType}</div>
          <ul className="list-none pl-4 text-gray-200 mb-1.5">
            <strong>Services:</strong>

            <li className="text-gray-200 mb-1.5" key={repair?.service?.id}>- {repair?.service?.service_name}</li>

          </ul>
          <div className="text-gray-200 mb-1.5"><strong>Drop off Date:</strong> {repair.dropoffDate}</div>
          <div className="text-gray-200 mb-1.5"><strong>Additional Details:</strong> {repair.additionalDetails}</div>
          <div className="text-gray-200 mb-1.5"><strong>Price: </strong>${repair?.service?.fee} </div>
          {repair.isRushed ? <div className="text-red-600  mb-1.5">+$75 rush fee</div> : null}
          {repair.isRushed ? <div className="text-gray-200  mb-1.5"><strong>Total Price:</strong> ${repair.service.fee + 75}</div> : null}
          <div className="pt-3 text-gray-200">

            <strong className="pr-2 text-gray-200  mb-1.5">Completed:</strong>

            <label className="switch text-gray-200 mb-1.5">
              <>
                <input
                  type="checkbox"
                  checked={repair.isCompleted}
                  onChange={(event) => { handleOnChange(event, repair) }}
                />
                <span className="slider round"></span>
              </>
            </label>
            <div>
              <button
                className="bg-blue-600 hover-bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 mt-5"
                onClick={(event) => handleMessageButton(event, repair.id)}
              >
                Message Customer
              </button>
              {showTextArea[repair.id] && (
                <div>
                  <div className="mt-5">
                    <textarea
                      className="w-64 h-40 p-2 ml-0 text-black border rounded"
                      placeholder="Type your message here"
                      onChange={(event) => handleMessageChange(event, repair.id)}
                    />
                  </div>
                  <div className="mt-5">
                    <button className="bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                      onClick={(event) => handleSendMessage(event, repair.id)}>
                      Send Message
                    </button>
           
            
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>



  )


}



