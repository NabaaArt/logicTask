
import { useEffect, useState } from "react";
import "./App.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useAppStore } from "./store";

const EditModal = () => {
  const { open, setOpen, title, price, setTitle, setPrice, id,category } = useAppStore();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setOpen(false)
        alert(`${id} is updated`);
      });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)} center>
      <h2>Edit Product</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <br />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br />
      <br />
      <button onClick={() => handleSave()}>{loading ? "Lodaing...": "Save"}</button>
    </Modal>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const { setOpen, setTitle, setPrice, setID } = useAppStore();

  const loadProducts = async () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

 
  };

  const deleteProduct = async (productID) => {
    fetch(`https://dummyjson.com/products/${productID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isDeleted === true) {
          alert("Delete Successfull!");
        }
      });

   
   
  };
const addProduct=()=>{

}
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
     <button className="add-btn" onClick={() => addProduct()}>Add</button>
      <table>
        
        <thead >
          <tr>
            <th>The Product ID</th>
            <th>The Product Title</th>
            <th>The Product Price</th>
            <th>The Product category</th>
            <th>The Product Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((el, i) => (
            <tr key={i}>
              <td>{el.id}</td>
              <td>{el.title}</td>
              <td>{el.price}</td>
              <td>{el.category}</td>
              <td>
                <button
                className="edit-btn"
                  onClick={() => {
                    setOpen(true);
                    setID(el.id);
                    setTitle(el.title);
                    setPrice(el.price);
                  }}
                >
                  Edit
                </button>
                <button className="delete-btn" onClick={() => deleteProduct(el.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditModal />
    </div>
  );
}

export default App;
