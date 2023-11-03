
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

  // useEffect(() => {
  //   fetchAllRepairs().then((repairsArray) => {
  //     setAllRepairs(repairsArray)
  //   })
  // }, [])

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

    <section className=" bg-white pr-10 bg-opacity-10 w-1/3 mb-11 mt-20 ml-40 max-h-[850px] overflow-y-auto pl-10 pt-10 mr-40 custom-scrollbar rounded-lg relative">
      
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
          <div key={repair.id}>
            <div className="font-bold text-3xl mb-11 text-white ">-Order # {repair?.orderNumber}</div>
            <div className="text-lg font-semibold mb-2 text-white"><span className="text-2xl">Customer:</span> {repair?.name}</div>
            <div className="text-white mb-1.5"><strong className="text-xl">Email:</strong> {repair?.email}</div>
            <div className="text-white mb-1.5" ><strong  className="text-xl">Phone Number:</strong> {repair?.phoneNumber}</div>
            <div className="text-white mb-1.5"><strong  className="text-xl">Instrument: </strong>{repair?.guitarType}</div>

            <ul>
              <li>
                <strong className="text-white mb-1.5 text-xl">Services:</strong>
                <p className="text-white mb-1.5">-{repair?.service?.service_name}</p>
              </li>
            </ul>

            <div className="text-white mb-1.5"><strong className="text-xl">Drop off Date: </strong>{formattedDate}</div>
            <div className="text-white mb-1.5 max-w-md overflow-x-auto"><strong className="text-xl">Additional Details: </strong>{repair?.additionalDetails}</div>
            <div className="text-white mb-1.5"><strong className="text-xl">Service Price:</strong> ${repair?.service?.fee} </div>
            {repair.isRushed ? <div className="text-red-600 mb-1.5">+$75 rush fee</div> : null}
            {repair.isRushed ? <div className="text-white mb-1.5"><strong className="text-xl">TotalPrice:</strong> ${repair?.service?.fee + 75}</div> : null}

            <div className="text-white mb-1.5">
              <strong className="1.5 text-xl">Repair Status: </strong>
              {repair.isCompleted ? (
                <span>
                  Ready for Pickup!
                  <div className="bg-blue-700 h-2 mt-4 mb-4 rounded-xl" style={{ width: "100%" }}></div>
                  <div className="text-white mb-1.5 mt-1.5">-Repaired by {repair?.completedBy}</div>
                  <div className="text-white mb-2">Message: {repair?.message}</div>
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




            <div className="mt-5 mb-20">
              <button className="bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={(event) => { navigate(`/repairrequest/${repair.id}`) }}>Make Changes</button>
              <button className="bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded-lg" onClick={(event) => handleCancelRepairRequest(repair.id)}>Cancel</button>
            </div>


            </div>
          );
        })
      )}
    </section>
  );
};

//  const randomNumberGenerator = () => {
//     // Generate a random number between 100,000 and 999,999
//     const min = 100000;
//     const max = 999999;
//     const randomOrderNumber = Math.floor(Math.random() * (max - min + 1)) + min;

//     return randomOrderNumber
//   }




// let totalPrice = 0

// const reset = () => {
//   totalPrice = 0
// }

// const calculatePrice = (serviceName) => {
//   services.map((service) => {
//     if (service?.service_name === serviceName) {
//       totalPrice += service.fee
//     }
//   })
// }















