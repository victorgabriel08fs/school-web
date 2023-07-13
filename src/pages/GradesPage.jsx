import { useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import FilterButton from "../partials/actions/FilterButton";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import GradesCard from "../partials/dashboard/GradesCard";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import Modal from "../partials/components/Modal";
import GradeForm from "../partials/components/Forms/GradeForm";

function GradesPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modal, setModal] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* Dashboard actions */}
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">

                            {/* Right: Actions */}
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-4">
                                {/* Add view button */}
                                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <span onClick={() => setModal(true)} className="hidden xs:block ml-2">Add view</span>
                                    {modal ? <Modal setModal={setModal}><GradeForm setModal={setModal} /></Modal> : ''}
                                </button>
                                {/* Filter button */}
                                <FilterButton />
                            </div>

                        </div>
                        <GradesCard />
                    </div>
                </main>
            </div>
        </div>

    );
}

export default GradesPage;