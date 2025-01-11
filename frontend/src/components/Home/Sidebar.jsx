import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All Tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important Tasks",
      icon: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      title: "Completed Tasks",
      icon: <FaCheckDouble />,
      link: "/completedTasks",
    },
    {
      title: "Incompleted Tasks",
      icon: <TbNotebookOff />,
      link: "/incompletedTasks",
    },
  ];

  const [Data, setData] = useState();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  };

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data);
    };
   if (localStorage.getItem("id") && localStorage.getItem("token")) {
     fetch();
   }
  }, []);

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold ">{Data.username}</h2>
          <h4 className="mb-1 text-gray-300">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center hover:bg-slate-600 p-2 rounded transition-all duration-300"
          >
            {items.icon} &nbsp; {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-slate-600 w-full p-2 rounded" onClick={logout}>
          Log out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
