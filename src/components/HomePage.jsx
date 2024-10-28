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
import ProfileModal from "./modals/ProfileModal"


function HomePage() {

    // --------------------------------------------------------------------------------------------------
    const navigate = useNavigate();
    // ----------------------------------------------[success/error alert]---------------------------------------------

    // ----------------------------------------------[pagination]---------------------------------------------

    const[page,setPage] = useState(1)

    // ---------------------------------[add new product query]------------------------------------------
    
        const {data, error, isPending} = useGetAllProducts(page) 
        
    // ----------------------------------------------[Modals]---------------------------------------------

    const[profile, setProfile]= useState(null)
    const profileHandler = () => {setProfile(true)}

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
                <span onClick={profileHandler}>👽</span>
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


        {data && value === "" ? 
        (<ul>{data?.data?.data?.map((data => ((<Products key={data?.id} data={data} editHandler={editHandler} deleteHandler={deleteHandler} error={error} isPending={isPending} />))))}</ul>) : 
        value !== "" ? <SearchProducts value={value} data={data} /> : <p className={styles.noProductMessage}>No Products!</p>}


        {!!newProductModal && <NewProductModal setNewProductModal={setNewProductModal}/>}
        {!!deleteModal && (<DeleteModal data={data}  deleteId={deleteId} setDeleteModal={setDeleteModal}/>) }
        {!!editProductModal &&  (<EditProductModal data={data} editId={editId} setEditProductModal={setEditProductModal}/>)}
        {!!profile && <ProfileModal setProfile={setProfile} />}

        <Pagination page={page} setPage={setPage} />
    </div>
  )
}

export default HomePage
