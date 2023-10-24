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

export const getRepairById = (id) => {
  return fetch(`http://localhost:8088/repairs/${id}`).then((response) => response.json())
}


export const editedRepairToDatabase = (repair) => {
  console.log(repair.id)
  return fetch(`http://localhost:8088/repairs/${repair.id}`, {
      method: "PUT", // Use "PUT" for updating data
      headers: {
          "Content-Type": "application/json", // Fixed the header key
      },
      body: JSON.stringify(repair)
  });
}

export const fetchUsersById = (id) => {
  return fetch (`http://localhost:8088/users/${id}`).then((response) => response.json())
}

