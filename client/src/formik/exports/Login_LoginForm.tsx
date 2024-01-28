import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextFieldReuse from '../reuse/TextFieldReuse';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { loginAutoFill, loginEmailTyping, loginPasswordTyping, loginReset } from '../../redux/slices/loginSlice';
import { Dispatch } from '@reduxjs/toolkit';


export default function Login_LoginForm() {

  // REDUX
  const loginState = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  // FORMIK STATES
  const loginInitialValues = {
    email: "",
    password: ""
  };

  // FORMIK VALIDATION
  const loginValidateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address.")
      .required('Email address is required.'),
    password: Yup.string()
      .min(8, "Password contains at least 8 digits.")
      .matches(/^[A-Za-z][A-Za-z0-9!@#$%^&*]*$/, 'Password contains latin characters, numbers and symbols.')
      .required('Password is required.'),
  });


  // FUNCTIONS
  function LoginSubmitHandler(values: typeof loginInitialValues, dispatch: Dispatch) {
    console.log(values);
    dispatch(loginReset());
  }

  function LoginEmailInputer(event: React.ChangeEvent<HTMLInputElement>, dispatch: Dispatch, setFieldValue: any) {
    dispatch(loginEmailTyping(event.target.value));
    setFieldValue("email", event.target.value);
  }

  function LoginPasswordInputer(event: React.ChangeEvent<HTMLInputElement>, dispatch: Dispatch, setFieldValue: any) {
    dispatch(loginPasswordTyping(event.target.value));
    setFieldValue("password", event.target.value);
  }


  // RETURN
  return (
    <Formik
      enableReinitialize={true}   // Remarks: enable updates
      initialValues={loginInitialValues}
      validationSchema={loginValidateSchema}
      onSubmit={(values) => LoginSubmitHandler(values, dispatch)}>
      {({ setFieldValue }) => (
        <Form className='login_form_container'>
          <TextFieldReuse changeFn={((event: React.ChangeEvent<HTMLInputElement>) => LoginEmailInputer(event, dispatch, setFieldValue))}
            path='login' name="email" type="email" placeholder="user@example.com" value={loginState.loginEmail} />
          <TextFieldReuse changeFn={(event: React.ChangeEvent<HTMLInputElement>) => LoginPasswordInputer(event, dispatch, setFieldValue)}
            path='login' name="password" type="password" placeholder="&#x2a;&#x2a;&#x2a;&#x2a;&#x2a;&#x2a;&#x2a;&#x2a;" value={loginState._loginPassword} />

          <div id='login_btn_box'>
            <button type="button" onClick={() => {
              dispatch(loginAutoFill());
              setFieldValue("email", "guest@gmail.com");
              setFieldValue("password", "guestlogin");
              // Remarks: 
              // Unable to update at first click if setting the values from redux states
              // SetFieldValue for initial values update => submit new values
            }}>Be our Guest!</button>
            <button type="submit">Login</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}