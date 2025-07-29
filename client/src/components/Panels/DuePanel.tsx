import { Panel, PanelType } from '@fluentui/react';
import { useEffect } from 'react';

const headerStyles = {
  headerText: {
    fontSize: '15px',
    fontWeight: '20px',
  },
  header: {
    paddingTop: '0px',
  },
  root: {
    fontSize: '5px',
  },
  commands: {
    paddingTop: '0px',
    borderBottom: '1px solid #EAEAEA',
  },
};

export const DuePanel = ({
  isOpen,
  onDismiss,
  dueUserItem,
}: {
  isOpen: boolean;
  onDismiss: () => void;
  dueUserItem: any;
}) => {
  useEffect(() => {
    console.log('due', dueUserItem);
  }, []);

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText="Statement of account"
      closeButtonAriaLabel="Close"
      type={PanelType.custom}
      customWidth="700px"
      isFooterAtBottom
      styles={{
        ...headerStyles,
        root: {},
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h3 style={{
            fontSize: "18px"
          }}>{dueUserItem?.businessName}</h3>
          <p style={{
            maxWidth: "200px"
          }}>35 Bullescroft Road Ha88rn United Kingdom</p>
        </div>
        <div>
          <h3
            style={{
              color: '#2956A4',
              fontSize: "20px"
            }}
          >
            STATEMENT OF ACCOUNT
          </h3>
          <div style={{
            backgroundColor: "#F0F4F8",
            paddingLeft: "4px",
            paddingRight: "4px",
            fontWeight: "500"
          }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <p>Statement date</p>
              <p>{dueUserItem.date}</p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <p>Customer ID</p>
              <p>{dueUserItem.qsid}</p>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
};
