import react from "react";

const Signup = () => {
  return (
    <div>
      <form className={classes.form} onSubmit={(event) => submitHandler(event)}>
        <div className={classes.control}>
          <label htmlFor="Part">Part</label>

          <input
            name="Part"
            type="text"
            value={formData.part || ""}
            onChange={(event) => inputStringChangedHandler(event, "part")}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
