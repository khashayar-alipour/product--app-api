import styles from "./EditProductModal.module.css"

import {useUpdate} from "../../services/mutations"

import { useState } from "react";
// import { useParams } from "react-router-dom";

function EditProductModal({ setEditProductModal, data }) {

  const {id} = data

  // const {id}=useParams()
  const closeModalHandler = () => {setEditProductModal(null)};
  // -------------------------------------------------------------------------------------------------------------
  const [product, setProduct] = useState({ name: "", quantity: 0, price: 0 })

    const {mutate} = useUpdate(data, console.log("useUpdate: ", data))

    console.log(data);

    // ------------------------------------------[edit product inputs]--------------------------------------------
    const editProductChangeHandler = (event) => {
      setProduct((prevProduct) => ({ ...prevProduct, [event.target.name]: event.target.value }));}
  // ----------------------------------[edit product button]------------------------------------------------------
  const productEditHandler = (event) => {
    event.preventDefault();
    
    mutate(product,data, {
        onSuccess: (data) => {console.log(data.data); setEditProductModal(null); alert("product edited successfuly!")},
        onError: (error) => (alert(error.response.data.message)) 
      })
  }
  // -------------------------------------------------------------------------------------------------------------
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>Edit Product</h1>
        <p>Product Name</p>
        <input type="text" placeholder="Name" name="name" value={product.name} onChange={editProductChangeHandler}/>
        <p>Product Quantity</p>
        <input type="text" placeholder="Quantity" name="quantity" value={product.quantity} onChange={editProductChangeHandler} />
        <p>Product Price</p>
        <input type="text" placeholder="Price" name="price" value={product.price} onChange={editProductChangeHandler} />
        <div>
            <p onClick={closeModalHandler} >Cancel</p>
            <button onClick={productEditHandler}>Edit product</button>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
