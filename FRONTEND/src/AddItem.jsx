import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for adding a new item
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      const { name, price, quantity } = formData;
      const newItem = await axios.post("http://localhost:8080/api/items", {
        name,
        price,
        quantity,
      });
      navigate("/"); // Redirect to item list after adding
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div>
      <h3>Add Item</h3>
      <form onSubmit={handleSubmitAdd}>
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
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
