import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

import Image01 from "../../images/macaquinho.png";
import Image02 from "../../images/user-36-06.jpg";
import Image03 from "../../images/user-36-07.jpg";
import Image04 from "../../images/user-36-08.jpg";
import Image05 from "../../images/user-36-09.jpg";
import { NavLink, useParams } from "react-router-dom";
import api from "../../services/api";
import Loading from "../components/Loading";

function GradeListCard() {
  const { gradeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [grade, setGrade] = useState(null);
  useEffect(() => {
    api.get(`grade/${gradeId}`).then(async (res) => {
      const data = await res.data.grade;
      setGrade(data);
      setIsLoading(false);
    });
  }, [grade]);

  const handleSubmit = (e, studentId) => {
    e.preventDefault();
    api.patch(`user/${studentId}`, { grade_id: null }).then((res) => {
      console.log(res.data);
    });
  }

  return (
    <>{isLoading ? <Loading /> : (<div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Grade <i>{grade.name}'s</i> Students</h2>
      </header>
      <div className="p-3">

        <div className="overflow-x-auto">
          {grade.students.length == 0 ?<p>Nothing to see here...</p>:
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">ID</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Registration</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {grade.students.map((item) => {
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
                            {item.full_name}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">
                          {item.email}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-left">
                          {item.registration}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-left flex flex-row gap-2">
                          <NavLink to={`/user/${item.id}`}>
                            <AiFillEye fontSize={24} />
                          </NavLink>
                          <form onSubmit={(e) => handleSubmit(e, item.id)}>
                            <button type="submit"><BsFillTrashFill className="mt-1" fontSize={19} /></button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        </div>

      </div>
    </div>)
    }
    </>
  );
}

export default GradeListCard;
