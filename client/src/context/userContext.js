import React, {createContext, useState} from "react";

export const UserContext = createContext();



function UserProvider({ children }) {
  const [user, setUser] = useState({
    id : localStorage.getItem("userId") ,
    name: "Mostafa Mohdy",
    age: 20,
    field: "CS",
  });
  // localStorage.setItem('userId', (user.id));

  const updateUser = () => {
    setUser({
      id : localStorage.getItem("userId") ,  
      name: "MANGOOOO",
      age: 5000,
      field: "el8eeeeet",
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
