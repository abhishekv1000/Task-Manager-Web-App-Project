import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";

const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportantTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`, {
        headers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [importantButton, setImportantButton] = useState("Incomplete");

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div className="flex flex-col justify-between border border-gray-700 bg-gray-500 rounded-md p-4">
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={` ${
                  items.complete === false ? "bg-red-500" : "bg-green-700"
                } px-3 py-2 rounded w-3/6`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "Incompleted"}
              </button>
              <div className="text-white p-2 w-3/6 text-2xl flex justify-around">
                <button onClick={() => handleImportantTask(items._id)}>
                  {items.important === false ? (
                    <CiHeart />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )}
                </button>
                {home !== "false" &&
                  <button
                    onClick={() =>
                      handleUpdate(items._id, items.title, items.desc)
                    }
                  >
                    <FaEdit />
                  </button>}
                <button onClick={() => deleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          onClick={() => setInputDiv("fixed")}
          className="flex flex-col justify-center items-center bg-gray-500  rounded-sm p-4 text-gray-300 hover:cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <IoIosAddCircle className="text-5xl" />
          <h2 className="text-2xl mt-2">Add tasks</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
