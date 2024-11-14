import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditItem({setData}) {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    async function fetchItem() {
      try {
        const resp = await axios.post(`http://localhost:8080/api/items/${id}`);
        setFormData(resp.data);          
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    }
    fetchItem();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedItem = await axios.post(
        `http://localhost:8080/api/items/${id}`,
        formData
      );
      console.log(updatedItem);
      setData((prevData) => 
        prevData.map((item) =>
          item._id === updatedItem.data._id ? updatedItem.data : item 
        )
      );
      
      navigate("/"); // Redirect to item list
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div>
      <h3>Edit Item</h3>
      <form onSubmit={handleSubmitEdit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleFormChange}
          />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleFormChange}
          />
        </label>
        <br />
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
}

export default EditItem;
