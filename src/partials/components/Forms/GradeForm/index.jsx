import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { useParams } from "react-router-dom";
import FormError from "../../FormError";
import useFormValidation from "../../../../hooks/useFormValidation";

const initialState = {
    email: "",
    password: "",
};

const validateForm = (values) => {
    let errors = {};

    if (!values.class) {
        errors.class = "Por favor, insira um nome.";
    }

    if (!values.year) {
        errors.year = "Por favor, insira um ano.";
    }
    if (!values.school) {
        errors.school = "Por favor, insira escola.";
    }

    return errors;
};

const GradeForm = ({ setModal }) => {

    const { values, errors, isSubmitting, handleChange, handleSubmit } =
        useFormValidation(initialState, validateForm);

    return (
        <form onSubmit={(e) =>
            handleSubmit(e, () => {
                if (!isSubmitting) {
                    api.patch('grade', values).then((res) => {
                    });
                    setModal(false);
                }
            })
        } class="w-full max-w-lg">

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full  px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        Grade
                    </label>
                    <div class="relative">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Class
                            </label>
                            <input name="class" value={values.class} onChange={handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="class" type="text" placeholder="..." />
                            {errors.class && <FormError>{errors.class}</FormError>}
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                                Year
                            </label>
                            <input name="name" value={values.year} onChange={handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="year" type="text" placeholder="..." />
                            {errors.year && <FormError>{errors.year}</FormError>}
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="school">
                                School
                            </label>
                            <input name="name" value={values.school} onChange={handleChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="school" type="text" placeholder="..." />
                            {errors.school && <FormError>{errors.school}</FormError>}
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mb-3" />
            <div class="bg-gray-50 gap-3 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="submit" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Save</button>
                <button onClick={() => setModal(false)} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
        </form>
    );
}

export default GradeForm;