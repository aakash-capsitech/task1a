import React, { useState } from 'react'
// import DashboardLayout from '../Navs/DashboardLayout'
import { AddBusinessPanel } from '../Panels/AddBusinessPanel'
import DashboardLayout from '../Navs/DashboardLayout'

const Resources = () => {

    const [panelOpen, setPanelOpen] = useState(false)

  return (
    <DashboardLayout activeItem='Resources'>
        <div>Resources</div>
        {/* <button
            onClick={()=>{
                setPanelOpen(!panelOpen)
            }}
        >+Add</button>
        <AddBusinessPanel isOpen={panelOpen} onDismiss={() => setPanelOpen(false)} /> */}
    </DashboardLayout>
  )
}

export default Resources