import Card from '../UI/Card';
import moreClasses from '../Display/DisplayField.module.css';
import formClasses from '../AddField/AddField.module.css';
import classes from "./filter.module.css";
import {useState} from 'react';

const MainFilter = () => {

    const [numberSelected, setNumberSelected ] = useState(true);

    const handleNumberSelected = (id) => {
        setNumberSelected(prevState => {
            if(id === 0 && prevState){
                return prevState
            } else if(id === 1 && !prevState){
                return prevState
            } else {
                return !prevState
            }
        });
    }

    return (
    <Card>
        <div className = {moreClasses.wrap}>
            <h1 style = {{display: 'block'}}>Filter</h1>
            <div className = {classes.actions}>
                <button className = {numberSelected ? classes.backgroundPurple : classes.backgroundWhite} onClick = {() => handleNumberSelected(0)}>Number</button>
                <button className = {numberSelected ? classes.backgroundWhite : classes.backgroundPurple} onClick = {() => handleNumberSelected(1)}>Text</button>
            </div>
            <div className = {formClasses.actions} style = {{textAlign: 'center'}}>
                <button>Add</button>
            </div>

            

        </div>
    </Card>
    );
};


export default MainFilter;