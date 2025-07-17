import React, { useState } from 'react'
// import DashboardLayout from '../Navs/DashboardLayout'
// import { AddBusinessPanel } from '../Panels/AddBusinessPanel'
import { CreateQuotePanel } from '../Panels/CreateQuotePanel'
import DashboardLayout from '../Navs/DashboardLayout'
import { QuoteTable } from '../ListComponents/QuoteTable'

const Tasks = () => {

    const [panelOpen, setPanelOpen] = useState(false)

  return (
    <DashboardLayout activeItem='Tasks'>
        <div>
          <QuoteTable />
        </div>
        {/* <button
            onClick={()=>{
                setPanelOpen(!panelOpen)
            }}
        >+Add</button> */}
        {/* <AddBusinessPanel isOpen={panelOpen} onDismiss={() => setPanelOpen(false)} /> */}
        <CreateQuotePanel isOpen={panelOpen} onDismiss={() => setPanelOpen(false)} />
    </DashboardLayout>
  )
}

export default Tasks