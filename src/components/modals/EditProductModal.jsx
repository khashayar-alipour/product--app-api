import styles from "./EditProductModal.module.css"

import {useUpdate} from "../../services/mutations"

import { useState } from "react";
// ----------------------------------------------------------------------------

function EditProductModal({ setEditProductModal, editId }) {

  const closeModalHandler = () => {setEditProductModal(null)};
  // -------------------------------------------------------------------------------------------------------------
  const [product, setProduct] = useState({ name: "", quantity: 0, price: 0, ids: [editId] })
  console.log("editModal id:", product.ids);
  const {mutate} = useUpdate()

  // ------------------------------------------[edit product inputs]--------------------------------------------

    const editProductChangeHandler = (event) => {
      setProduct((prevProduct) => ({ ...prevProduct, [event.target.name]: event.target.value }));}

  // ----------------------------------[edit product button]------------------------------------------------------
  const productEditHandler = (event) => {
    event.preventDefault();
    
    mutate(product, {
        onSuccess: (data) => {console.log(data.data); setEditProductModal(null) },
        onError: (error) => (alert(error.response.data.message)) 
      })
  }
  // -------------------------------------------------------------------------------------------------------------
  return (
    <div className={styles.background}>
      <form onSubmit={productEditHandler} className={styles.container}>
        <h1>Edit Product</h1>
        <p>Product Name</p>
        <input type="text" placeholder="Name" name="name" value={product.name} onChange={editProductChangeHandler}/>
        <p>Product Quantity</p>
        <input type="number" placeholder="Quantity" name="quantity" value={product.quantity} onChange={editProductChangeHandler} />
        <p>Product Price</p>
        <input type="number" placeholder="Price" name="price" value={product.price} onChange={editProductChangeHandler} />
        <div>
            <p onClick={closeModalHandler} >Cancel</p>
            <button type="submit" >Edit product</button>
        </div>
      </form>
    </div>
  );
}

export default EditProductModal;
