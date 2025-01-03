import axios from "axios";
import React, { useEffect, useState } from "react";

function ChangeFTP() {

    const [data,setData] = useState({
        "host": "",
        "username": "",
        "password": "",
        "port": ""    
    })

    const handleInputChange = (field, value) => {
        setData({ ...data, [field]: value });
      };

  function getFTPData() {
    let config = {
      method: "get",
      url: "https://shopifyimportpro.com/api/ftp/get",
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setData(response.data)
      })
      .catch((error) => {
        console.log(error);
        alert("error while fetching")
      });
  }

  function updateFTPData() {
    let config = {
        method: 'post',
        url: 'https://shopifyimportpro.com/api/ftp/put',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        getFTPData()
        alert(response.data.message)
      })
      .catch((error) => {
        console.log(error);
        alert("error while fetching")
      });
  }

  useEffect(()=>{
    getFTPData()
  },[])

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-dashed rounded-lg dark:border-gray-700 mt-5">
        <div className="flex-1 items-center max-w-screen-md mx-auto mt-10 mb-3 p-4 border-2 border-gray-200 bg-white rounded-lg">
          <div>
            <p className="font-bold mb-2">Change FTP Account</p>
          </div>
          <div className="p-4  w-full">
            <div>
              <div className="mb-6">
                <label
                  for="host"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Host
                </label>
                <input
                  type="text"
                  id="host"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={data.host}
                  onChange={(e)=>handleInputChange("host",e.target.value)}

                />
              </div>
              <div className="mb-6">
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={data.username}
                  onChange={(e)=>handleInputChange("username",e.target.value)}
                />
              </div>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="•••••••••"
                  required
                  value={data.password}
                  onChange={(e)=>handleInputChange("password",e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  for="port"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Port
                </label>
                <input
                  type="number"
                  id="port"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="3306"
                  required
                  value={data.port}
                  onChange={(e)=>handleInputChange("port",e.target.value)}
                />
              </div>
              <button
                onClick={updateFTPData}
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

export default ChangeFTP;
