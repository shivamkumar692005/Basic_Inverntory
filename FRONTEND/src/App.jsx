import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";


import ItemList from "./ItemList";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import AddItem from "./AddItem"; 

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get("http://localhost:8080/api/items");
        setData(resp.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchValue() {
      try {
        const resp = await axios.get("http://localhost:8080/api/items/value");
        setValue(resp.data.totalInventoryValue);
      } catch (error) {
        console.error("Error fetching total value:", error);
      }
    }

    fetchData();
    fetchValue();
  });

  return (
    <Router>
      <div>
        <h1>Inventory Management</h1>
        <h2>Total Inventory Value: {value}</h2>
        <nav>
          <Link to="/">Item List</Link>
          {" | "}
          <Link to="/add">Add Item</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<ItemList data={data} loading={loading} />}
          />
          <Route path="/edit/:id" element={<EditItem  setData= {setData}/>} />
          <Route path="/delete/:id" element={<DeleteItem />} />
          <Route path="/add" element={<AddItem />} /> {/* Add Item route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
