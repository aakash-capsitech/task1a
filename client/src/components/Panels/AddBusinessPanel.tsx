import {
  Panel,
  PanelType,
  Dropdown,
  TextField,
  PrimaryButton,
  DefaultButton,
  Stack,
  IconButton,
//   RadioGroup,
//   RadioButton,
  ChoiceGroup,
  type IChoiceGroupOption,
  Label,
  Checkbox,
} from '@fluentui/react';
import { useState } from 'react';

const businessTypes = [
  { key: 'limited', text: 'Limited' },
  { key: 'individual', text: 'Individual' },
];

const modeOptions = [
  { key: 'livechat', text: 'Live chat' },
  { key: 'email', text: 'Email' },
  { key: 'phone', text: 'Phone' },
];

const typeOptions = [
  { key: 'work', text: 'Work' },
  { key: 'home', text: 'Home' },
  { key: 'mobile', text: 'Mobile' },
];

export const AddBusinessPanel = ({ isOpen, onDismiss }: { isOpen: boolean; onDismiss: () => void }) => {
  const [businesses, setBusinesses] = useState([{ type: 'limited', nameOrNumber: '' }]);
  const [showContact, setShowContact] = useState(false);
  const [contactMode, setContactMode] = useState<'new' | 'link'>('new');
  const [phoneFields, setPhoneFields] = useState([{ value: '', type: 'work' }]);
  const [emailFields, setEmailFields] = useState([{ value: '', type: 'work' }]);

  const addBusiness = () => setBusinesses([...businesses, { type: 'limited', nameOrNumber: '' }]);
  const removeBusiness = (index: number) => setBusinesses(businesses.filter((_, i) => i !== index));

  const updatePhone = (index: number, field: string, value: string) => {
    const updated = [...phoneFields];
    (updated[index] as any)[field] = value;
    setPhoneFields(updated);
  };

  const updateEmail = (index: number, field: string, value: string) => {
    const updated = [...emailFields];
    (updated[index] as any)[field] = value;
    setEmailFields(updated);
  };

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText="Add business"
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      onRenderFooterContent={() => (
        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}>
          <DefaultButton text="Cancel" onClick={onDismiss} />
          <PrimaryButton text="Save" onClick={() => {}} />
        </Stack>
      )}
      isFooterAtBottom
    >
      <Stack tokens={{ childrenGap: 16 }}>
        {businesses.map((b, idx) => (
          <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="end" key={idx}>
            <Dropdown
              label="Type"
              options={businessTypes}
              selectedKey={b.type}
              onChange={(_, option) => {
                const updated = [...businesses];
                updated[idx].type = option?.key as string;
                setBusinesses(updated);
              }}
              styles={{ root: { width: 180 } }}
            />
            <TextField
              label="Business name or number"
              value={b.nameOrNumber}
              onChange={(_, val) => {
                const updated = [...businesses];
                updated[idx].nameOrNumber = val ?? '';
                setBusinesses(updated);
              }}
              styles={{ root: { flex: 1 } }}
            />
            {idx === businesses.length - 1 ? (
              <IconButton iconProps={{ iconName: 'Add' }} onClick={addBusiness} />
            ) : (
              <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => removeBusiness(idx)} />
            )}
          </Stack>
        ))}

        <DefaultButton
          text={showContact ? '− Contact' : '+ Contact'}
          onClick={() => setShowContact(!showContact)}
        />

        {showContact && (
          <>
            {/* <RadioGroup
              selectedKey={contactMode}
              onChange={(_: any, option: { key: string; }) => setContactMode(option?.key as 'new' | 'link')}
              styles={{ root: { marginTop: 10 } }}
            >
              <RadioButton key="new" text="Add new contact" />
              <RadioButton key="link" text="Link with existing contact" />
            </RadioGroup> */}

            <ChoiceGroup
                selectedKey={contactMode}
                options={[
                    { key: 'new', text: 'Add new contact' },
                    { key: 'link', text: 'Link with existing contact' },
                ]}
                onChange={(_, option) => setContactMode(option?.key as 'new' | 'link')}
            />


            {contactMode === 'new' && (
              <>
                <Stack horizontal tokens={{ childrenGap: 8 }}>
                  <TextField label="First name" styles={{ root: { flex: 1 } }} />
                  <TextField label="Last name" styles={{ root: { flex: 1 } }} />
                  <DefaultButton text="Alias" />
                </Stack>

                <Stack horizontal tokens={{ childrenGap: 8 }}>
                  <TextField label="Designation" styles={{ root: { flex: 1 } }} />
                  <Dropdown label="Mode" options={modeOptions} selectedKey="livechat" styles={{ root: { width: 200 } }} />
                </Stack>

                <Label>Phone number</Label>
                {phoneFields.map((p, idx) => (
                  <Stack horizontal tokens={{ childrenGap: 8 }} key={idx}>
                    <TextField
                      value={p.value}
                      onChange={(_, val) => updatePhone(idx, 'value', val ?? '')}
                      styles={{ root: { flex: 1 } }}
                    />
                    <Dropdown
                      options={typeOptions}
                      selectedKey={p.type}
                      onChange={(_, opt) => updatePhone(idx, 'type', opt?.key as string)}
                      styles={{ root: { width: 120 } }}
                    />
                    {idx === phoneFields.length - 1 ? (
                      <IconButton iconProps={{ iconName: 'Add' }} onClick={() => setPhoneFields([...phoneFields, { value: '', type: 'work' }])} />
                    ) : (
                      <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => setPhoneFields(phoneFields.filter((_, i) => i !== idx))} />
                    )}
                  </Stack>
                ))}

                <Label>Email</Label>
                {emailFields.map((e, idx) => (
                  <Stack horizontal tokens={{ childrenGap: 8 }} key={idx}>
                    <TextField
                      value={e.value}
                      onChange={(_, val) => updateEmail(idx, 'value', val ?? '')}
                      styles={{ root: { flex: 1 } }}
                    />
                    <Dropdown
                      options={typeOptions}
                      selectedKey={e.type}
                      onChange={(_, opt) => updateEmail(idx, 'type', opt?.key as string)}
                      styles={{ root: { width: 120 } }}
                    />
                    {idx === emailFields.length - 1 ? (
                      <IconButton iconProps={{ iconName: 'Add' }} onClick={() => setEmailFields([...emailFields, { value: '', type: 'work' }])} />
                    ) : (
                      <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => setEmailFields(emailFields.filter((_, i) => i !== idx))} />
                    )}
                  </Stack>
                ))}

                <TextField label="Notes" multiline rows={3} />
              </>
            )}
          </>
        )}
      </Stack>
    </Panel>
  );
};
