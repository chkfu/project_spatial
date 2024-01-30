export default function UserSidebar() {
  return (
    <main className="user_dashboard_layouts">
      {/* A. Sidebar */}
      <aside className="user_dashboard_sidebar">
        {/* A1. Section - Website Title */}
        <TitleContainer />
        {/* A2. Section for scrolling */}
        <div className="div_for_scrolling">
          {/* (1) Section - User Panel */}
          <UserPanel />
          {/* (2) Section - Project Panel */}
          <ProjectPanel />
        </div>
      </aside>
    </main >
  );
}


// COMPONENTS

const TitleContainer = function (): React.ReactNode {
  return (
    <div id="sidebar_section_titleBox">
      <h1>VoiceTale</h1>
    </div>
  );
};

const UserPanel = function (): React.ReactNode {
  // functions
  function SectionTitle() {
    return (
      <div className="sidebar_section_panelheads">
        <img src="/icons/chevron-down.svg" alt="down icon" />
        <h4><b>User</b></h4>
      </div>
    );
  }
  function SectionBody(): React.ReactNode {
    return (
      <div className="sidebar_section_panelbodys">
        <ul>
          <li>Profile</li>
          <li>Calendar</li>
          <li>Logout</li>
        </ul>
      </div>
    );
  }
  // exports
  return (
    <div id="sidebar_section_userPanel" className="sidebar_section_panels">
      <SectionTitle />
      <SectionBody />
    </div>
  );
};
const ProjectPanel = function (): React.ReactNode {
  // functions
  function SectionTitle() {
    return (
      <div className="sidebar_section_panelheads">
        <img src="/icons/chevron-down.svg" alt="down icon" />
        <h4><b>Projects</b></h4>
      </div>
    );
  }
  function SectionBody() {
    return (
      <div id="sidebar_section_projectsPanelBody" className="sidebar_section_panelbodys">
        <details>
          {/* Folder Row */}
          <summary>
            <span>Folder A</span>
          </summary>
          {/* Item List */}
          <ul>
            <li>
              <img src="/icons/mic-fill.svg" alt="interview item icon" />
              <span>Case A</span>
            </li>
            <li>
              <img src="/icons/mic-fill.svg" alt="interview item icon" />
              <span>Case B</span>
            </li>
            <li>
              <img src="/icons/mic-fill.svg" alt="interview item icon" />
              <span>Case C</span>
            </li>
          </ul>
        </details>
      </div>
    );
  }
  // exports
  return (
    <div id="sidebar_section_projectPanel" className="sidebar_section_panels">
      <SectionTitle />
      <SectionBody />
    </div>
  );
};
