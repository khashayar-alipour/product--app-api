import styles from "./HomePage.module.css"

import DeleteModal from "./modals/DeleteModal"
import NewProductModal from "./modals/NewProductModal"
import EditProductModal from "./modals/EditProductModal"
import Products from "./Products"
import api from "../configs/api"

import {useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import SearchProducts from "./SearchProducts"
import Pagination from "./Pagination"


function HomePage() {

    // --------------------------------------------------------------------------------------------------
    const navigate = useNavigate();
    // ----------------------------------------------[pagination]---------------------------------------------

    const[page,setPage] = useState(1)

    // ---------------------------------[add new product query]------------------------------------------
    
        const queryFn = (data) => {return api.get(`products?page=${page}&limit=10`, data)};
        const queryKey = ["products"];
        const {isLoading, data, isFetching} = useQuery({queryKey, queryFn});      

    // ----------------------------------------------[Modals]---------------------------------------------

    const [deleteModal, setDeleteModal] = useState(null)
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

        {data && value === "" ? 
        (<ul>{data.data.data.map((data => ((<Products key={data.id} data={data} setDeleteModal={setDeleteModal} setEditProductModal={setEditProductModal} />))))}</ul>) : 
        value !== "" ? <SearchProducts value={value} data={data} /> : <p className={styles.noProductMessage}>No Products Yet!</p>}


        {!!newProductModal && <NewProductModal setNewProductModal={setNewProductModal}/>}
        {/* {!!deleteModal && <DeleteModal data={data} setDeleteModal={setDeleteModal}/>} */}
        {!!deleteModal &&  (<ul>{data.data.data.map(data => (<DeleteModal key={data.id} data={data} setDeleteModal={setDeleteModal}/>))}</ul>)}
        {!!editProductModal &&  (<ul>{data.data.data.map(data => (<EditProductModal key={data.id} data={data} setEditProductModal={setEditProductModal}/>))}</ul>)}

        <Pagination page={page} setPage={setPage} />
    </div>
  )
}

export default HomePage

// const filteredProduct = Object.values(data).filter((product) => ( (product.name.toLowerCase().includes(value)) ))

