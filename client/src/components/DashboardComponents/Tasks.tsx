import { useState } from 'react';
import { CreateQuotePanel } from '../Panels/CreateQuotePanel';
import DashboardLayout from '../Navs/DashboardLayout';
import { QuoteTable } from '../ListComponents/QuoteTable';

const Tasks = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <DashboardLayout activeItem="Invoice">
      <div>
        <QuoteTable />
      </div>
      <CreateQuotePanel
        isOpen={panelOpen}
        onDismiss={() => setPanelOpen(false)}
      />
    </DashboardLayout>
  );
};

export default Tasks;
