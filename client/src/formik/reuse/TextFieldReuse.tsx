import { Field } from 'formik';
import ErrorMsgReuse from './ErrorMsgReuse';


// TYPES
interface FormikTextFieldProps {
  name: string,
  type: string;
  placeholder?: string;
  value?: string;
  changeFn?: any;
};


export default function TextFieldReuse(props: FormikTextFieldProps) {
  return (
    <div className="text_field_row">
      <div className='text_field_row_main'>
        <label style={{ display: 'flex' }} className="text_field_label" htmlFor={props.name}>
          {
            props.name.split("_").join(" ")
          }
        </label>
        <Field className="text_field_input"
          as="input"
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.changeFn} />
      </div >
      <ErrorMsgReuse name={props.name} />
    </div >
  );
}
