import { useState } from "react";
import NestedList from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ResponsiveAppBar from "./components/Appbar";

const AdminPanel = () => {
  const [selectedButton, setSelectedButton] = useState("Books");
  const handleSelectButton = (buttonName) => setSelectedButton(buttonName);

  return (
    <div className="grid grid-cols-5 border">
      <NestedList onSelectButton={handleSelectButton} />

      <div className="col-span-4 w-full bg-gray-300 space-y-8">
        <ResponsiveAppBar />
        <div className="">
          <Dashboard selectedButton={selectedButton} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
