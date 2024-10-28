import styles from "./Products.module.css"

function Products({ data, error, isPending, deleteHandler, editHandler}) {

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