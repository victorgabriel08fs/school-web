import { useEffect, useState } from "react";
import api from "../../../../services/api";
import { useParams } from "react-router-dom";

const GradeStudentForm = ({ setModal }) => {
    const { gradeId } = useParams();
    const [students, setStudents] = useState([]);

    const [studentId, setStudentId] = useState(null);

    useEffect(() => {
        api.get(`user?type=Aluno&isNotGrade=${gradeId}`).then(async (res) => {
            const data = await res.data;
            setStudents(data.users);
        });
    }, [students]);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.patch(`user/${studentId}`, { grade_id: gradeId }).then((res) => {
        });
        setModal(false);

    }
    return (
        <form onSubmit={(e) => { handleSubmit(e) }} class="w-full max-w-lg">

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full  px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        Student
                    </label>
                    <div class="relative">
                        <select onChange={(e) => { setStudentId(e.target.value) }} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option selected hidden>...</option>
                            {students.map((item) => {
                                return (<option key={item.id} value={item.id}>{item.full_name}</option>)
                            })}
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
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

export default GradeStudentForm;