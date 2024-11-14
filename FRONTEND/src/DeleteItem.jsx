import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function DeleteItem() {
  const { id } = useParams(); // Get the item ID from the URL
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/items/${id}`);
      navigate("/"); // Redirect to item list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <h3>Are you sure you want to delete this item?</h3>
      <button onClick={handleDelete}>Yes, delete</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}

export default DeleteItem;
