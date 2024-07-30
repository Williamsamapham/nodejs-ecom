import React, { useState, useCallback } from "react";
import { InputField, Button } from "../../components";
import { apiRegister, apiLogin } from "../../apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { register } from "../../store/user/userSlide";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setpayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => ({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    const response = await apiRegister(payload);
    if (isRegister) {
      if (response.success) {
        Swal.fire("Congratulation", response.message, "success").then(() => {
          setIsRegister(false);
          resetPayload();
        });
      } else Swal.fire("Oops!", response.message, "error");
    } else {
      const rs = await apiLogin(data);
      if (rs.success) {
        dispatch(
          register({
            isLoggedIn: true,
            token: rs.accessToken,
            userData: rs.userData,
          })
        );
        navigate(`/${path.HOME}`);
      } else Swal.fire("Oops!", rs.message, "error");
    }
  }, [payload, isRegister, navigate]);
  return (
    <div className="h-screen w-screen relative">
      <img
        src="https://media.vneconomy.vn/w800/images/upload/2024/06/10/ecommerce.png"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setpayload}
                nameKey={"firstname"}
              />
              <InputField
                value={payload.lastname}
                setValue={setpayload}
                nameKey={"lastname"}
              />
            </div>
          )}

          <InputField
            value={payload.email}
            setValue={setpayload}
            nameKey={"email"}
          />
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setpayload}
              nameKey={"mobile"}
            />
          )}
          <InputField
            value={payload.password}
            setValue={setpayload}
            nameKey={"password"}
            type="password"
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnClick={handleSubmit}
            fw
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer">
                Forgot your password
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Create account
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                onClick={() => setIsRegister(false)}
              >
                Already have an account?
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
