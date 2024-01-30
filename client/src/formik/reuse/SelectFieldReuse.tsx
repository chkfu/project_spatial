import { Field } from 'formik';
import { OuterRowStyleDetector, InnerRowStyleDetector, LabelStyleDetector } from './TextFieldReuse';


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
    <div className={OuterRowStyleDetector(props.path)}>
      <div className={InnerRowStyleDetector(props.path)}>
        <label className={LabelStyleDetector(props.path)} htmlFor={props.name}>
          {props.name.split("_").join(" ")}
        </label>
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
      </div>
    </div>
  );
}


// FUNCTIONS

function InputStyleDetector(path: string) {
  if (path === "case-information")
    return "caseInfo_select_field_input";
  else
    return "";
}