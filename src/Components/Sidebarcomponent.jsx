import { Link,useLocation } from "react-router-dom";
import React from "react";
import { auth } from "../Firebase/firebase";
function Sidebarcomponent({ logo, name, link }) {
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <Link
      to={link}
      className="flex items-center w-1/8 px-4 py-2 text-white hover:bg-gray-600 transition-colors duration-200"
      onClick={name==='Logout'?handleLogout:undefined}    
    >
      <span className="mr-3">{logo}</span>
      <span className="text-xl text-text-primary font-primary font-medium">{name}</span>
    </Link>
  );
}


export default Sidebarcomponent