import { LoginRulesPage } from '../../ListComponents/LoginRulesPage';
import Topbar from '../Topbar';
import Sidebar from '../Sidebar';
import SB from '../SB';

const PracticeProfile = () => {
  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />

      <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
        <Topbar />

        <div className="d-flex flex-grow-1 bg-light" style={{ overflow: 'hidden' }}>
          {/* Fixed SB */}
          <div
            style={{
              width: '220px', // adjust as needed
              borderRight: '1px solid #e1e1e1',
              overflow: 'hidden',
              height: '100%',
              flexShrink: 0,
            }}
          >
            <SB
              userConfigRoles={[]}
              activeItem="Practice profile"
              setActiveItem={() => {}}
            />
          </div>

          {/* Scrollable Main Content */}
          <div
            className="flex-grow-1 p-3"
            style={{ overflowY: 'auto', height: '100%' }}
          >
            <LoginRulesPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeProfile;
