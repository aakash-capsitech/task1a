import React, { useState } from 'react'
// import DashboardLayout from '../Navs/DashboardLayout'
import { AddBusinessPanel } from '../Panels/AddBusinessPanel'
import DashboardLayout from '../Navs/DashboardLayout'

const ESignatures = () => {

    const [panelOpen, setPanelOpen] = useState(false)

  return (
    <DashboardLayout activeItem='ESignatures'>
        <div>ESignatures</div>
        {/* <button
            onClick={()=>{
                setPanelOpen(!panelOpen)
            }}
        >+Add</button>
        <AddBusinessPanel isOpen={panelOpen} onDismiss={() => setPanelOpen(false)} /> */}
    </DashboardLayout>
  )
}

export default ESignatures