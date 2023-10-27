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
      completedBy: user.fullName

    }
    


    editedRepairToDatabase(updatedRepair).then(() => {
      fetchAllRepairsServices().then((repairsArray) => {
        setAllRepairs(repairsArray)

      })
    })
  }

  return (
    <section className="mb-4 mt-4">
      {repairs.map((repair) => (
        <div key={repair.id} className="border border-gray-300 p-4 mb-4 ml-4" >
          <div className="font-bold text-lg mb-2">Order # {reset()} {generateRandomOrderNumber()}</div>
          <div className="text-lg font-semibold mb-2">Customer: {repair.name}</div>
          <div><strong>Email:</strong> {repair.email}</div>
          <div><strong>Phone Number:</strong> {repair.phoneNumber}</div>
          <div><strong>Instrument:</strong> {repair.guitarType}</div>
          <ul className="list-none pl-4">
            <strong>Services:</strong>

            <li key={repair.service.id}>- {repair.service.service_name}</li>

          </ul>
          <div><strong>Drop off Date:</strong> {repair.dropoffDate}</div>
          <div><strong>Additional Details:</strong> {repair.additionalDetails}</div>
          <div><strong>Price: </strong>${repair.service.fee} </div>
          {repair.isRushed ? <div className="text-red-600">+$75 rush fee</div> : null}
          {repair.isRushed ? <div><strong>Total Price:</strong> ${repair.service.fee + 75}</div> : null}
          <div className="pt-3">

            <strong className="pr-2">Completed:</strong>

            <label className="switch">
              <>
                <input
                  type="checkbox"
                  checked={repair.isCompleted}
                  onChange={(event) => { handleOnChange(event, repair) }}
                />
                <span className="slider round"></span>
              </>
            </label>



          </div>
          <div className="mt-5">
            

          </div>
        </div>
      ))}
    </section>



  )


}



