import {
  Panel,
  PanelType,
  TextField,
  Dropdown,
//   type IDropdownOption,
  DatePicker,
  Stack,
  IconButton,
  PrimaryButton,
  DefaultButton,
  Label,
} from '@fluentui/react';
import { useState } from 'react';

const vatOptions = [
  { key: '0', text: 'VAT 0%' },
  { key: '5', text: 'VAT 5%' },
  { key: '20', text: 'VAT 20%' },
];

const sampleServices = [
  { key: 'service1', text: 'Consultation' },
  { key: 'service2', text: 'Filing' },
];

const firstResponseOptions = [
  { key: 'response1', text: 'Team A' },
  { key: 'response2', text: 'Team B' },
];

type ServiceRow = {
  service?: string;
  description?: string;
  amount?: string;
};

export const CreateQuotePanel = ({
  isOpen,
  onDismiss,
}: {
  isOpen: boolean;
  onDismiss: () => void;
}) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [businessSearch, setBusinessSearch] = useState('');
  const [firstResponse, setFirstResponse] = useState<string | undefined>(undefined);
  const [rows, setRows] = useState<ServiceRow[]>([
    { service: '', description: '', amount: '' },
  ]);
  const [discount, setDiscount] = useState<number>(0);
  const [vatPercent, setVatPercent] = useState(20);

  const updateRow = (index: number, field: keyof ServiceRow, value: string) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => setRows([...rows, { service: '', description: '', amount: '' }]);

  const removeRow = (index: number) =>
    setRows(rows.filter((_, i) => i !== index));

  const subtotal = rows.reduce(
    (sum, row) => sum + (parseFloat(row.amount || '0') || 0),
    0
  );
  const vatAmount = (subtotal - discount) * (vatPercent / 100);
  const total = subtotal - discount + vatAmount;

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText="Create quote"
      closeButtonAriaLabel="Close"
      type={PanelType.medium}
      onRenderFooterContent={() => (
        <Stack horizontal tokens={{ childrenGap: 8 }} horizontalAlign="end">
          <DefaultButton text="Cancel" onClick={onDismiss} />
          <PrimaryButton text="Save" />
          <PrimaryButton text="Save & email" />
        </Stack>
      )}
      isFooterAtBottom
    >
      <Stack tokens={{ childrenGap: 16 }}>
        <TextField
          label="Business name"
          placeholder="Search"
          value={businessSearch}
          onChange={(_, val) => setBusinessSearch(val ?? '')}
        />
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <DatePicker
            label="Date"
            value={date as Date}
            onSelectDate={setDate as any}
            styles={{ root: { width: 180 } }}
          />
          <Dropdown
            label="First response"
            options={firstResponseOptions}
            selectedKey={firstResponse}
            onChange={(_, option) => setFirstResponse(option?.key as string)}
            styles={{ root: { width: 200 } }}
          />
        </Stack>

        <Stack tokens={{ childrenGap: 12 }}>
          {rows.map((row, index) => (
            <Stack horizontal tokens={{ childrenGap: 8 }} key={index}>
              <Dropdown
                placeholder="Select..."
                options={sampleServices}
                selectedKey={row.service}
                onChange={(_, option) =>
                  updateRow(index, 'service', option?.key as string)
                }
                styles={{ root: { width: 160 } }}
              />
              <TextField
                placeholder="Description"
                value={row.description}
                onChange={(_, val) => updateRow(index, 'description', val ?? '')}
                styles={{ root: { flex: 1 } }}
              />
              <TextField
                prefix="£"
                type="number"
                value={row.amount}
                onChange={(_, val) => updateRow(index, 'amount', val ?? '')}
                styles={{ root: { width: 120 } }}
              />
              <IconButton
                iconProps={{ iconName: 'Delete' }}
                onClick={() => removeRow(index)}
              />
            </Stack>
          ))}
        </Stack>

        <DefaultButton text="+ Add" onClick={addRow} />

        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }} styles={{ root: { marginTop: 16 } }}>
          <Label styles={{ root: { width: 100 } }}>Subtotal</Label>
          <TextField readOnly value={`£${subtotal.toFixed(2)}`} styles={{ root: { width: 120 } }} />
        </Stack>

        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <Label styles={{ root: { width: 100 } }}>Discount</Label>
          <TextField
            type="number"
            prefix="£"
            value={discount.toString()}
            onChange={(_, val) => setDiscount(parseFloat(val ?? '0') || 0)}
            styles={{ root: { width: 120 } }}
          />
        </Stack>

        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <Dropdown
            label=""
            options={vatOptions}
            selectedKey={vatPercent.toString()}
            onChange={(_, opt) => setVatPercent(parseInt(opt?.key as string))}
            styles={{ root: { width: 140 } }}
          />
          <TextField readOnly value={`£${vatAmount.toFixed(2)}`} styles={{ root: { width: 120 } }} />
        </Stack>

        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <Label styles={{ root: { width: 100 } }}>Total</Label>
          <TextField readOnly value={`£${total.toFixed(2)}`} styles={{ root: { width: 120 } }} />
        </Stack>
      </Stack>
    </Panel>
  );
};
