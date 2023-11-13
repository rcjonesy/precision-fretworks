import { useEffect, useState, useRef } from "react"
import { fetchAllRepairsServices } from "../services/AllServices"
import { fetchAllServicesFromDatabase } from "../services/AllServices"
import { fetchUsersById } from "../services/AllServices"
import { editedRepairToDatabase } from "../services/AllServices"
import { AiFillCloseSquare } from "react-icons/ai"






export const EmployeePage = ({ currentUser }) => {

  // this is expanded with services
  const [repairs, setAllRepairs] = useState([])
  // const [services, setAllServices] = useState([])
  const [user, setUser] = useState([])
  const [showTextArea, setShowTextArea] = useState({})
  const [messages, setMessages] = useState({})
  const [updatedRepair, setUpdatedRepair] = useState(null)

  const updatedRepairRef = useRef(null)








  //rendering all repairs 
  useEffect(() => {
    fetchAllRepairsServices().then((repairsArray) => {
      // Sort the repairs array with the following priority:
      // 1. Uncompleted and Rushed
      // 2. Uncompleted and not Rushed
      // 3. Completed and Rushed
      // 4. Completed and not Rushed
      const sortedRepairs = [...repairsArray].sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
          // If one is completed and the other is not, prioritize uncompleted repairs
          return a.isCompleted ? 1 : -1;
        }
  
        // For uncompleted repairs, prioritize based on the isRushed property
        if (!a.isCompleted && !b.isCompleted) {
          return a.isRushed ? -1 : 1;
        }
  
        // For completed repairs, prioritize based on the isCompleted property
        return a.isCompleted ? 1 : 1;
      });
  
      
      setAllRepairs(sortedRepairs);
     
    });
  }, [updatedRepair]);



  //setting the current user (entire object)
  useEffect(() => {
    fetchUsersById(currentUser.id).then((employeeInfo) => {
      setUser(employeeInfo)
    })
  }, [currentUser.id])

  const closePopup = (id) => {
    // Implement the logic to close the popup by updating the state or variable that controls its visibility.
    // For example, you can use state to toggle the visibility.
    setShowTextArea({ ...showTextArea, [id]: false });
  };

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

  
  

  };


  
  

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
        setUpdatedRepair(updatedRepairCopy)
    
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
    <div>
  <section className="section w-1/4 mb-4 mt-20 ml-40 max-h-[850px] overflow-y-auto pb-4 pl-10 pt-11 mr-40 custom-scrollbar rounded-lg custom-border">
  {repairs.map((repair) => {
    const dropoffDate = new Date(repair?.dropoffDate);
    const formattedDate = dropoffDate.toLocaleDateString(undefined, { timeZone: 'UTC' });

    return (
      <div key={repair.id} className={`p-4 mb-4 ml-4 relative bg-gray-600 rounded-lg shadow-md ${repair.isCompleted ? 'transition-all duration-900 transform' : ''}`}>
        <div className="text-white text-xl mb-2">- Order # {reset()} {repair.orderNumber}</div>
        <div className="text-white  mb-2"><span>Customer: {repair.name}</span></div>
        <div className="text-white mb-1.5"><span className="">Email:</span> {repair.email}</div>
        <div className="text-white mb-1.5"><span className="">Phone Number:</span> {repair.phoneNumber}</div>
        <div className="text-white mb-1.5"><span className="">Instrument:</span> {repair.guitarType}</div>
        <div className="list-none pl-4 text-white mb-1.5">
          <span>Services:</span>
          <ul>
            <li className="text-white mb-1.5" key={repair?.service?.id}>- {repair?.service?.service_name}</li>
          </ul>
        </div>
        <div className="text-white mb-1.5"><span className="">Drop off Date:</span> {formattedDate}</div>
        <div className="text-white mb-1.5"><span className="">Additional Details:</span> {repair.additionalDetails}</div>
        <div className="text-white mb-1.5"><span className="">Price:</span> ${repair?.service?.fee}</div>
        {repair.isRushed && (
          <div className="text-red-500 mb-1.5"><strong>+$75 rush fee</strong></div>
        )}
        {repair.isRushed && (
          <div className="text-white mb-1.5"><span className="">Total Due:</span> ${repair?.service?.fee + 75}</div>
        )}
        <div className="pt-3 text-white">
          <span className="pr-2 text-white  mb-1.5">Completed:</span>
          <label className="switch text-white mb-1.5">
            <input
              type="checkbox"
              checked={repair.isCompleted}
              onChange={(event) => {
                 handleOnChange(event, repair) 
                //  handleMessageButton(event, repair.id)
                }}
            />
            <span className="slider round"></span>
          </label>
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 mt-5"
              onClick={(event) => handleMessageButton(event, repair.id)}
            >
              Message Customer
            </button>
          </div>
        </div>
      </div>
    );
  })}
</section>
  
      {/* Pop-up container */}
      {repairs.map((repair) => (
  <div key={`popup-${repair.id}`}>
    {showTextArea[repair.id] && (
      <div className="message-popup">
        <button
          className="absolute top-2 right-2 text-white bg-opacity-10 hover:text-gray-800"
          onClick={() => closePopup(repair.id)}
        >
          <div className="text-2xl">
            <AiFillCloseSquare />
          </div>
        </button>
        <h1 className="text-3xl mb-9 pr-11 pl-11 logo text-white">Send Message</h1>
        <div className="mb-6">
          <textarea
            className=" w-full h-40 p-2 ml-0 text-white border rounded bg-white bg-opacity-10"
            placeholder="Type your message here"
            onChange={(event) => handleMessageChange(event, repair.id)}
          />
        </div>
        <div className="mb-6">
          <button
            className="w-full bg-red-700 hover:bg-red-500 bg-opacity-1 text-white p-3 rounded-md text-xl"
            onClick={(event) => handleSendMessage(event, repair.id)}
          >
            Send Message
          </button>
        </div>
      </div>
    )}
  </div>
))}
    </div>
  );


}



