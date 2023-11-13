
import { fetchAllServicesFromDatabase } from "../services/AllServices"
import { deleteFromDatabase } from "../services/AllServices"
import { fetchAllRepairs } from "../services/AllServices"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchAllRepairsServices } from "../services/AllServices"





export const AllRequestList = ({ currentUser }) => {


  const [services, setAllServices] = useState([])
  // this has all expanded repairs
  const [repairs, setAllRepairs] = useState([])
  //this has all of the USER expanded repairs
  const [filteredRepairs, setFilteredRepairs] = useState([])



  const navigate = useNavigate()



  useEffect(() => {
    fetchAllServicesFromDatabase().then((servicesArray) => {
      setAllServices(servicesArray)
    })
  }, [])

  // delete this if it doesnt work
  const handleFetchRepairs = () => {
    fetchAllRepairsServices().then((data) => {
      setAllRepairs(data)
    })
  }

  useEffect(() => {
    handleFetchRepairs()
  }, [])



  // this FILTERS to the USER REPAIRS
  useEffect(() => {
    const filteredRepairs = repairs.filter(repair => repair.userId === currentUser.id)
    setFilteredRepairs(filteredRepairs)
  }, [repairs, currentUser.id])

  const handleCancelRepairRequest = (id) => {
    // Delete the repair and then update the state with filtered repairs
    deleteFromDatabase(id)
      .then(() => {
        // Update the state with filtered repairs
        const updatedRepairs = repairs.filter((repair) => repair.id !== id)
        setAllRepairs(updatedRepairs)

        // Update the filtered list of repairs with the new data
        const filteredRepairs = updatedRepairs.filter((repair) => repair.userId === currentUser.id)
        setFilteredRepairs(filteredRepairs)
      })
  }





  return (

    <section className={`w-1/3 mb-11 mt-20 ml-40 max-h-[850px] overflow-y-auto pl-10 pt-10 mr-40 custom-scrollbar rounded-lg relative`}>
      
      {filteredRepairs.length === 0 ? (
     <div className="text-white text-center text-2xl">No repairs at this time</div>
   ) : (
      
      filteredRepairs.map((repair) => {

        const dropoffDate = new Date(repair?.dropoffDate);
        const formattedDate = dropoffDate.toLocaleDateString(undefined, { timeZone: 'UTC' });
        const fiveDaysLater = new Date(formattedDate);
        fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);

        const formattedPickUpDate = `${fiveDaysLater.getMonth() + 1}/${fiveDaysLater.getDate()}/${fiveDaysLater.getFullYear()}`;

        return (
          <div key={repair.id} className="p-4 mb-4 ml-4 pb-0 relative bg-gray-600 rounded-lg shadow-md">
            <div className="text-white text-xl mb-2">-Order # {repair?.orderNumber}</div>
            <div className="text-white mb-1.5"><span>Customer:</span> {repair?.name}</div>
            <div className="text-white mb-1.5"><span>Email:</span> {repair.email}</div>
            <div className="text-white mb-1.5" ><span >Phone Number:</span> {repair?.phoneNumber}</div>
            <div className="text-white mb-1.5"><span >Instrument: </span>{repair?.guitarType}</div>

            <ul>
              <li>
                <span className="text-white mb-1.5 text-xl">Services:</span>
                <p className="text-white mb-1.5">-{repair?.service?.service_name}</p>
              </li>
            </ul>

            <div className="text-white mb-1.5"><span>Drop off Date: </span>{formattedDate}</div>
            <div className="text-white mb-1.5 max-w-md overflow-x-auto"><span>Additional Details: </span>{repair?.additionalDetails}</div>
            <div className="text-white mb-1.5"><span>Service Price:</span> ${repair?.service?.fee} </div>
            {repair.isRushed ? <strong><div className="text-red-500 mb-1.5">+$75 rush fee</div></strong> : null}
            {repair.isRushed ? <div className="text-white mb-1.5"><span>TotalPrice:</span> ${repair?.service?.fee + 75}</div> : null}

            <div className="text-white mb-1.5">
              <span className="1.5 text-xl">Repair Status: </span>
              {repair.isCompleted ? (
                <span>
                  Ready for Pickup!
                  <div className="text-white mb-2 mt-2">Message: {repair?.message}</div>
                  <div className="bg-blue-700 h-2 mt-4 mb-4 rounded-xl" style={{ width: "100%" }}></div>
                  <div className="text-white mb-1.5 mt-1.5">-Repaired by {repair?.completedBy}</div>
                  {/* Fixed Progress Bar */}
                </span>
              ) : (
                <span className="">
                  Estimated Pickup Date: {formattedPickUpDate}
                  <div className="mt-2">We're working on it...</div>
                  {/* Random Progress Bar */}
                  <div className="bg-gray-300 h-2 mt-4 rounded-xl">
                    <div className="bg-blue-700 h-2 mr-2 " style={{ width: `${Math.random() * 90}%`, maxWidth: "30%" }}></div>

                  </div>
                </span>
              )}

            </div>




            <div className="mt-5 pb-5">
              <button className="bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={(event) => { navigate(`/repairrequest/${repair.id}`) }}>Make Changes</button>
              <button className="bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded-lg" onClick={(event) => handleCancelRepairRequest(repair.id)}>Remove</button>
            </div>


            </div>
          );
        })
      )}
    </section>
  );
};



















