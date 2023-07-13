import { useState } from "react";
import useFormValidation from "../hooks/useFormValidation";
import { useAuth } from "../contexts/auth";



const RegisterPage = () => {



   

    return (
        <section className="h-screen bg-slate-900 p-10">
            <div className="container h-full px-6 py-24">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image"
                        />
                    </div>

                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12 bg-slate-800 rounded-md p-10">
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;