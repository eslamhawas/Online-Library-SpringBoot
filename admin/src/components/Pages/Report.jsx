import {useEffect, useState} from "react";
import useCrudComponent from "../../helpers/CRUD";
import Cookies from "js-cookie";
import {Card, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import axios from "axios";

const Report = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [AllBlogs, setAllBlogs] = useState([]);
  const [bookReport, setBookReport] = useState([]); // New state for book report data

  const apiEndpoint = `/borrowedBooks/report`; // Endpoint for borrowed books
  const bookReportEndpoint = `/report`; // New endpoint for book report

  const { data, fetchData } = useCrudComponent({
    apiEndpoint: `${process.env.REACT_APP_BACKEND}`,
  });

  const GetData = async (token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      // Fetch data from the existing endpoint
      await axios.get(apiEndpoint, config).then((response) => {
        setAllBlogs(response.data);
        console.log(response);
      });
      // Fetch data from the new endpoint
      await axios.get(bookReportEndpoint, config).then((response) => {
        setBookReport(response.data);
        console.log(response);
      });
    } catch (error) {
      console.error("Error Fetching Report");
    }
  };

  useEffect(() => {
    GetData(Cookies.get("token"));
  }, []);

  return (
    <main>
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
              Reports
            </Typography>
          </Divider>
        </div>
        <Card className="space-y-8">
          <Typography>{AllBlogs}</Typography>
          <Typography>{bookReport}</Typography>{" "}
          {/* Displaying book report data */}
        </Card>
      </div>
    </main>
  );
};

export default Report;
