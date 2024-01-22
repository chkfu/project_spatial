import { ErrorMessage } from 'formik';

export default function ErrorMsgReuse(props: { name: string; }) {
  return (
    <ErrorMessage name={props.name} render={(message: string): React.ReactNode => {
      return (
        <div className="formik_error_msgs"
          style={{ color: 'red' }}>
          {message}
        </div>
      );
    }} />
  );
}
