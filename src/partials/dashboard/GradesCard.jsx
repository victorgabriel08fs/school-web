import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

import Image01 from "../../images/macaquinho.png";
import Image02 from "../../images/user-36-06.jpg";
import Image03 from "../../images/user-36-07.jpg";
import Image04 from "../../images/user-36-08.jpg";
import Image05 from "../../images/user-36-09.jpg";
import { NavLink } from "react-router-dom";
import api from "../../services/api";
import Loading from "../components/Loading";

function GradesCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [grades, setGrades] = useState([]);
  useEffect(() => {
    api.get("grade").then(async (res) => {
      const data = await res.data.grades;
      setGrades(data);
      setIsLoading(false);
    });
  }, [grades]);

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Grades</h2>
      </header>
      <div className="p-3">
        {/* Table */}

        {isLoading ? <Loading /> : (<div className="overflow-x-auto">
          <table className="table-auto w-full">
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
                  <div className="font-semibold text-left">Year</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">School</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Class</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Students</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {grades.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{item.id}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={Image01} width="20" height="20" alt={item.full_name} />
                          </div> */}
                        <div className="font-medium text-slate-800">
                          {item.name}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-left">
                        {item.year}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-left">
                        {item.school}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-left">
                        {item.class}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-left">
                        <NavLink to={`/grade/${item.id}/list`}>
                          {item.students.length}
                        </NavLink>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-left flex flex-row gap-2">
                        <NavLink to={`/user/${item.id}`}>
                          <AiFillEye fontSize={24} />
                        </NavLink>
                        <NavLink to={`/user/${item.id}/edit`}>
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

export default GradesCard;
