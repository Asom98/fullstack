import React, { useState, useEffect } from "react";
import "./AdminPage.css";

export const AdminPage = () => {
    const[users, setUsers] = useState([])
    const handleRemove = (indexToRemove) => {
        setUsers((prevList) => prevList.filter((_, index) => index !== indexToRemove));
      };

      useEffect(() => {
        async function getUsers() {
          await fetch("http://localhost:5000/getUsers", { method: "get" })
            .then((r) => r.json())
            .then((result) => {
              const userList = result.map((user) => ({
                username: user.username,
                email: user.email,
              }));
              setUsers(userList);
            });
        }
        getUsers();
      }, []);
  return (
    <table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index)=>(
                <tr key= {index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                        <button onClick={()=> handleRemove(index)}>Remove</button>
                        <button onClick={()=> console.log(`${user.username} five head`)}>Send gift</button>
                    </td>

                </tr>
            ))}
        </tbody>
    </table>
  )
}
