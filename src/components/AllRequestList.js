
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


  return (
    <section className="mb-4 mt-20 ml-20 max-h-[850px] overflow-y-auto pb-4">
      {filteredRepairs.map((repair) => {
        return (
          <div>
            <div className="font-bold text-xl mb-2 text-gray-200">-Order # {repair?.orderNumber}</div>
            <div className="text-lg font-semibold mb-2 text-gray-200">Customer: {repair?.name}</div>
            <div className="text-gray-200 mb-1.5"><strong>Email:</strong> {repair?.email}</div>
            <div className="text-gray-200 mb-1.5" ><strong>Phone Number:</strong> {repair?.phoneNumber}</div>
            <div className="text-gray-200 mb-1.5"><strong>Instrument: </strong>{repair?.guitarType}</div>

            <ul>
              <li>
                <strong className="text-gray-200 mb-1.5">Services:</strong>
                <p className="text-gray-200 mb-1.5">-{repair?.service?.service_name}</p>
              </li>
            </ul>

            <div className="text-gray-200 mb-1.5"><strong>Drop off Date:</strong> {repair?.dropoffDate}</div>
            <div className="text-gray-200 mb-1.5"><strong>Additional Details: </strong>{repair?.additionalDetails}</div>
            <div className="text-gray-200 mb-1.5"><strong>Price:</strong> ${repair?.service?.fee} </div>
            {repair.isRushed ? <div className="text-red-600 mb-1.5">+$75 rush fee</div> : null}
            {repair.isRushed ? <div className="text-gray-200 mb-1.5"><strong>TotalPrice:</strong> ${repair?.service?.fee + 75}</div> : null}

            <div className="text-gray-200 mb-1.5">
              <strong>Repair Status: </strong>
              {repair.isCompleted ? (
                <span>
                  Ready for Pickup
                  <div className="text-gray-200 mb-1.5">-Repaired by {repair?.completedBy}</div>
                  <div className="text-gray-200 mb-1.5">Message: {repair?.message}</div>
                </span>
              ) : (
                "Expect 5 day turnaround from drop off date"
              )}
            </div>




            <div className="mt-5 mb-11">
              <button className="bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={(event) => { navigate(`/repairrequest/${repair.id}`) }}>Make Changes</button>
              <button className="bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded-lg" onClick={(event) => handleCancelRepairRequest(repair.id)}>Cancel</button>
            </div>
    <>
    <div className="text-gray-200 mb-8">---------------------------------</div>
    </>
          </div>
        )
      })}

    </section>
  )
}















