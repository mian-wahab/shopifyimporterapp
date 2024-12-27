import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import FileCard from "../components/FileCard";

function Upload() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      let config = {
        method: "GET",
        url: `http://localhost:9000/api/upload/getall?page=${currentPage}`,
      };
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setList(response.data.data);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage)
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedFile]);  

  //https://app.shopifyimportpro.com

  useEffect(() => {
    // Function to toggle the sidebar
    const toggleSidebar = () => {
      const sidebar = document.getElementById("logo-sidebar");
      sidebar.classList.toggle("-translate-x-full");
    };

    // Add event listener to the toggle button
    const toggleButton = document.querySelector(
      '[data-drawer-toggle="logo-sidebar"]'
    );
    toggleButton.addEventListener("click", toggleSidebar);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      toggleButton.removeEventListener("click", toggleSidebar);
    };
  }, []);

  // Function to handle file selection
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (selectedFile) {
      try {
        // Create FormData object to send file
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Make API call to upload file
        const response = await axios.post(
          "http://localhost:9000/api/upload/post",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle response if needed
        console.log("Upload success:", response.data);
        if (response.data) {
          alert("uploaded to server successfully!");
          setSelectedFile(null);
        }
      } catch (error) {
        // Handle error
        console.error("Upload error:", error);
      }
    } else {
      console.error("No file selected");
      alert("No file selected")
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-dashed rounded-lg mt-5">
        <div className="flex-1 items-center max-w-screen-md mx-auto mt-10 mb-3 p-4 border-2 border-gray-200 bg-white rounded-lg">
          <div>
            <p className="font-bold mb-2">Import</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                {selectedFile ? (
                  <div>{selectedFile.name}</div>
                ) : (
                  <p className="mb-2 text-sm text-gray-500 ">
                    <span className="font-semibold">Click here to upload</span>
                  </p>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                onChange={handleFileChange}
                style={{ height: 0 }}
              />
              <button
                onClick={handleUpload}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
              >
                Upload
              </button>
            </label>
          </div>
        </div>

        <div className="max-w-screen-md mx-auto mt-5 mb-10 p-4 bg-white rounded-lg  border-2 border-gray-200">
          <div>
            <p className="font-bold  mb-2">Scheduled Jobs</p>
          </div>
          {!loading &&
            list.map((value) => (
              <FileCard
                key={value.id}
                filename={value.filename}
                status={value.status}
                udate={value.createdAt}
              />
            ))}
          { loading && (
          <div className="flex items-center justify-center w-full mt-8">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>)
          }
          <div className="flex flex-col items-center mt-8 mb-2">
            <span className="text-sm text-gray-700 ">
              <span className="font-semibold text-gray-900 ">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 ">
              {totalPages}
              </span>{" "}
              Pages
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button onClick={handlePrevPage} disabled={currentPage === 1} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900">
                Prev
              </button>
              <button onClick={handleNextPage} disabled={currentPage === totalPages} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 ">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;