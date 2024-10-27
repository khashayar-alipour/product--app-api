import styles from "./Products.module.css"
// import { useGetProducts } from "../../services/queries"
// import { useEffect } from "react"
// import { useQuery } from "@tanstack/react-query"


function Products({setDeleteModal, setEditProductModal, data}) {

  const {name, price, quantity, id} = data

  const deleteHandler = () => {setDeleteModal(true)}
  const editHandler = () => {setEditProductModal(true)}

  // ----------------------------------------------[product query]------------------------------
  console.log("product component:" ,data);
  
//-----------------------------------------------------------------
  return (
    <>
        <li className={styles.container}>
            <p> {data.name} </p>
            <p> {data.quantity} </p>
            <p> {data.price}$</p>
            <p> {data.id} </p>
            <div>
                <span onClick={() => editHandler()} >✎</span>
                <span onClick={() => deleteHandler()} >🗑</span>
            </div>
        </li>
    </>
  )
}

export default Products