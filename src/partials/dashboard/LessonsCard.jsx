import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

import { NavLink } from "react-router-dom";
import api from "../../services/api";
import Loading from "../components/Loading";

function LessonsCard({ overflow }) {
  const [isLoading, setIsLoading] = useState(true);
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    api.get("lesson").then(async (res) => {
      const data = await res.data.lessons;
      setLessons(data);
      setIsLoading(false);
    });
  }, [lessons]);

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Lessons</h2>
      </header>
      <div className={`${overflow ? 'overflow-auto' : ''} p-3`}>
        {/* Table */}

        {isLoading ? <Loading /> : (<div className={`${overflow ? 'max-h-96' : ''}`}>
          <table className="w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">ID</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Description</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Enabled</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Teacher</div>
                </th>
                {/* <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Students</div>
                </th> */}
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className={`text-sm divide-y divide-slate-100 ${overflow ? 'overflow-scroll' : ''}`}>
              {lessons.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{item.id}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-slate-800">
                          {item.name}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-medium text-left">
                        {item.description}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className={`text-medium text-left font-semibold ${item.enabled ? 'text-green-600' : 'text-red-600'}`}>
                        {item.enabled ? 'On' : 'Off'}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-left">
                        {item.teacher?.teacher.full_name}
                      </div>
                    </td>
                    {/* <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-left">
                        <NavLink to={`/grade/${item.id}/list`}>
                          {item.students.length}
                        </NavLink>
                      </div>
                    </td> */}
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-left flex flex-row gap-2">
                        <NavLink to={`/lesson/${item.id}`}>
                          <AiFillEye fontSize={24} />
                        </NavLink>
                        <NavLink to={`/lesson/${item.id}/edit`}>
                          <AiFillEdit fontSize={24} />
                        </NavLink>
                        <BsFillTrashFill className="mt-1" fontSize={19} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> </div>)}

      </div>
    </div>
  );
}

export default LessonsCard;
