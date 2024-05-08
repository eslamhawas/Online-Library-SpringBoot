import * as React from "react";
import { DataGrid, GridOverlay, gridClasses } from "@mui/x-data-grid";
import TransitionsModal from "./Modal";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/lab";
import useCrudComponent from "../helpers/CRUD";
import Cookies from "js-cookie";

const CustomLoadingOverlay = () => (
  <GridOverlay className="flex flex-col ">
    {[...Array(10)].map((_, index) => (
      <div key={index} className="w-full h-full">
        <Skeleton
          key={index}
          variant="rectangular"
          width="100%"
          height="95%"
          animation="wave"
        />
      </div>
    ))}
  </GridOverlay>
);

export default function DataTable({
  fetchedData,
  columns,
  isLoading,
  type,
  api,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingOverlay, setIsLoading] = useState(true);

  const { dataObject, fetchById, handleEdit } = useCrudComponent({
    apiEndpoint: `${process.env.REACT_APP_BACKEND}`,
  });

  const handleOpenModal = (params) => {
    fetchById(api, params.row.isbn, type, Cookies.get("token"))
      .then(() => handleEdit(dataObject.isbn))
      .finally(() => setIsModalOpen(true))
      .catch((error) => console.error("Error fetching data by ISBN", error));
  };

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    {
      isLoading ? setIsLoading(true) : setIsLoading(false);
    }
  }, [isLoadingOverlay, isLoading]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        maxWidth: "100%",
        background: "white",
        borderRadius: "20px",
        border: "1px solid #1b2d45",
      }}
    >
      <DataGrid
        sx={{
          [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
            outline: "transparent",
          },
          [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
            { outline: "none" },
        }}
        slots={{
          loadingOverlay: CustomLoadingOverlay,
        }}
        className="min-h-[80%]"
        onCellDoubleClick={handleOpenModal}
        disableRowSelectionOnClick
        // onCellClick={handleOpenModal}
        style={{ border: "none" }}
        rows={fetchedData}
        columns={columns}
        getRowId={(row) =>
          type === "Books"
            ? row.isbn
            : type === "borrowedBooks"
            ? row.bookIsbn
            : row.id
        }
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        loading={isLoadingOverlay}
        pageSizeOptions={[10, 20]}
      />
      <TransitionsModal
        type={type}
        api={api}
        data={dataObject && dataObject}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
