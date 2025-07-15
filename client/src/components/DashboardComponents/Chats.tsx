import React, { useState } from 'react'
import DashboardLayout from '../Navs/DashboardLayout'
import { AddBusinessPanel } from '../Panels/AddBusinessPanel'

const Chats = () => {

    const [panelOpen, setPanelOpen] = useState(false)

  return (
    <DashboardLayout activeItem='Chats'>
        <div>Chats</div>
        {/* <button
            onClick={()=>{
                setPanelOpen(!panelOpen)
            }}
        >+Add</button>
        <AddBusinessPanel isOpen={panelOpen} onDismiss={() => setPanelOpen(false)} /> */}
    </DashboardLayout>
  )
}

export default Chats