import {useEffect, useState} from "react";
import DataTable from "../Table";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import useCrudComponent from "../../helpers/CRUD";
import Cookies from "js-cookie";
import AddBook from "../Add/AddBook";

var options = { day: "numeric", month: "numeric", year: "numeric" };

const BorrowedBooks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [AllBlogs, setAllBlogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const apiEndpoint = `http://localhost:8083/api/v1/borrowedBooks`;

  const { data, fetchData, handleDelete } = useCrudComponent({
    apiEndpoint: `http://localhost:8083/api/v1/Book`,
  });

  const columns = [
    {
      field: "bookIsbn",
      headerName: "ISBN",
      width: 150,
      resizable: true,
    },

    {
      field: "userName",
      headerName: "User Name",
      width: 150,
      resizable: true,
    },
    {
      field: "orderNumber",
      headerName: "Order Number",
      width: 150,
      resizable: true,
    },
    {
      field: "bookTitle",
      headerName: "Book Title",
      width: 150,
      resizable: true,
    },

    {
      field: "price",
      headerName: "price",
      width: 150,
      resizable: true,
    },
    {
      field: "dateOfReturn",
      headerName: "Return Date",
      width: 150,
      resizable: true,
    },
    // {
    //   field: "Actions",
    //   type: "actions",
    //   width: 70,
    //   renderCell: ({ row }) => (
    //     <IconButton
    //       className="hover:text-red-500"
    //       onClick={() => {
    //         handleDelete(row.orderNumber, apiEndpoint, Cookies.get("token"));
    //         setAllBlogs((prevRows) =>
    //           prevRows.filter((serv) => serv.orderNumber !== row.orderNumber)
    //         );
    //       }}
    //     >
    //       <Delete />
    //     </IconButton>
    //   ),
    // },
  ];

  useEffect(() => {
    fetchData(apiEndpoint, Cookies.get("token"));
  }, [apiEndpoint, isLoading, isOpen]);

  useEffect(() => {
    // console.log(data.filter((request) => request.isAccepted === "true"));
    setAllBlogs(data.filter((request) => request.isAccepted === "true"));
  }, [data]);

  useEffect(() => {
    // Assuming 'orderNumber' can serve as a unique identifier
    const blogsWithIds = data
      .filter((request) => request.isAccepted === "true")
      .map((blog, index) => ({
        ...blog,
        id: blog.orderNumber, // Assuming 'orderNumber' is unique
      }));
    console.log(blogsWithIds);
    setAllBlogs(blogsWithIds);
  }, [data]);

  const parseDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Invalid date
      return null;
    }
    return date;
  };

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
              Borrowed Books
            </Typography>
          </Divider>
        </div>

        <div className="h-[72vh]">
          <DataTable
            fetchedData={AllBlogs}
            columns={columns}
            isLoading={isLoading}
            api={`/borrowedBooks`}
            type="borrowedBooks"
          />
        </div>
      </div>

      <AddBook open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};

export default BorrowedBooks;
