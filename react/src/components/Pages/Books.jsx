import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import DataTable from "../Table";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import useCrudComponent from "../../helpers/CRUD";
import Cookies from "js-cookie";
import IconButton from "@mui/material/IconButton";
import AddBook from "../Add/AddBook";

const Books = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [AllBooks, setAllBooks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const apiEndpoint = `/Book`;

  const { data, fetchData, handleDelete } = useCrudComponent({
    apiEndpoint: `http://localhost:8081/api/v1/Book`,
  });

  const columns = [
    {
      field: "isbn",
      headerName: "ISBN",
      width: 150,
      resizable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      resizable: true,
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      resizable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 200,
      resizable: true,
    },
    {
      field: "rackNumber",
      headerName: "Rack Number",
      width: 200,
      resizable: true,
    },
    {
      field: "stockNumber",
      headerName: "Stock Number",
      width: 150,
      resizable: true,
    },
    {
      field: "Actions",
      type: "actions",
      width: 70,
      renderCell: ({ row }) => (
        <IconButton
          className="hover:text-red-500"
          onClick={() => {
            handleDelete(row.isbn, apiEndpoint, Cookies.get("token"));
            setAllBooks((prevRows) =>
              prevRows.filter((serv) => serv.isbn !== row.isbn)
            );
          }}
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    fetchData(apiEndpoint, Cookies.get("token")).then(() => {
      setIsLoading(false);
    });
  }, [apiEndpoint, isLoading, isOpen]);

  useEffect(() => {
    // const updatedBooks = AllBooks.map((book) => ({
    //   ...book,
    //   id: book.isbn, // use book.isbn or generate a unique ID
    // }));

    // setAllBooks(updatedBooks);

    setAllBooks(data);
  }, [data]);

  const ModalHandler = () => {
    setIsEdit(false);
    setIsOpen(!isOpen);
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
              Books
            </Typography>
          </Divider>

          <div className="flex space-x-4">
            <Button
              className="bg-primary"
              variant="contained"
              onClick={ModalHandler}
            >
              New
            </Button>
          </div>
        </div>

        <div className="h-[72vh]">
          <DataTable
            fetchedData={AllBooks}
            columns={columns}
            isLoading={isLoading}
            api={``}
            type="Books"
          />
        </div>
      </div>

      <AddBook open={isOpen} setOpen={setIsOpen} />
    </div>
  );
};

export default Books;
