import classes from '../NewMeetupForm.module.css';

const Checkbox = (props) => {
	return (
		<div className={classes.displayCheckBox}>
			<h2 className={classes.labelCheckbox}>{props.type}</h2>
				<input
					type="checkbox"
					value={props.type || ''}
					checked={props.myCheckedData[props.type] || false}
					onChange={(event) => props.myCheckboxChangedHandler(event, props.type)}
				/>
				</div>
		);
};

export default Checkbox;
