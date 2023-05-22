import { useEffect, useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import Image01 from "../images/macaquinho.png";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [full_name, setName] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${userId}`).then(async (res) => {
      const data = await res.data.user;
      setUser(data);
      if (full_name === null) {
        setName(data.full_name);
      }
    });
  }, [user]);

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
            <div className="p-8 bg-white shadow mt-24">
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
              </div>

              <div className="mt-20 text-center pb-12">
                <input
                  value={full_name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="text-4xl font-medium text-gray-700"
                />
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => {
                    setBirthday(e.target.value);
                  }}
                  className="text-4xl font-medium text-gray-700"
                />
                <p className="font-light text-gray-600 mt-3">
                  Montes Claros - MG
                </p>

                <p className="mt-8 text-gray-500">7º ano, Turma C</p>
                <p className="mt-2 text-gray-500">Colégio A+</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserEdit;
