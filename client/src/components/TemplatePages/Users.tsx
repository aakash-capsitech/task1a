import { useState } from 'react';
import UserProfilePanel from '../CardComponenets/UserProfilePanel';
import { UserTable } from '../ListComponents/UserTable';
import PageLayout from '../Navs/PageLayout';

const MainUserTablePage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PageLayout activeItem="Users">
      {!selectedUserId ? (
        <>
          <UserTable
            onUserSelect={setSelectedUserId}
            onLoading={setIsLoading}
          />
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              Loading...
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <UserProfilePanel
            userId={selectedUserId}
            onClose={() => setSelectedUserId(null)}
          />
        </div>
      )}
    </PageLayout>
  );
};

export default MainUserTablePage;
