import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import DataTable from "../Table";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import useCrudComponent from "../../helpers/CRUD";
import Cookies from "js-cookie";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

var options = { day: "numeric", month: "numeric", year: "numeric" };

const Admins = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [AllAdmins, setAllAdmins] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const apiEndpoint = `/Users`;

  const { data, fetchData, handleDelete } = useCrudComponent({
    apiEndpoint: `${process.env.REACT_APP_BACKEND}`,
  });

  const ModifyUser = async (action, id, token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let body = {
        userid: id,
      };
      await axios.put(`/Modify/${action}`, body, config);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    fetchData(apiEndpoint, Cookies.get("token"));
  }, [apiEndpoint, isOpen]);

  useEffect(() => {
    let response = data.filter((admin) => admin.isAdmin);
    setAllAdmins(response);
  }, [data]);

  const ModalHandler = () => {
    setIsOpen(!isOpen);
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
      headerName: "Username",
      width: 150,
      resizable: true,
    },
    {
      field: "dateOfBirth",
      headerName: "DOB",
      width: 100,
    },
    { field: "email", headerName: "Email", width: 150, resizable: true },
    {
      field: "User",
      headerName: "User",
      type: "actions",
      width: 70,
      renderCell: ({ row }) => (
        <IconButton
          className="hover:text-red-500"
          onClick={() => {
            ModifyUser(3, row.id, Cookies.get("token"));
            setAllAdmins((prevRows) =>
              prevRows.filter((serv) => serv.id !== row.id)
            );
          }}
        >
          <PersonIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="relative w-full h-full overflow-y-auto">
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
              Admins
            </Typography>
          </Divider>

          {/* <div className="flex space-x-4">
            <Button
              className="bg-primary"
              variant="contained"
              onClick={ModalHandler}
            >
              New
            </Button>
          </div> */}
        </div>

        <div className="h-[72vh]">
          <DataTable
            fetchedData={AllAdmins}
            columns={columns}
            isLoading={isLoading}
            api={`${process.env.REACT_APP_BACKEND}auth/admin/getAdmin`}
            type="Admin"
          />
        </div>
      </div>
    </div>
  );
};

export default Admins;
