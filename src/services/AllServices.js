export const fetchAllServicesFromDatabase = () => {
  return fetch("http://localhost:8088/services").then((response) => response.json())

}

export const fetchAllRepairs = () => {
  return fetch("http://localhost:8088/repairs").then((response) => response.json())
}

export const updateNewRepairToDatabase = (newPostObj) => {
  return fetch("http://localhost:8088/repairs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPostObj)
  })
}

export const deleteFromDatabase = (id) => {
  return fetch(`http://localhost:8088/repairs/${id}`, {
    method: "DELETE"
  })
}