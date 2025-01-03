import axios from "axios";
import React, { useState } from "react";

function EditProfile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  function handleUsernameUpdate() {
    let config = {
      method: "get",
      url: `https://shopifyimportpro.com/api/auth/pusername/${username}`,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data) {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("error while fetching");
      });
  }

  function handlePasswordUpdate() {
    if (password === cpassword) {
      let config = {
        method: "get",
        url: `https://shopifyimportpro.com/api/auth/putpass/${username}`,
      };
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data) {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("error while fetching");
        });
    } else {
      alert("both passwords must be same");
    }
  }

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-dashed rounded-lg mt-5">
        <div className="flex-1 items-center max-w-screen-md mx-auto mt-10 mb-3 p-4 border-2 border-gray-200 bg-white rounded-lg">
          <div>
            <p className="font-bold mb-2">Change Username</p>
          </div>
          <div className="p-4  w-full">
            <div>
              <div className="mb-6">
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button
                onClick={handleUsernameUpdate}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 items-center max-w-screen-md mx-auto mt-10 mb-3 p-4 border-2 border-gray-200 bg-white rounded-lg">
          <div>
            <p className="font-bold mb-2">Change Password</p>
          </div>
          <div className="p-4  w-full">
            <div>
              <div className="mb-6">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="•••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  for="confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="•••••••••"
                  required
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handlePasswordUpdate}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
