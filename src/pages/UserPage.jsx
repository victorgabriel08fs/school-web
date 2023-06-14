import { useEffect, useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import Image01 from "../images/macaquinho.png";
import { NavLink, useParams } from "react-router-dom";
import { AiFillEdit, AiOutlineWhatsApp } from "react-icons/ai";
import api from '../services/api';
import moment from 'moment';
import Loading from "../partials/components/Loading";

function UserPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`user/${userId}`).then(async (res) => {
      const data = await res.data.user;
      setUser(data);
    });
  }, [user]);

  function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="p-16">
            {user != null ? (<div className="p-8 bg-white shadow mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="relative">
                  <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                    <img
                      src={Image01}
                      className="h-24 w-24"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    />
                  </div>
                </div>

                <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                  {user.phone != null ? (
                    <a
                      href={`https://wa.me/+55${user.phone}`}
                      target="_blank"
                      className="text-white flex flex-row gap-2 py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-small transition transform hover:-translate-y-0.5"
                    >
                      <AiOutlineWhatsApp className="mt-1" fontSize={20} />
                      Contact
                    </a>
                  ) : (
                    ""
                  )}
                  <NavLink
                    to={`/user/${user.id}/edit`}
                    className="text-white py-2  flex flex-row gap-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    <AiFillEdit fontSize={22} />
                    Edit
                  </NavLink>
                </div>
              </div>

              <div className="mt-20 text-center pb-12">
                <h1 className="text-4xl font-medium text-gray-700">
                  {user.full_name},{" "}
                  <span className="font-light text-gray-500">
                    {getAge(user.birthday) + ` (${moment(user.birthday).format("DD/MM")})`}
                  </span>
                </h1>
                <p className="font-light text-gray-600 mt-3">
                  {user.city + " - " + user.state}
                </p>

                {user.access_types.includes('Aluno') ? <div><p className="mt-8 text-gray-500">{user.grade.class}</p>
                  <p className="mt-2 text-gray-500">{user.grade.school}</p></div> : ''}
                <hr className="mt-4 mb-4" />
                <div className="text-center pb-12">
                  <p className="mt-2 text-gray-500">Cadastrado em: {moment(user.created_at).format("DD/MM/YYYY")}</p>
                </div>
              </div>
            </div>) : <div className="p-8 bg-white shadow mt-24"><Loading /></div>}
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserPage;
