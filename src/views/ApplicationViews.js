import { useState, } from "react"
import { useEffect } from "react"
import { Route, Outlet, Routes } from "react-router-dom"
import { RepairRequestForm } from "../components/RepairRequestForm"
import { Welcome } from "../components/Welcome"
import { NavBar } from "../components/NavBar"
import { AllRequestList } from "../components/AllRequestList"
import { MakeChanges } from "../components/MakeChanges"
import { EmployeePage } from "../components/EmployeePage"
import { MainFooter } from "../components/MainFooter"
import  '../index.css'





export const ApplicationViews = () => {

    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(localLearningUser)
        setCurrentUser(learningUserObject)
    }, [])

    return (

        <Routes>
            <Route
                path="/"
                element={
                    <>
                        < NavBar />
                        {/* outlet */}
                        < Outlet />

                       < MainFooter className="mt-auto" />

                    </>
                }>
                {/* index welcome */}

           



            <Route path="repairrequestform" element={<RepairRequestForm currentUser={currentUser} />}></Route>
            {/* closing route */}

            {/* opening route */}
            <Route path="repairrequest">
                <Route index element={<AllRequestList currentUser={currentUser} />}></Route>
                <Route path=":repairId" element={<MakeChanges currentUser={currentUser} />}></Route>
            </Route>

            <Route path="employees" element={<EmployeePage currentUser={currentUser}/>}></Route>
            </Route>

            {/* opening route */}


        </Routes >
    )

}