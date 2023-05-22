import React from "react";
import "./spinner.css";

export default function Loading() {
    return (
        <div className="flex flex-row gap-4 items-center justify-center">
            <h1 className="truncate mr-2 text-3xl font-medium group-hover:text-slate-800">Loading</h1>
            <div className="spinner-container">
                <div className="loading-spinner">
                </div>
            </div>
        </div>
    );
}