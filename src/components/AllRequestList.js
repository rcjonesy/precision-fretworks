import { useParams } from "react-router-dom"
import { fetchAllServicesFromDatabase } from "../services/AllServices"
import { deleteFromDatabase } from "../services/AllServices"
import { fetchAllRepairs } from "../services/AllServices"
import { useEffect, useState } from "react"





export const AllRequestList = ({ currentUser }) => {

  const { userId } = useParams()
  const [services, setAllServices] = useState([])
  const [repairs, setAllRepairs] = useState([])
  const [filteredRepairs, setFilteredRepairs] = useState([])



  useEffect(() => {
    fetchAllServicesFromDatabase().then((servicesArray) => {
      setAllServices(servicesArray);
    })
  }, [])

  useEffect(() => {
    fetchAllRepairs().then((repairsArray) => {
      setAllRepairs(repairsArray);
    })
  }, [])

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

  const calculatePrice = (serviceName) => {
    services.map((service) => {
      if (service.service_name === serviceName) {
        totalPrice += service.fee
      }
    })
  }


  return (
    <section className="mb-4 mt-4">
      {filteredRepairs.map((repair) => (
        <div key={repair.id} className="border border-gray-300 p-4 mb-4 ml-4" >
          <div className="font-bold text-lg mb-2">Order # {reset()} {generateRandomOrderNumber()}</div>
          <div className="text-lg font-semibold mb-2">Customer: {repair.name}</div>
          <div>Email: {repair.email}</div>
          <div>Phone Number: {repair.phoneNumber}</div>
          <div>Guitar: {repair.guitarType}</div>
          <ul className="list-none pl-4">
            Services:
            {
              repair.services.map((service, index) => (
                <li key={index}>- {service} {calculatePrice(service)}</li>
              ))
            }
          </ul>
          <div>Drop off Date: {repair.dropoffDate}</div>
          <div>Completed:</div>
          <div>Additional Details: {repair.additionalDetails}</div>
          <div>Price: ${totalPrice} </div>
          {repair.isRushed ? <div className="text-red-600">+$75 rush fee</div> : null}
          {repair.isRushed ? <div>Total Price = ${totalPrice + 75}</div> : null}
          <div className="mt-5">
            <button className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded-lg mr-2">Make Changes</button>
            <button className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-lg" onClick={(event) => handleCancelRepairRequest(repair.id)}>Cancel</button>
          </div>
        </div>
      ))}
    </section>



  )

}









