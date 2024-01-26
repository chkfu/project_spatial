import UserSidebar from "../components/UserSidebar";


// (I) EXPORT

export default function User() {
  return (
    <main id="user_dashboard_personal">
      <UserSidebar />
      {/* B. DashBoard */}
      <section className="user_dashboard_contents">
        <p>Welcome, User.</p>
        <ProjectMain />
      </section>
    </main>
  );
}


// (II) COMPONENTS

const ProjectMain = function () {
  return (
    <div className="user_dashboard_fields">
      <Field_TaskManager />
      <Field_WorkPanel />
    </div >
  );
};


// (III) ELEMENTS

function Field_TaskManager() {
  return (
    <div>
      <Dashboard_SectTitle name="Task Manager" />
      {/* (2) folder section */}
      <div className="dashboard_field_contentBox">
        <Table_Overdue />
        <Table_Upcoming />
      </div>
    </div>
  );
}

function Field_WorkPanel() {
  const WORK_CONSOLE_LIST: Array<string> = ["Local Drive", "Shared Drive"];
  return (
    <div>
      <Dashboard_SectTitle name="Work Console" />
      <div className="dashboard_field_contentBox">
        {
          WORK_CONSOLE_LIST.map((el: string) => (
            <div className="dashboard_field_bodysRows">
              {/* (1) panel title */}
              <h5>{el}</h5>
              {/* (2) panel list */}
              <div className="pending_folder_list">
                <Dashboard_SingleIcon type="folder" />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

function Table_Overdue() {
  return (
    <div className="dashboard_field_bodysRows">
      <h5>Overdue</h5>
      <table className="task_manager_list">
        <TaskManager_TableHead col01="task" col02="overdue" />
        <TaskManager_SingleRow type="overdue" task="task123sdafdsafda 123 123 123 123" duration={1} />
        <TaskManager_SingleRow type="overdue" task="task123 123 123 123 123" duration={1} />
      </table>
    </div>
  );
}

function Table_Upcoming() {
  return (
    <div className="dashboard_field_bodysRows">
      <h5>Upcoming</h5>
      <table className="task_manager_list">
        <TaskManager_TableHead col01="task" col02="date" />
        <TaskManager_SingleRow type="upcoming" task="task123 123 123 123 123" duration={1} />
        <TaskManager_SingleRow type="upcoming" task="task123 123 123 123 123" duration={1} />
      </table>
    </div>
  );
}

function Dashboard_SectTitle(props: { name: string; }): React.ReactNode {
  return (
    <div className="dashboard_field_titles">
      <h4 className="dashboard_field_titleText">
        {props.name}
      </h4>
    </div>
  );
};

function Dashboard_SingleIcon(props: { type: string; }) {
  return (
    <div data-folderName={`${props.type} name`}>
      <img src={`../../public/icons/${props.type}.svg`} alt={`${props.type}`} />
    </div>
  );
}

function TaskManager_TableHead(props: { col01: string, col02: string; }) {
  return (
    <tr>
      <th>{props.col01}</th>
      <th>{props.col02}</th>
    </tr>
  );
}

function TaskManager_SingleRow(props: { type: string, task: string, duration: number; }) {
  return (
    <tr className={`task_listRows ${ColorIdentifier({ input: props.type })}`}>
      <td>{props.task}</td>
      <td>{props.duration}d late</td>
    </tr>
  );
}


// (IV) FUNCTIONS

function ColorIdentifier(props: { input: string; }): string {
  if (props.input === "overdue") {
    return "task_listRow_overdue";
  }
  else if (props.input === "upcoming") {
    return "task_listRow_upcoming";
  }
  else return "";
}