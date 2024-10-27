import { useDelete } from "../../services/mutations"
import styles from "./DeleteModal.module.css"

function DeleteModal({setDeleteModal, data}) {

    const closeModalHandler = () => {setDeleteModal(null)}
    // -------------------------------------------------------------------------------------------------------------
    const {mutate} = useDelete(data.id)
    // ------------------------------------------[delete product button]--------------------------------------------
    const deleteProductHandler = (event) => {
      event.preventDefault();
    
    mutate(data, {
        onSuccess: (data) => {console.log(data.data); closeModalHandler(null); alert("product deleted successfuly!")},
        onError: (error) => (alert(error.response.data.message)) 
      })
    }

    // -------------------------------------------------------------------------------------------------------------
  return (
    <div className={styles.background}>
        <div className={styles.container}>
        <img src="src/assets/close.svg" alt="close image" />
        <h3>Are you sure to delete this product?</h3>
        <div>
            <p onClick={closeModalHandler} >Cancel</p>
            <button onClick={deleteProductHandler}>Delete</button>
        </div>
    </div>
    </div>
  )
}

export default DeleteModal