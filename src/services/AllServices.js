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

// this is an expanded version of the previous one
export const getExpandedRepairById = (id) => {
  return fetch(`http://localhost:8088/repairs/${id}?_expand=service`).then((response) => response.json())
}

export const editedRepairToDatabase = (repair) => {
  
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

//delete this if it doenst work
export const fetchAllRepairsServices = () => {
  return fetch("http://localhost:8088/repairs?_expand=service").then((response) => response.json())
}

export const fetchAllGuitars = () => {
  return fetch("http://localhost:8088/guitars").then((response) => response.json())
}

