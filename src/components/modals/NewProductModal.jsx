import styles from "./NewProductModal.module.css"
import { usePost } from "../../services/mutations"

import { useState } from "react";


function NewProductModal({ setNewProductModal }) {


  const closeNewProductModalHandler = () => {setNewProductModal(null)};
  
    //--------------------------------------------[add product mutation]---------------------------------------------------------
    const [product, setProduct] = useState({ name: "", quantity: 0, price: 0 })
    const {mutate} = usePost()

    const addProductChangeHandler = (event) => {
        setProduct((prevProduct) => ({ ...prevProduct, [event.target.name]: event.target.value }));
    }
    
    const productAddHandler = (event) => {
        event.preventDefault();

        const{name, price} = product
        if (!name || !price) return alert("Fill in name and price!")
 
        mutate(product, {
            onSuccess: (data) => {console.log(data.data); setNewProductModal(null); alert("New product added successfuly!"); },
            onError: (error) => (alert(error.response.data.message)) 
          })
    }
    //---------------------------------------------------------------------------------------------------------------------------
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>Add New Product</h1>
        <p>Product Name</p>
        <input type="text" placeholder="Name" name="name" value={product.name} onChange={addProductChangeHandler} />
        <p>Product Quantity</p>
        <input type="number" placeholder="Quantity" name="quantity" value={product.quantity} onChange={addProductChangeHandler} />
        <p>Product Price</p>
        <input type="number" placeholder="Price" name="price" value={product.price} onChange={addProductChangeHandler} />
        <div>
            <p onClick={closeNewProductModalHandler} >Cancel</p>
            <button onClick={productAddHandler}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default NewProductModal;
