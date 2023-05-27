import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="mb-6">
        <Heading>Welcome Back</Heading>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <Input
          value={email}
          placeholder={"Email"}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          value={password}
          placeholder={"Password"}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
