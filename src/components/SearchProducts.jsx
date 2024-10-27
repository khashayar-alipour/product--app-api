
import styles from "./SearchProducts.module.css"

function SearchProducts({setDeleteModal, setEditProductModal, data, value}) {

  const deleteHandler = () => {setDeleteModal(true)}
  const editHandler = () => {setEditProductModal(true)}

  return (
    <> 
        {<ul>
            {data.data.data.filter((product) => ( (product.name.toLowerCase().includes(value)))).map((product) => <li className={styles.container} key={product.id}>
              <p> {product.name} </p>
            <p> {product.quantity} </p>
            <p> {product.price}$</p>
            <p> {product.id} </p>
            <div>
                <span onClick={() => editHandler()} >✎</span>
                <span onClick={() => deleteHandler()} >🗑</span>
            </div>
            </li>)}
        </ul>}
    </>
  )
}

export default SearchProducts


