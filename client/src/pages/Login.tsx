
import { Link } from 'react-router-dom';
import { switchForm } from '../redux/slices/loginSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { loginReset, regReset } from '../redux/slices/loginSlice';
import Login_LoginForm from '../formik/exports/Login_LoginForm';
import Login_RegForm from '../formik/exports/Login_RegForm';




export default function Login(): React.ReactNode {

  // Redux
  const currentForm: string = useAppSelector(state => state.login.formDisplay);

  return (
    <main id="login_page">
      <div id="seciton_frame">
        {currentForm === "login" ? <LOGIN_FORM /> : <REG_FORM />}
      </div>
    </main>
  );
}


// ELEMENTS

function LOGIN_FORM(): React.ReactNode {

  // Redux
  const dispatch = useAppDispatch();

  return (
    <div className="login_page_forms" id="login_form_container">
      {/* Part 1: Network Login Row */}
      <div id="login_network_row">
        <h2>Login to Your Account</h2>
        <p>Explore through your network</p>
        <div>
          <img className="login_icons" src="/icons/google.svg" alt="Google Login Icon" />
          <img className="login_icons" src="/icons/linkedin.svg" alt="Linkedin Login Icon" />
        </div>
      </div>
      {/* Part 2: Formik Login Row */}
      <div id="login_formik_row">
        <Login_LoginForm />
        {/* Part 3: Forget Password */}
        <div id="login_forget_password">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span>Forget Password?</span>
          </Link>
        </div>
        {/* Part 4: Form Switcher */}
        <div id="login_switcher_trigger">
          <p>Not yet a member? <span onClick={() => { FormSwitcherHandler(dispatch, "registration"); }}>Register Now</span>.</p>
        </div>
      </div>
    </div >
  );
};


function REG_FORM(): React.ReactNode {

  // Redux
  const dispatch = useAppDispatch();

  return (
    <div className="login_page_forms" id="reg_form_container">
      {/* Part 1: Network Login Row */}
      <div id="reg_network_row">
        <h2>Welcome to Voicetale</h2>
        <p>Join through your network</p>
        <div>
          <img className="reg_icons" src="/icons/google.svg" alt="Google Registration Icon" />
          <img className="reg_icons" src="/icons/linkedin.svg" alt="Linkedin Registration Icon" />
        </div>
      </div>
      {/* Part 2: Formik Login Row */}
      <div id="reg_formik_row">
        <Login_RegForm />
        {/* Part 3: Form Switcher */}
        <div id="reg_switcher_trigger">
          <p>Already have your account? <span onClick={() => FormSwitcherHandler(dispatch, "login")}>Login Now</span>.</p>
        </div>
      </div>
    </div >
  );
}




// FUNCTIONS

function FormSwitcherHandler(dispatch: any, formRequired: string) {

  dispatch(switchForm(formRequired));
  dispatch(loginReset());
  dispatch(regReset());
}


