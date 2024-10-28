import styles from "./Pagination.module.css"

function Pagination({ page, setPage }) {

    const previousHandler = () => { if (page <= 1) return; setPage((page) => page - 1); console.log("pagination page: " ,page);  };
    const nextHandler = () => { if (page >= 100) return; setPage((page) => page + 1); console.log("pagination page: ",page);};
  
    return (
      <div className={styles.pagination}>
        <button onClick={previousHandler} >Previous</button>
        <p className={page === 1 ? styles.selected : null}>1</p>
        <p className={page === 2 ? styles.selected : null}>2</p>
        <p className={page === 3 ? styles.selected : null}>3</p>
        {page > 3 &&  (
          <>
            <span> ... </span>
            <p className={styles.selected} >{page}</p>
          </>
        )}
        
        <button onClick={nextHandler} >Next</button>
      </div>
    );
  }
  
  export default Pagination;
  