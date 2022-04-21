import classes from './Modal.module.css';



const Modal = (props) => {

    const deleteItem = () => {
        fetch(`https://sits-practice-default-rtdb.firebaseio.com/${props.ID.specialID}/${props.ID.firebaseID}/${props.ID.itemId}/.json`, {method: 'DELETE', body: {"Content-Type": "application/json"}}).then(() => {
            props.onClick();
        })
    }

    return (
        <div style = {{position: "fixed",
            backgroundColor: 'white',
            padding: '20px',
            width: "50%",
            borderRadius: '5px',
            textAlign: 'center',
            zIndex: -1}}
            >
                <h1>Are you sure you want to delete this item?</h1>
                <div className = {classes.actions} >
                <div className = {classes.flexItems}>
                    <button style = {{backgroundColor: 'red'}} onClick = {deleteItem}>YES</button>
                    <button style = {{backgroundColor: 'green'}}onClick = {props.onClick}>NO</button>
                </div>
                </div>
        </div>
    )

}



export default Modal;