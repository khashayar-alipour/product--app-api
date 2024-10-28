import styles from "./HomePage.module.css"

import DeleteModal from "./modals/DeleteModal"
import NewProductModal from "./modals/NewProductModal"
import EditProductModal from "./modals/EditProductModal"
import Products from "./Products"
import {useGetAllProducts} from "../services/queries"

import {useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchProducts from "./SearchProducts"
import Pagination from "./Pagination"


function HomePage() {

    // --------------------------------------------------------------------------------------------------
    const navigate = useNavigate();
    // ----------------------------------------------[pagination]---------------------------------------------

    const[page,setPage] = useState(1)

    // ---------------------------------[add new product query]------------------------------------------
    
        const {data, error, isPending} = useGetAllProducts(page) 
        
        console.log("home number of page: ", page);
    // ----------------------------------------------[Modals]---------------------------------------------

    const [deleteModal, setDeleteModal] = useState(null)
    const [deleteId, setDeleteId] = useState("")   
    const [editId, setEditId] = useState("")
    const deleteHandler = (id) => {setDeleteModal(true); setDeleteId(id); console.log(deleteId);}
    const editHandler = (id) => {setEditProductModal(true); setEditId(id); console.log(editId);}


    const[newProductModal, setNewProductModal] = useState(null)
    const[editProductModal, setEditProductModal] = useState(null)
    
    // ------------------------------------------[searchBox]----------------------------------------------

    const [value, setValue] = useState("")
    const searchBoxChangeHandler = () => {setValue(event.target.value.toLowerCase().trim())}
    let label = value ? null : "Search Product Name..."

    // ----------------------------------------[logout button]--------------------------------------------

    const logoutHandler = () => {navigate("/loginPage")}

    // ---------------------------------------------------------------------------------------------------

  return (
    <div>
        <div className={styles.header}>
            <div className={styles.admin}>
                <div>
                    <p>Khashayar Alipour</p>
                    <p>Admin</p>
                    <h4 onClick={logoutHandler} >Logout</h4>
                </div>
                <span>👽</span>
            </div>
            <div className={styles.search}>
                <div className={styles.input}>
                    <label htmlFor="input">
                        {label}
                    </label>
                    <input hint={label} type="text" id="input" onChange={searchBoxChangeHandler} />
                </div>
                <span>🔎</span>
            </div>
        </div>

        <div className={styles.topOfTable} >
            <div>
                <p>Product management</p>
                <span>🗂️</span>
            </div>
            <button onClick={() => {setNewProductModal(true)}}>Add product</button>
        </div>

        <div className={styles.table} >
            <p>Product name</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Product ID</p>
            <p></p>
        </div>

        {/* {(isPending) && return {<p>Loading...</p>}}
        {(error) && <p>Something went wrong: {error.message} </p>} */}

        {data && value === "" ? 
        (<ul>{data?.data?.data?.map((data => ((<Products key={data?.id} data={data} editHandler={editHandler} deleteHandler={deleteHandler} setDeleteModal={setDeleteModal} setEditProductModal={setEditProductModal} error={error} isPending={isPending} />))))}</ul>) : 
        value !== "" ? <SearchProducts value={value} data={data} /> : <p className={styles.noProductMessage}>No Products Yet!</p>}


        {!!newProductModal && <NewProductModal setNewProductModal={setNewProductModal}/>}
        {/* {!!deleteModal && <DeleteModal data={data} setDeleteModal={setDeleteModal}/>} */}
        {!!deleteModal &&  (<ul>{data.data.data.map(data => (<DeleteModal key={data.id} data={data} deleteId={deleteId} setDeleteModal={setDeleteModal}/>))}</ul>)}
        {!!editProductModal &&  (<ul>{data.data.data.map(data => (<EditProductModal key={data.id} data={data} editId={editId} setEditProductModal={setEditProductModal}/>))}</ul>)}

        <Pagination page={page} setPage={setPage} />
    </div>
  )
}

export default HomePage

// const filteredProduct = Object.values(data).filter((product) => ( (product.name.toLowerCase().includes(value)) ))

