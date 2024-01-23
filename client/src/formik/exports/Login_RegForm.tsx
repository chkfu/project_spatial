import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextFieldReuse from '../reuse/TextFieldReuse';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { regEmailTyping, regPasswordTyping, regPasswordConfirmTyping, loginReset } from '../../redux/slices/loginSlice';
import { Dispatch } from '@reduxjs/toolkit';



export default function Login_RegForm() {

  // REDUX
  const regState = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  return (
    <Formik
      enableReinitialize={true}   // Remarks: enable updates
      initialValues={regInitialValues}
      validationSchema={regValidateSchema}
      onSubmit={(values) => RegSubmitHandler(values, dispatch)}>
      {({ setFieldValue }) => (
        <Form className='form_container'>
          <TextFieldReuse changeFn={((event: React.ChangeEvent<HTMLInputElement>) => RegEmailInputer(event, dispatch, setFieldValue))}
            name="email" type="email" placeholder="user@example.com" value={regState.regEmail} />
          <TextFieldReuse changeFn={(event: React.ChangeEvent<HTMLInputElement>) => RegPasswordInputer(event, dispatch, setFieldValue)}
            name="password" type="password" placeholder="&#x2a;&#x2a;&#x2a;&#x2a;&#x2a;&#x2a;&#x2a;&#x2a;" value={regState._regPassword} />
          <TextFieldReuse changeFn={(event: React.ChangeEvent<HTMLInputElement>) => RegPasswordConfirmInputer(event, dispatch, setFieldValue)}
            name="confirm_password" type="password" placeholder="&#x2a;&#x2a;&#x2a;&#x2a;&#x2a;&#x2a;&#x2a;&#x2a;" value={regState._regPasswordConfirm} />

          <div id='reg_btn_box'>
            <button type="submit">Register</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}



// FORMIK STATES
const regInitialValues = {
  email: "",
  password: "",
  confirm_password: ""
};

// FORMIK VALIDATION
const regValidateSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required('Email address is required'),
  password: Yup.string()
    .min(8, "Password contains at least 8 digits.")
    .matches(/^[A-Za-z][A-Za-z0-9!@#$%^&*]*$/, 'Password contains latin characters, numbers and symbols.')
    .required('Password is required.'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], '* Password Confirm does not match.')
    .required('Password Confirmation is required.')
});


// FUNCTIONS
function RegSubmitHandler(values: typeof regInitialValues, dispatch: Dispatch) {
  console.log(values);
  dispatch(loginReset());
}

function RegEmailInputer(event: React.ChangeEvent<HTMLInputElement>, dispatch: Dispatch, setFieldValue: any) {
  dispatch(regEmailTyping(event.target.value));
  setFieldValue("email", event.target.value);
}

function RegPasswordInputer(event: React.ChangeEvent<HTMLInputElement>, dispatch: Dispatch, setFieldValue: any) {
  dispatch(regPasswordTyping(event.target.value));
  setFieldValue("password", event.target.value);
}

function RegPasswordConfirmInputer(event: React.ChangeEvent<HTMLInputElement>, dispatch: Dispatch, setFieldValue: any) {
  dispatch(regPasswordConfirmTyping(event.target.value));
  setFieldValue("confirm_password", event.target.value);
}