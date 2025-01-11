import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ inputDiv, setInputDiv, UpdatedData, setUpdatedData }) => {
  const [Data, setData] = useState({ title: "", desc: "" });
  useEffect(() => {
    setData({ title: UpdatedData.title, desc: UpdatedData.desc });
  }, [UpdatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.post("http://localhost:1000/api/v2/create-task", Data, {
        headers,
      });
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    }
  };

  const updateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.put(
        `http://localhost:1000/api/v2/update-task/${UpdatedData.id}`,
        Data,
        {
          headers,
        }
      );
      setUpdatedData({
        id: "",
        title: "",
        desc: "",
      });
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    }
  };

  return (
    <>
      <div
        className={`${inputDiv} top-0 left-0 bg-gray-700 opacity-50 h-screen w-full`}
      ></div>
      <div
        className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-3/6 bg-gray-900 p-5 rounded">
          <div className="flex justify-end">
            <button
              className="text-xl"
              onClick={() => {
                setInputDiv("hidden");
                setData({
                  title: "",
                  desc: "",
                });
                setUpdatedData({
                  id: "",
                  title: "",
                  desc: "",
                });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded-sm w-full bg-gray-700"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            id=""
            cols="30"
            rows="10"
            placeholder="Description..."
            className="px-3 py-2 rounded-sm w-full bg-gray-700 my-3"
            value={Data.desc}
            onChange={change}
          ></textarea>
          {UpdatedData.id === "" ? (
            <button
              className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
              onClick={updateTask}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
