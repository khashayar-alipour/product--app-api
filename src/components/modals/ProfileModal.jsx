import styles from "./ProfileModal.module.css"

function ProfileModal({setProfile}) {

    const closeHandler = () => {setProfile(null)}

  return (
    <div className={styles.background}>
        <div className={styles.container}>
            <span onClick={closeHandler}>❌</span>
            <h1>Warehouse project</h1>
            <h1>developer: khashayar alipour</h1>
            <h1>HTML, CSS, Java Script, React</h1>
            <h2>practice makes perfect</h2>
        </div>
    </div>
  )
}

export default ProfileModal