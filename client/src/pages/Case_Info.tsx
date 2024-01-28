import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { updateId, updateTitle, updateSummary, updateTime, updateVenue, updateHost, updateGuest, updateLang, updateAuth, resetAll } from '../redux/slices/interviewSlice';
import UserSidebar from "../components/UserSidebar";
import TextFieldReuse from '../formik/reuse/TextFieldReuse';
import SelectFieldReuse from '../formik/reuse/SelectFieldReuse';


// (I) EXPORT

export default function User() {
  return (
    <main id="user_dashboard_caseInfo" className="user_dashboard_frame">
      <UserSidebar />
      {/* B. DashBoard */}
      <section id="user_dashboard_content_personal" className="user_dashboard_contents">
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

  const LanguageList: any = {
    'en-uk': 'English',
    "ar": "Arabic",
    "zh-yue": "Cantonese",
    "fr": "French",
    "de": "German",
    "hi": "Hindi",
    "it": "Italian",
    "ja": "Japanese",
    "ko": "Korean",
    "zh-cn": "Mandarin",
    "es": "Spanish",
    "sw": "Swedish",
    "th": "Thai",
    "tr": "Turkish"
  };

  // INITIAL VALUES
  const caseInfoInitialValues = {
    id: interview._id,
    time: interview.time,
    venue: interview.venue,
    host: interview.host,
    guest: interview._guest,
    lang: interview.lang,
    summary: interview.summary,
    auth: interview.auth,
    createdAt: interview.createdAt
  };

  // FORMIK VALIDATION
  const caseinfoValidateSchema = Yup.object().shape({

  });


  // RETURN
  return (
    <Formik
      enableReinitialize={true}
      initialValues={caseInfoInitialValues}
      validateSchema={caseinfoValidateSchema}
      onSubmit={(values: any) => CaseInfo_Submit_Handler(navigate, values)}>
      {({ setFieldValue }) => (
        <Form>
          <div className="caseInfo_table">
            {/* 1. Heading */}
            <h2 className="caseInfo_heading">Start Your Interview</h2>
            {/* 2. Input Fields */}
            <div>
              <CaseInfo_TextField name='id' value={interview._id} dispatch={dispatch} setFieldValue={setFieldValue} />
              <CaseInfo_TextField name='title' value={interview.title} dispatch={dispatch} setFieldValue={setFieldValue} />
              <CaseInfo_TextField name='summary' value={interview.summary} type="text" dispatch={dispatch} setFieldValue={setFieldValue} />
              <CaseInfo_TextField name='time'
                value={`${temp_yyyy.toString()}-${temp_mm + 1 > 10 ? ((temp_mm + 1).toString()) : ("0" + (temp_mm + 1).toString())}-${temp_dd > 10 ? temp_dd.toString() : ("0" + temp_dd.toString())}`}
                type="date" dispatch={dispatch} setFieldValue={setFieldValue} />
              <CaseInfo_TextField name='venue' value={interview.venue} type="text" dispatch={dispatch} setFieldValue={setFieldValue} />
              <CaseInfo_TextField name='host' value={interview.host} type="text" dispatch={dispatch} setFieldValue={setFieldValue} />
              <CaseInfo_TextField name='guest' value={interview._guest} type="text" dispatch={dispatch} setFieldValue={setFieldValue} />
              <CaseInfo_SelectField name='lang' value={interview.lang} label="language" path="case-information" options={LanguageList} changeFn={(event: React.ChangeEvent<HTMLSelectElement>) => ChangeSelectIdentifier(event, 'lang', dispatch, setFieldValue)} />
              <CaseInfo_TextField name='createdAt' value={`${td_yyyy.toString()} / ${temp_mm + 1 > 10 ? ((td_mm + 1).toString()) : ("0" + (td_mm + 1).toString())} / ${td_dd > 10 ? td_dd.toString() : ("0" + temp_dd.toString())}`} dispatch={dispatch} setFieldValue={setFieldValue} disabled={true} />
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
      {/* label field */}
      <label className="caseInfo_text_field_label" htmlFor={props.name}>
        {props.label}
      </label>
      {/* select field */}
      <div>
        <SelectFieldReuse
          path={props.path}
          name={props.name}
          value={props.value}
          options={props.options}
          changeFn={props.changeFn} />
      </div>
    </div>
  );
};

function CaseInfo_TextField(props: { name: string, value: any, type?: string, dispatch: any, setFieldValue: any, disabled?: boolean; }) {
  return (
    <div className="caseInfo_outerRow">
      <label htmlFor={props.name} className="caseInfo_text_field_label">{props.name}</label>
      <div>
        <TextFieldReuse changeFn={(event: React.ChangeEvent<HTMLInputElement>) => { ChangeInputIdentifier(event, props.name, props.setFieldValue, props.dispatch); }}
          path="case-information" name={props.name} type={props.type || 'text'} value={props.value} disabled={props.disabled} />
      </div>
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
  else if (name = "createdAt") {
    setFieldValue('createdAt', new Date().toDateString());
    dispatch(updateGuest(event.target.value));
  }
}

function ChangeSelectIdentifier(event: React.ChangeEvent<HTMLSelectElement>, name: string, dispatch: any, setFieldValue: any) {
  if (name === 'lang') {
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

