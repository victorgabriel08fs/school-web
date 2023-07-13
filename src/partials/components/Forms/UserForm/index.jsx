import { useState } from "react";
import { useAuth } from "../../../../contexts/auth";
import useFormValidation from "../../../../hooks/useFormValidation";
import FormError from '../../../components/FormError';
import States from "../../States";

const initialState = {
    email: "",
    password: "",
    full_name: "",
    confirmPassword: "",
    access_types: [],
    birthday: "",
    city: "",
    state: "",
};

const validateForm = (values) => {
    let errors = {};

    if (!values.email.includes("@")) {
        errors.email = "Por favor, insira um e-mail válido.";
    }

    if (!values.email) {
        errors.email = "Por favor, insira um e-mail.";
    }
    if (!values.birthday) {
        errors.birthday = "Por favor, insira uma data.";
    }

    if (values.access_types.length == 0) {
        errors.access_types = "Por favor, selecione um tipo de acesso.";
    }

    if (!values.full_name) {
        errors.full_name = "Por favor, insira um nome.";
    }

    if (!values.password) {
        errors.password = "Por favor, insira uma senha.";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Por favor, confirme sua senha.";
    }

    return errors;
};

const UserForm = ({ setModal }) => {
    const { values, errors, isSubmitting, handleChange, handleChangeCheckBox, handleSubmit } =
        useFormValidation(initialState, validateForm);
    const [checkArray, setCheckArray] = useState([]);
    const context = useAuth();

    const handleCheckbox = (e, type) => {
        const value = e.target.value;
        const checked = e.target.checked;
        var prevArray = [];
        checkArray.map(item => { prevArray.push(item) });


        if (checked) {
            prevArray.push(value);
            setCheckArray(prevArray);
        } else {
            function removeValue(item, index, arr) {
                if (item === value) {
                    arr.splice(index, 1);
                    return true;
                }
                return false;
            }
            prevArray.filter(removeValue);
            setCheckArray(prevArray);
            handleChangeCheckBox('access_types', checkArray);
        }
    };

    return (
        <form
            onSubmit={(e) =>
                handleSubmit(e, () => context.Register(values))
            }
        >
            <div className="relative mb-6" data-te-input-wrapper-init>
                <input
                    type="text"
                    name="email"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput3"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Email address"
                />
                <label
                    htmlFor="exampleFormControlInput3"
                    className={`pointer-events-none  absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-black transition-all duration-200 ease-out ${values.email != "" ? "" : "peer-focus:"
                        }-translate-y-[1.15rem] ${values.email != "" ? "" : "peer-focus:"
                        }scale-[0.8] ${values.email != "" ? "" : "peer-focus:"
                        }text-black peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-black`}
                >
                    Email address
                </label>
            </div>
            {errors.email && <FormError>{errors.email}</FormError>}
            <div className="relative mb-6 mt-3" data-te-input-wrapper-init>
                <input
                    name="full_name"
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput33"
                    value={values.full_name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <label
                    htmlFor="exampleFormControlInput33"
                    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out ${values.full_name != "" ? "" : "peer-focus:"
                        }-translate-y-[1.15rem] ${values.full_name != "" ? "" : "peer-focus:"
                        }scale-[0.8] ${values.full_name != "" ? "" : "peer-focus:"
                        }text-black peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-black`}
                >
                    Name
                </label>
                {errors.full_name && <FormError>{errors.full_name}</FormError>}
            </div>
            <div
                class="relative mb-3"
                data-te-datepicker-init
                data-te-input-wrapper-init>
                <input
                    type="date"
                    name="birthday"
                    value={values.birthday}
                    onChange={handleChange}
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                />
                <label
                    htmlFor="floatingInput"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-black transition-all duration-200 ease-out translate-y-[1.5rem] text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-primary"
                >Birthday
                </label>
                {errors.birthday && <div className="mt-3"><FormError>{errors.birthday}</FormError></div>}
            </div>
            <div className="relative flex m-9-0" data-te-input-wrapper-init>

                <input
                    name="city"
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput37"
                    value={values.city}
                    onChange={handleChange}
                    placeholder="City"
                />
                <label
                    htmlFor="exampleFormControlInput37"
                    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out ${values.city != "" ? "" : "peer-focus:"
                        }-translate-y-[1.15rem] ${values.city != "" ? "" : "peer-focus:"
                        }scale-[0.8] ${values.city != "" ? "" : "peer-focus:"
                        }text-black peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-black`}
                >
                    City
                </label>
                {errors.city && <FormError>{errors.city}</FormError>}

            </div>
            <div className="relative mb-6 mt-3" data-te-input-wrapper-init>
                <select onChange={handleChange} className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0">
                    <option hidden selected value=""></option>
                    <States />
                </select>
                <label
                    htmlFor="exampleFormControlInput37"
                    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out ${values.state != "" ? "" : "peer-focus:"
                        }-translate-y-[1.15rem] ${values.state != "" ? "" : "peer-focus:"
                        }scale-[0.8] ${values.state != "" ? "" : "peer-focus:"
                        }text-black peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-black`}
                >
                    {values.state != "" ? 'State' : ''}
                </label>
                {errors.state && <FormError>{errors.state}</FormError>}
            </div>
            <div className="relative mb-6 mt-3" data-te-input-wrapper-init>
                <input
                    name="password"
                    type="password"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput34"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <label
                    htmlFor="exampleFormControlInput34"
                    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out ${values.password != "" ? "" : "peer-focus:"
                        }-translate-y-[1.15rem] ${values.password != "" ? "" : "peer-focus:"
                        }scale-[0.8] ${values.password != "" ? "" : "peer-focus:"
                        }text-black peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-black`}
                >
                    Password
                </label>
                {errors.password && <FormError>{errors.password}</FormError>}
            </div>
            <div className="relative mb-6 mt-3" data-te-input-wrapper-init>
                <input
                    name="confirmPassword"
                    type="password"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput35"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                />
                <label
                    htmlFor="exampleFormControlInput35"
                    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out ${values.confirmPassword != "" ? "" : "peer-focus:"
                        }-translate-y-[1.15rem] ${values.confirmPassword != "" ? "" : "peer-focus:"
                        }scale-[0.8] ${values.confirmPassword != "" ? "" : "peer-focus:"
                        }text-black peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-black`}
                >
                    Confirm Password
                </label>
                {errors.confirmPassword && <FormError>{errors.confirmPassword}</FormError>}
            </div>
            <hr className="mb-3" />
            <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Access</label>
            <div className="relative mb-6 mt-3" data-te-input-wrapper-init>
                <div class="flex items-center mb-4">
                    <input id="default-checkbox1" type="checkbox" value="Administrador" name="Administrador" onChange={(e) => { handleCheckbox(e) }} class="peer block w-4 h-4 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-800 dark:placeholder:text-neutral-800 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" />
                    <label htmlFor="default-checkbox1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Administrador</label>
                </div>
                <div class="flex items-center mb-4">
                    <input id="default-checkbox2" type="checkbox" value="Professor" name="Professor" onChange={(e) => { handleCheckbox(e) }} class="peer block w-4 h-4 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-800 dark:placeholder:text-neutral-800 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" />
                    <label htmlFor="default-checkbox2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Professor</label>
                </div>
                <div class="flex items-center mb-4">
                    <input id="default-checkbox3" type="checkbox" value="Aluno" name="Aluno" onChange={(e) => { handleCheckbox(e) }} class="peer block w-4 h-4 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-800 dark:placeholder:text-neutral-800 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" />
                    <label htmlFor="default-checkbox3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Aluno</label>
                </div>
                {errors.access_types && <FormError>{errors.access_types}</FormError>}
            </div>
            <hr className="mb-3" />
            <div class="bg-gray-50 gap-3 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="submit" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Save</button>
                <button onClick={() => setModal(false)} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
        </form>
    );
}

export default UserForm;