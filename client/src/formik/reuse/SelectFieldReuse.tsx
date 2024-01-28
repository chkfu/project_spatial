import { Field } from 'formik';


// TYPES
export interface SelectFieldReuseType {
  path: string,
  name: string,
  value: any,
  options: any,
  changeFn?: any;
}


// EXPORT
export default function SelectFieldReuse(props: SelectFieldReuseType) {
  return (
    <Field
      className={InputStyleDetector(props.path)}
      name={props.name}
      as="select"
      onChange={props.changeFn}>
      {
        Object.keys(props.options).map(key => (
          <option value={key}>{props.options[key]}</option>
        ))
      }
    </Field>
  );
}


// FUNCTIONS

function InputStyleDetector(path: string) {
  if (path === "case-information")
    return "caseInfo_select_field_input";
  else
    return "";
}