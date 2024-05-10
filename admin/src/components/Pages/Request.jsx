import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useCrudComponent from "../../helpers/CRUD";
import Cookies from "js-cookie";
import {Button, Card} from "@mui/material";
import axios from "axios";
import {addDays, format} from "date-fns";

const Request = () => {
  const [AllRequests, setAllRequests] = useState([]);

  const { data, fetchData } = useCrudComponent({
    apiEndpoint: `${process.env.REACT_APP_BACKEND}/borrowedBooks`,
  });

  const apiEndpoint = `http://localhost:8083/api/v1/borrowedBooks`;

  const ModifyUser = async (orderNumber, flag, token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // Calculate return date
      const randomDays = Math.floor(Math.random() * 24) + 7;
      const dateOfReturn = format(
        addDays(new Date(), randomDays),
        "yyyy-MM-dd"
      );

      await axios.put(
        `${apiEndpoint}/update`,
        { orderNumber, isAccepted: flag, dateOfReturn }, // Include returnDate in the payload
        config
      );
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    fetchData(apiEndpoint, Cookies.get("token"));
  }, [apiEndpoint]);

  useEffect(() => {
    setAllRequests(data);
  }, [data]);

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
              Borrow Requests
            </Typography>
          </Divider>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {AllRequests.filter((request) => request.isAccepted === "Pending").map(
          (request, i) => (
            <Card key={i} className="grid place-items-center p-4 space-y-4">
              <div className="grid space-x-2 items-center">
                <Typography className="text-primary">
                  {request.userName}
                </Typography>
                <Typography fontWeight={"bold"}> Wants to Borrow </Typography>
                <Typography className="text-primary ">
                  {request.bookTitle}
                </Typography>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="contained"
                  onClick={() =>
                    ModifyUser(
                      request.orderNumber,
                      true,
                      Cookies.get("token")
                    ).then(() =>
                      setAllRequests((prevRows) =>
                        prevRows.filter(
                          (serv) => serv.orderNumber !== request.orderNumber
                        )
                      )
                    )
                  }
                >
                  Accept
                </Button>
                <Button
                  onClick={() =>
                    ModifyUser(
                      request.orderNumber,
                      false,
                      Cookies.get("token")
                    ).then(() =>
                      setAllRequests((prevRows) =>
                        prevRows.filter(
                          (serv) => serv.orderNumber !== request.orderNumber
                        )
                      )
                    )
                  }
                >
                  Decline
                </Button>
              </div>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default Request;
