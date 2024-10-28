import styles from "./Products.module.css"

function Products({setDeleteModal, setEditProductModal, data, error, isPending, deleteHandler, editHandler}) {

  const {name, price, quantity, id} = data

//-----------------------------------------------------------------
  return (
    <>
        <li className={styles.container}>
            <p> {data.name} </p>
            <p> {data.quantity} </p>
            <p> {data.price}$</p>
            <p> {data.id} </p>
            <div>
                <span onClick={() => editHandler(data?.id)} >✎</span>
                <span onClick={() => deleteHandler(data?.id)} >🗑</span>
            </div>
        </li>
    </>
  )
}

export default Products