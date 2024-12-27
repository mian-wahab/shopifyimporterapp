import React from "react";
import axios from "axios";

const FileCard = ({ filename, udate, status }) => {
  const date = new Date(udate);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formattedDateTime = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} - ${formatTime(date)}`;

  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero to minutes if needed
    return `${hours}:${minutes}:${date.getSeconds()} ${ampm}`;
  }

   const handleCancel = async () => {
    try {
      // Call the API to update the file status in the database
      await axios.get(`http://localhost:9000/api/upload/cancel/${filename}`);

      window.location.reload();
    } catch (error) {
      console.error("Error cancelling the file:", error);
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row md:justify-between pt-10 pr-10 pl-10 pb-4 rounded-lg cursor-pointer   hover:bg-gray-100 border-b-2 border-slate-300">
      <div className="mb-4 md:mb-0">
        <h3 className="text-xl text-slate-700 font-bold mb-2">{filename}</h3>
        <p className="text-gray-600 text-sm">
          {formattedDateTime} |{" "}
          <a
            href={`http://localhost:9000/uploads/${filename}`}
            className="text-cyan-600 text-sm"
          >
            Download File 
          </a>
          {" "}|{" "}
          <a
            href={`http://localhost:9000/uploads/logs/${filename.replace('.csv', '')}.txt`}
            className="text-teal-600 text-sm"
          >
            Logs 
          </a>
        </p>
      </div>
      <button
        className={` ${
          status === "queue"
            ? "bg-lime-500 text-slate-700"
            : status === "progress"
            ? "bg-amber-600 text-slate-200"
            : status === "failed"
            ? "bg-red-600 text-slate-100"
            : "bg-green-300 text-slate-700"
        } rounded-lg pt-1 pb-1 pr-6 pl-6 mb-10`}
      >
        {status === "queue"
          ? "Queued"
          : status === "progress"
          ? "In Progress"
          : status === "failed"
          ? "Failed"
          : "Success"}
      </button>
    </div>
  );
};

export default FileCard;
