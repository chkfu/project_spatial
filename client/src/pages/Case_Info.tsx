import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { updateId, updateTitle, updateSummary, updateTime, updateVenue, updateHost, updateGuest, updateLang, updateAuth, resetAll } from '../redux/slices/interviewSlice';

import UserSidebar from "../components/UserSidebar";
import TextFieldReuse from '../formik/reuse/TextFieldReuse';
import SelectFieldReuse from '../formik/reuse/SelectFieldReuse';

import { LanguageList } from '../util/declarations';
import bg_video from '/videos/caseinfo_bg_main.mp4';


// (I) EXPORT

export default function User() {
  return (
    <main className="user_dashboard_frame">
      <UserSidebar />
      {/* B. DashBoard */}
      <section id="user_dashboard_content_caseinfo" className="user_dashboard_contents">
        <video autoPlay muted id="caseinfo_video_bg">
          <source src={bg_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <CaseRegister />
      </section>
    </main >
  );
}



// COPONENTS

function CaseRegister() {

  // REDUX
  const interview = useAppSelector(state => state.interview);
  const dispatch = useAppDispatch();

  // Navigation
  const navigate = useNavigate();

  let temp_yyyy: number = Number(new Date(interview.time).getFullYear());
  let temp_mm: number = Number(new Date(interview.time).getMonth());
  let temp_dd: number = Number(new Date(interview.time).getDate());
  let td_yyyy: number = Number(new Date().getFullYear());
  let td_mm: number = Number(new Date().getMonth());
  let td_dd: number = Number(new Date().getDate());

  // INITIAL VALUES
  const caseInfoInitialValues = {
    id: interview._id,
    time: interview.time,
    title: interview.title,
    venue: interview.venue,
    host: interview.host,
    guest: interview._guest,
    language: interview.language,
    summary: interview.summary,
    auth: interview.auth,
    created_at: interview.created_at
  };

  // FORMIK VALIDATION
  const caseinfoValidateSchema = Yup.object().shape({
    id: Yup.string().min(2).required('* ID is required.'),
    time: Yup.number().required('* Time is required.'),
    title: Yup.string().min(2).required('* Title is required.'),
    venue: Yup.string().min(2).required('* Venue is required.'),
    host: Yup.string().min(2).required('* Host is required.'),
    guest: Yup.string().min(2).required('* Guest is required.'),
    language: Yup.string().min(2).required('* Language is required.'),
    summary: Yup.string(),
    auth: Yup.boolean().required("* Guest's Authorization is required."),
  });


  // RETURN
  return (
    <Formik
      enableReinitialize={true}
      initialValues={caseInfoInitialValues}
      validationSchema={caseinfoValidateSchema}
      onSubmit={(values: any) => CaseInfo_Submit_Handler(navigate, values)}>
      {({ setFieldValue }) => (
        <Form>
          <div className="caseInfo_table">
            {/* 1. Heading */}
            <p className="caseInfo_heading">Start Your Interview</p>
            {/* 2. Input Fields */}
            <div className="caseInfo_input_container">
              <div className="caseInfo_flex_double_input_frame">
                <CaseInfo_TextField name='id' value={interview._id} dispatch={dispatch} setFieldValue={setFieldValue} />
                <CaseInfo_TextField name='title' value={interview.title} dispatch={dispatch} setFieldValue={setFieldValue} />
              </div>
              <div className="caseInfo_flex_double_input_frame">
                <CaseInfo_TextField name='summary' value={interview.summary} type="text" dispatch={dispatch} setFieldValue={setFieldValue} />
              </div>
              <div className="caseInfo_flex_double_input_frame">
                <CaseInfo_TextField name='time'
                  value={`${temp_yyyy.toString()}-${temp_mm + 1 > 10 ? ((temp_mm + 1).toString()) : ("0" + (temp_mm + 1).toString())}-${temp_dd > 10 ? temp_dd.toString() : ("0" + temp_dd.toString())}`}
                  type="date" dispatch={dispatch} setFieldValue={setFieldValue} />
                <CaseInfo_TextField name='venue' value={interview.venue} type="text" dispatch={dispatch} setFieldValue={setFieldValue} />
              </div>
              <div className="caseInfo_flex_double_input_frame">
                <CaseInfo_TextField name='host' value={interview.host} type="text" dispatch={dispatch} setFieldValue={setFieldValue} />
                <CaseInfo_TextField name='guest' value={interview._guest} type="text" dispatch={dispatch} setFieldValue={setFieldValue} />
              </div>
              <div className="caseInfo_flex_double_input_frame">
                <CaseInfo_SelectField name='language' value={interview.language} label="language" path="case-information" options={LanguageList} changeFn={(event: React.ChangeEvent<HTMLSelectElement>) => ChangeSelectIdentifier(event, 'language', dispatch, setFieldValue)} />
                <CaseInfo_TextField name='created_at' value={`${td_yyyy.toString()}/${temp_mm + 1 > 10 ? ((td_mm + 1).toString()) : ("0" + (td_mm + 1).toString())}/${td_dd > 10 ? td_dd.toString() : ("0" + temp_dd.toString())}`} dispatch={dispatch} setFieldValue={setFieldValue} disabled={true} />
              </div>
            </div>
            {/* 3. Btn Box */}
            <div className="caseInfo_btn_box">
              <button type='button' onClick={() => CaseInfo_Reset_Handler(dispatch)}>Reset</button>
              <button type='submit'>Start</button>
            </div>
          </div>
        </Form>
      )}

    </Formik>
  );
}

function CaseInfo_SelectField(props: CaseInfo_SelectFieldType): React.ReactNode {
  return (
    <div className="caseInfo_outerRow">
      <SelectFieldReuse
        path={props.path}
        name={props.name}
        value={props.value}
        options={props.options}
        changeFn={props.changeFn} />
    </div>
  );
};

function CaseInfo_TextField(props: { name: string, value: any, type?: string, dispatch: any, setFieldValue: any, disabled?: boolean; }) {
  return (
    <div className="caseInfo_outerRow">
      <TextFieldReuse changeFn={(event: React.ChangeEvent<HTMLInputElement>) => { ChangeInputIdentifier(event, props.name, props.setFieldValue, props.dispatch); }}
        path="case-information" name={props.name} type={props.type || 'text'} value={props.value} disabled={props.disabled} />
    </div>
  );
};




// FUNCTIONS

function CaseInfo_Submit_Handler(navigate: any, values: any) {
  console.log(values);
  navigate('/users/:id/case-speech-recognizer');
  return window.location.reload();
}

function CaseInfo_Reset_Handler(dispatch: any) {
  dispatch(resetAll());
}


function ChangeInputIdentifier(event: React.ChangeEvent<HTMLInputElement>, name: string, setFieldValue: any, dispatch: any) {

  // 2. Condition
  if (name === 'id') {
    setFieldValue('id', event.target.value);
    dispatch(updateId(event.target.value));
  }
  else if (name === 'title') {
    setFieldValue('title', event.target.value);
    dispatch(updateTitle(event.target.value));
  }
  else if (name === 'summary') {
    setFieldValue('summary', event.target.value);
    dispatch(updateSummary(event.target.value));
  }
  else if (name === 'time') {
    console.log(event.target.value);
    let temp_yyyy: number = Number(event.target.value.split('-')[0]);
    let temp_mm: number = Number(event.target.value.split('-')[1]);
    let temp_dd: number = Number(event.target.value.split('-')[2]);
    let timestamp: number = new Date(temp_yyyy, temp_mm, temp_dd).getTime();
    setFieldValue('time', new Date(timestamp));
    dispatch(updateTime(timestamp));
  }
  else if (name === 'venue') {
    setFieldValue('venue', event.target.value);
    dispatch(updateVenue(event.target.value));
  }
  else if (name === 'host') {
    setFieldValue('host', event.target.value);
    dispatch(updateHost(event.target.value));
  }
  else if (name === 'guest') {
    setFieldValue('guest', event.target.value);
    dispatch(updateGuest(event.target.value));
  }
}

function ChangeSelectIdentifier(event: React.ChangeEvent<HTMLSelectElement>, name: string, dispatch: any, setFieldValue: any) {
  if (name === 'language') {
    setFieldValue(name, event.target.value);
    dispatch(updateLang(event.target.value));
  }
}



// TYPES

interface CaseInfo_SelectFieldType {
  path: string,
  name: string,
  value: any,
  options: any,
  changeFn?: any;
  label: string;
}

