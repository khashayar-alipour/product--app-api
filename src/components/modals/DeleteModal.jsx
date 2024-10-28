import { useDelete } from "../../services/mutations"
import styles from "./DeleteModal.module.css"

function DeleteModal({setDeleteModal, data, deleteId}) {

    const closeModalHandler = () => {setDeleteModal(null)}
    // -------------------------------------------------------------------------------------------------------------
    const {mutate} = useDelete()
    // ------------------------------------------[delete product button]--------------------------------------------
    const deleteProductHandler = () => {
      const data = {ids: [deleteId]}
      
    mutate({data}, {
        onSuccess: (data) => {console.log(data.data); closeModalHandler(null) },
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