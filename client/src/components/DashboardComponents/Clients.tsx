import React, { useState } from 'react'
// import DashboardLayout from '../Navs/DashboardLayout'
import { AddBusinessPanel } from '../Panels/AddBusinessPanel'
import DashboardLayout from '../Navs/DashboardLayout'
import { BusinessTable } from '../ListComponents/BusinessTable'

const Clients = () => {

    const [panelOpen, setPanelOpen] = useState(false)

  return (
    <DashboardLayout activeItem='clients'>
        <div>
          <BusinessTable />
        </div>
        {/* <button
            onClick={()=>{
                setPanelOpen(!panelOpen)
            }}
        >+Add</button> */}
        <AddBusinessPanel isOpen={panelOpen} onDismiss={() => setPanelOpen(false)} />
    </DashboardLayout>
  )
}

export default Clients