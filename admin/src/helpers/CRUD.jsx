import {useState} from "react";
import axios from "axios";

const useCrudComponent = () => {
  const [data, setData] = useState([]);
  const [dataObject, setDataObject] = useState({}); // Change here
  const [formData, setFormData] = useState();
  const [editingId, setEditingId] = useState(null);

  const fetchData = async (apiEndpoint, token) => {
    try {
      const config = {
        // headers: { Authorization: `Bearer ${token}` },
      };
      let response = await axios.get(apiEndpoint, config);

      let dataArray = response.data;

      setData(dataArray); // Set only the array to the data state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchById = async (apiEndpoint, id, token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(`${apiEndpoint}/${id}`, config);

      const dataObject = response.data;

      setDataObject(dataObject);
    } catch (error) {
      console.error("Error fetching data by ID:", error);
      return undefined;
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleCancel = () => {
    setFormData();
  };

  const handleSubmit = async (apiEndpoint, isFormData, token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (editingId) {
        await axios.put(`${apiEndpoint}/${editingId}`, formData, config);
      } else {
        await axios.post(apiEndpoint, formData, config);
        // console.log("test");
      }

      setFormData();
      setEditingId(null);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleDelete = async (id, apiEndpoint, token) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(`${apiEndpoint}/${id}`, config);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = async (item) => {
    setEditingId(item);
  };

  return {
    data,
    dataObject,
    fetchData,
    fetchById,
    handleCancel,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleEdit,
  };
};

export default useCrudComponent;
