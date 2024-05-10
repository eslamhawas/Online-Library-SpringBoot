import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useNavigate} from "react-router-dom";

import {
    AddShoppingCart,
    AddShoppingCartOutlined,
    AdminPanelSettings,
    AdminPanelSettingsOutlined,
    Assessment,
    AssessmentOutlined,
    Book,
    BookOutlined,
    Home,
    HomeOutlined,
    LibraryBooks,
    LibraryBooksOutlined,
    LogoutOutlined,
    Person,
    PersonOutline,
} from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import {AuthContext} from "../helpers/AuthContext";
import Cookies from "js-cookie";

const NestedList = ({ onSelectButton }) => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = React.useState("Admins");
  const { logout } = React.useContext(AuthContext);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    onSelectButton(buttonName);
  };

  return (
    <main
      className={
        "bg-white w-full text-darkBackground shadow shadow-xl flex h-screen flex-col justify-between"
      }
    >
      <List component="nav" aria-labelledby="nested-list-subheader">
        {NavItems.map((item, index) => (
          <div key={index}>
            <ListItemButton
              sx={{
                "&:hover": {
                  "& .MuiListItemIcon-root": {
                    color: selectedButton === item.title ? "" : "#ffffff",
                  },
                },
              }}
              className={`${
                selectedButton === item.title
                  ? "bg-darkBackground text-white hover:text-white hover:bg-darkBackground"
                  : "hover:bg-primary hover:text-white"
              }`}
              key={index}
              onClick={(e) => handleButtonClick(item.title)}
            >
              <ListItemIcon
                className={`${
                  selectedButton === item.title
                    ? "text-white"
                    : "text-darkBackground"
                }`}
              >
                {selectedButton === item.title ? item.selectedIcons : item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </div>
        ))}
      </List>

      <div className="w-full h-fit flex flex-col justify-end">
        <List className="w-full">
          <Divider variant="middle" className="bg-white mb-2" />

          {bottomNav.map((item, index) => (
            <ListItemButton
              sx={{
                "&:hover": {
                  "& .MuiListItemIcon-root": {
                    color: selectedButton === item.title ? "" : "#ffffff",
                  },
                },
              }}
              className={`${
                selectedButton === item.title
                  ? "bg-darkBackground text-white hover:text-white hover:bg-darkBackground"
                  : "hover:bg-darkBackground hover:text-white"
              }`}
              key={index}
              onClick={(e) =>
                logout(Cookies.get("token")).then(() => navigate("/"))
              }
            >
              <ListItemIcon
                className={`${
                  selectedButton === item.title
                    ? "text-white"
                    : "text-darkBackground"
                }`}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </main>
  );
};

export default NestedList;

const NavItems = [
  {
    icon: <HomeOutlined />,
    selectedIcons: <Home />,
    text: "Home",
    title: "Home",
  },
  {
    icon: <AdminPanelSettingsOutlined />,
    selectedIcons: <AdminPanelSettings />,
    text: "Admins",
    title: "Admins",
  },
  {
    icon: <PersonOutline />,
    selectedIcons: <Person />,
    text: "Users",
    title: "Users",
  },
  {
    icon: <BookOutlined />,
    selectedIcons: <Book />,
    text: "Books",
    title: "Books",
  },
  {
    icon: <AddShoppingCartOutlined />,
    selectedIcons: <AddShoppingCart />,
    text: "Borrow Request",
    title: "Request",
  },
  {
    icon: <LibraryBooksOutlined />,
    selectedIcons: <LibraryBooks />,
    text: "Borrowed Books",
    title: "Borrowed Books",
  },
  {
    icon: <AssessmentOutlined />,
    selectedIcons: <Assessment />,
    text: "Reports",
    title: "Report",
  },
];

const bottomNav = [
  { icon: <LogoutOutlined />, text: "Logout", title: "Logout" },
];
