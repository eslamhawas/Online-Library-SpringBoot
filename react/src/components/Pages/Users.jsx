import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import DataTable from "../Table";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import useCrudComponent from "../../helpers/CRUD";
import Cookies from "js-cookie";
import IconButton from "@mui/material/IconButton";
import AddUser from "../Add/AddUser";
import axios from "axios";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

var options = { day: "numeric", month: "numeric", year: "numeric" };

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [AllAdmins, setAllAdmins] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [approvedUsers, setApprovedUsers] = useState([]);

  const apiEndpoint = `/users`;

  const { data, fetchData, handleDelete } = useCrudComponent({
    apiEndpoint: `http://localhost:8084/api/v1/users`,
  });

  useEffect(() => {
    fetchData(apiEndpoint, Cookies.get("token"));
  }, [apiEndpoint, isLoading, isOpen]);

  useEffect(() => {
    let nonAdmins = data.filter((user) => !user.isAdmin);
    let response = nonAdmins.filter(
      (user) => !user.isAccepted || user.isAccepted === null
    );

    setAllAdmins(response);
  }, [data]);

  const ModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const ModifyUser = async (action, id, token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let body = {
        userId: id,
      };
      await axios.put(`/users/Modify/${action}`, body, config);
      // If the action is approval (0), add the user to approvedUsers
      if (action === 0) {
        setApprovedUsers((prevApprovedUsers) => [...prevApprovedUsers, id]);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const parseDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Invalid date
      return null;
    }
    return date;
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      resizable: true,
    },
    {
      field: "userName",
      headerName: "User name",
      width: 150,
      resizable: true,
    },
    {
      field: "dateOfBirth",
      headerName: "Date of birth",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      resizable: true,
    },
    {
      field: "Admin",
      headerName: "Admin",
      type: "actions",
      width: 70,
      renderCell: ({ row }) => (
        <IconButton
          className="hover:text-red-500"
          onClick={() => {
            ModifyUser(2, row.id, Cookies.get("token"));
            setAllAdmins((prevRows) =>
              prevRows.filter((serv) => serv.id !== row.id)
            );
          }}
        >
          <AdminPanelSettingsIcon />
        </IconButton>
      ),
    },
    {
      field: "Approve",
      headerName: "Approve",
      type: "actions",
      width: 100,
      renderCell: ({ row }) =>
        !approvedUsers.includes(row.id) && (
          <IconButton
            className="hover:text-red-500"
            onClick={() => {
              ModifyUser(0, row.id, Cookies.get("token"));
              setApprovedUsers((prevRows) =>
                prevRows.filter((serv) => serv.id !== row.id)
              );
            }}
          >
            <CheckIcon />
          </IconButton>
        ),
    },
    {
      field: "Reject",
      headerName: "Reject",
      type: "actions",
      width: 70,
      renderCell: ({ row }) => (
        <IconButton
          className="hover:text-red-500"
          onClick={() => {
            ModifyUser(1, row.id, Cookies.get("token"));
          }}
        >
          <CloseIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="relative w-full  h-full overflow-y-auto">
      <div className="h-full">
        <div className="flex items-center justify-between mb-8">
          <Divider
            textAlign="left"
            variant="middle"
            className="w-4/12"
            sx={{
              "&::before, &::after": {
                borderColor: "#ffffff",
              },
            }}
          >
            <Typography variant="h4" className="text-white">
              Users
            </Typography>
          </Divider>
        </div>

        <div className="h-[72vh]">
          <DataTable
            fetchedData={AllAdmins}
            columns={columns}
            isLoading={isLoading}
            api={`/User`}
            type="User"
          />
        </div>
      </div>
      <AddUser
        render={true}
        apiEndpoint={""}
        HandleModal={() => {}}
        open={isOpen}
        setOpen={setIsOpen}
      />
    </div>
  );
};

export default Users;
