import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    let data = JSON.stringify({
      username: username,
      password: password,
    });

    let config = {
      method: "POST",
      url: "http://localhost:9000/api/auth/get",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data) {
          localStorage.setItem("token", "loggedIn");
          navigate("/dashboard");
        }
        else if(response.status===500) {
          alert("Error while fetching data");
        }
        else {
          alert("Incorrect Credentials!");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error while fetching data");
      });
  }
  return (
    <div className="bg-slate-100">
      <div className="flex justify-center items-center h-screen">
        <div className="xl:w-[700px] p-10 h-[400px] rounded-3xl xl:shadow-xl bg-white">
          <h1 className="text-center text-3xl font-bold mt-2 mb-2">Shopify Import Pro Login</h1>
          <hr />
          <div className="flex justify-center mt-10 flex-col gap-6 items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-indigo-400"
              placeholder="Enter your username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-indigo-400"
              placeholder="Enter your password"
            />
            <button
              onClick={() => handleLogin()}
              className="py-3 bg-indigo-400 text-white rounded-md font-bold w-full md:w-[500px]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
