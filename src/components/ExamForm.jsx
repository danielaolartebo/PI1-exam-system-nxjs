import styles from "../styles/form.module.css"
import * as Yup from "yup";
import {useRouter} from "next/router";
import {Formik, Field, Form} from "formik";

export default function ExamForm({user}) {
    const router = useRouter();
    const handleSubmit = async (values, {resetForm}) => {
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }
        const res = await fetch('/api/exams', config)
        const data = await res.json();

        await router.push('/student/exam/' + data.access_code + '?username=' + user.username)
    };
    return (
        <div className={styles.login_box + ' p-3 align-self-center'}>
            <h2 className={styles.title_text}>Take an exam</h2>
            <Formik
                initialValues={{
                    access_code: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={
                    Yup.object().shape({
                        access_code: Yup.string().required('This field is required')
                    })
                }>
                {({values, errors, touched}) => (
                    <Form>
                        <div className="mb-3">
                            <Field className="form-control" id="access_code" name="access_code" placeholder="Access code"
                                   aria-describedby="codeHelp"/>
                            {errors.access_code && touched.access_code ? (
                                <div className="validation-error">{errors.access_code}</div>
                            ) : null}
                        </div>
                        <div className={'d-grid gap-0'}>
                            <button type="submit" className="btn btn-secondary">Start</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}