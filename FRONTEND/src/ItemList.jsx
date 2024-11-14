import { Link } from "react-router-dom";

function ItemList({ data, loading }) {
  return (
    <div>
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <ul style={{display:'grid',gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "16px" }}>
          {data.map((item) => (
            <li key={item._id} style={{listStyle:"none", borderRadius: "10px",
              border: "2px solid black", padding: "10px"}}>
              <p>{`Name: ${item.name}`}</p>
              <p>{`Price: ${item.price}`}</p>
              <p>{`Quantity: ${item.quantity}`}</p>
              <Link to={`/edit/${item._id}`}>
                <button>Edit</button>
              </Link>
              <Link to={`/delete/${item._id}`}>
                <button>Delete</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
      
      <Link to="/add">
        <button>Add Item</button>
      </Link>
    </div>
  );
}

export default ItemList;
