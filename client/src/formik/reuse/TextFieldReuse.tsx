import { Field } from 'formik';
import ErrorMsgReuse from './ErrorMsgReuse';


// TYPES
interface FormikTextFieldProps {
  path?: string,
  name: string,
  type: string,
  placeholder?: string,
  value?: string,
  changeFn?: any,
  disabled?: boolean;
};


export default function TextFieldReuse(props: FormikTextFieldProps) {
  return (
    <div className={OuterRowStyleDetector(props.path)}>
      <div className={InnerRowStyleDetector(props.path)}>
        <label className={LabelStyleDetector(props.path)} htmlFor={props.name}>
          {props.name.split("_").join(" ")}
        </label>
        <Field
          className={InputStyleDetector(props.path)}
          as="input"
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.changeFn}
          disabled={props.disabled}
        />
      </div >
      <ErrorMsgReuse name={props.name} />
    </div >
  );
}


// FUNCTIONS

export function OuterRowStyleDetector(path?: string) {
  if (path === 'login') return "login_text_field_row";
  if (path === 'case-information') return 'caseInfo_text_field_row';
  else return "";
}


export function InnerRowStyleDetector(path?: string) {
  if (path === 'login') return "login_text_field_row_main";
  if (path === 'case-information') return 'caseInfo_text_field_row_main';
  else return "";
}

export function LabelStyleDetector(path?: string) {
  if (path === 'login') return "login_text_field_label";
  if (path === 'case-information') return 'login_text_field_label';
  else return "";
}

function InputStyleDetector(path?: string) {
  if (path === 'login') return "login_text_field_input";
  if (path === 'case-information') return 'caseInfo_text_field_input';
  else return "";
}