import styles from "./NewProductModal.module.css"
import { useState } from "react";
import { usePost } from "../../services/mutations"

function NewProductModal({ setNewProductModal }) {

  // addProductChangeHandler - productAddHandler - product

  const closeNewProductModalHandler = () => {setNewProductModal(null)};
    //--------------------------------------------------------------------------------
    const [product, setProduct] = useState({ name: "", quantity: 0, price: 0 })
    const {mutate} = usePost()

    const addProductChangeHandler = (event) => {
        setProduct((prevProduct) => ({ ...prevProduct, [event.target.name]: event.target.value }));
        console.log("add input Changehandler");
    }
    
    const productAddHandler = (event) => {
        event.preventDefault();

        mutate(product, {
            onSuccess: (data) => {console.log(data.data); setNewProductModal(null); alert("New product added successfuly!")},
            onError: (error) => (console.log(error.response.data.message)) 
          })
    }
    //--------------------------------------------------------------------------------
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>Add New Product</h1>
        <p>Product Name</p>
        <input type="text" placeholder="Name" name="name" value={product.name} onChange={addProductChangeHandler} />
        <p>Product Quantity</p>
        <input type="text" placeholder="Quantity" name="quantity" value={product.quantity} onChange={addProductChangeHandler} />
        <p>Product Price</p>
        <input type="text" placeholder="Price" name="price" value={product.price} onChange={addProductChangeHandler} />
        <div>
            <p onClick={closeNewProductModalHandler} >Cancel</p>
            <button onClick={productAddHandler}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default NewProductModal;
