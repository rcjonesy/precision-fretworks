
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




  let totalPrice = 0

  const reset = () => {
    totalPrice = 0
  }

  const calculatePrice = (serviceName) => {
    services.map((service) => {
      if (service.service_name === serviceName) {
        totalPrice += service.fee
      }
    })
  }


  return (
    <section className="mb-4 mt-4">
      {filteredRepairs.map((repair) => {
        return (
          <>
              <div className="font-bold text-lg mb-2">Order # {repair?.orderNumber}</div>
              <div className="text-lg font-semibold mb-2">Customer: {repair?.name}</div>
              <div><strong>Email:</strong> {repair?.email}</div>
              <div><strong>Phone Number:</strong> {repair?.phoneNumber}</div>
              <div><strong>Guitar: </strong>{repair?.guitarType}</div>

              <ul>
                <li>
                <strong>Services:</strong>
                <p>-{repair.service.service_name}</p>
                </li>
              </ul>

              <div><strong>Drop off Date:</strong> {repair.dropoffDate}</div>
              <div><strong>Additional Details: </strong>{repair.additionalDetails}</div>
              <div><strong>Price:</strong> {repair.service.fee} </div>
              {repair.isRushed ? <div className="text-red-600">+$75 rush fee</div> : null}
              {repair.isRushed ? <div><strong>TotalPrice:</strong> ${repair.service.fee + 75}</div> : null}

              <div><strong>Repair Status:</strong></div>
              {repair.isCompleted ?
           <div>
              <div>Ready for Pickup</div> 
              {/* <div>-Repaired by {repair.completedBy}</div>  */}
          </div>:
          <div>Expect 5 day turnaround from drop off date</div>}

            <div className="mt-5">
                  <button className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded-lg mr-2" onClick={(event) => { navigate(`/repairrequest/${repair.id}`) }}>Make Changes</button>
                  <button className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-lg" onClick={(event) => handleCancelRepairRequest(repair.id)}>Cancel</button>
            </div>


                
                
                </>
            )
          })}
          
        </section>


        
)
        }












// {filteredRepairs.map((repair) => (
//   <div key={repair?.id} className="border border-gray-300 p-4 mb-4 ml-4" >
//     <div className="font-bold text-lg mb-2">Order # {reset()} {generateRandomOrderNumber()}</div>
//     <div className="text-lg font-semibold mb-2">Customer: {repair?.name}</div>
//     <div><strong>Email:</strong> {repair?.email}</div>
//     <div><strong>Phone Number:</strong> {repair?.phoneNumber}</div>
//     <div><strong>Guitar: </strong>{repair?.guitarType}</div>



    // <ul className="list-none pl-4">
    //   <strong>Services:</strong>
    //   {
    //     repair.services.map((service, index) => (
    //       <li key={index}>- {service} {calculatePrice(service)}</li>
    //     ))
    //   }
    // </ul>




//     <div><strong>Drop off Date:</strong> {repair.dropoffDate}</div>

//     <div><strong>Additional Details: </strong>{repair.additionalDetails}</div>
//     <div><strong>Price:</strong> ${totalPrice} </div>
//     {repair.isRushed ? <div className="text-red-600">+$75 rush fee</div> : null}
//     {repair.isRushed ? <div><strong>TotalPrice:</strong> ${totalPrice + 75}</div> : null}
//     <div><strong>Repair Status:</strong></div>
//     {repair.isCompleted ?
//       <div>
//       <div>Ready for Pickup</div> 
//       {/* <div>-Repaired by {repair.completedBy}</div>  */}
//       </div>
      
//       :
     
//       <div>Expect 5 day turnaround from drop off date</div>}

//     <div className="mt-5">
//       <button className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded-lg mr-2" onClick={(event) => { navigate(`/repairrequest/${repair.id}`) }}>Make Changes</button>
//       <button className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-lg" onClick={(event) => handleCancelRepairRequest(repair.id)}>Cancel</button>
//     </div>
//   </div>
// ))}