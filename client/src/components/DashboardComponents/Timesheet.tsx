import React, { useState } from 'react'
// import DashboardLayout from '../Navs/DashboardLayout'
import { AddBusinessPanel } from '../Panels/AddBusinessPanel'
import DashboardLayout from '../Navs/DashboardLayout'

const Timesheet = () => {

    const [panelOpen, setPanelOpen] = useState(false)

  return (
    <DashboardLayout activeItem='Timesheet'>
        <div>Timesheet</div>
        {/* <button
            onClick={()=>{
                setPanelOpen(!panelOpen)
            }}
        >+Add</button>
        <AddBusinessPanel isOpen={panelOpen} onDismiss={() => setPanelOpen(false)} /> */}
    </DashboardLayout>
  )
}

export default Timesheet