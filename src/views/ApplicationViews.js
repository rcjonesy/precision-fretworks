import { useState, } from "react"
import { useEffect } from "react"
import { Route, Outlet, Routes } from "react-router-dom"
import { RepairRequestForm } from "../components/RepairRequestForm"
import { Welcome } from "../components/Welcome"
import { NavBar } from "../components/NavBar"
import { AllRequestList } from "../components/AllRequestList"



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
                        < Welcome />

                    </>

                }>






            </Route>

            <Route path="repairrequest">
                <Route index element={<RepairRequestForm currentUser={currentUser} />} ></Route>
                <Route path=":userId" element={<AllRequestList currentUser={currentUser} />} ></Route>
            </Route>
        </Routes>
    )

}