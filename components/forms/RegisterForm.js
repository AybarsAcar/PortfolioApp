import { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterForm = (props) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          name="avatar"
          ref={register}
          type="text"
          className="form-control"
          id="avatar"
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          name="username"
          ref={register}
          type="text"
          className="form-control"
          id="username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          ref={register}
          type="email"
          className="form-control"
          id="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          ref={register}
          type="password"
          className="form-control"
          id="password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          name="passwordConfirmation"
          ref={register}
          type="password"
          className="form-control"
          id="passwordConfirmation"
        />
      </div>
      <button type="submit" className="btn btn-main bg-blue py-2 ttu">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
