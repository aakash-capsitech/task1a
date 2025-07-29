import React from 'react'

const InvoicePdf = () => {
  return (
    <div>
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "60px",
            marginRight: "60px"
        }}>
            <div>
                <img src="https://www.actingoffice.com/wp-content/themes/actingoffice/assets/images/logo.svg" />
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"}}
            >
                <div style={{
                    maxWidth: "150px"
                }}>
                    42-44 Bishopsgate London EC2N 4AH
                </div>
                <div style={{
                    maxWidth: "150px"
                }}>
                    <span style={{
                        color: '#1D9BF0'
                    }}>20 3960 5080</span> info@actingoffice.co
                </div>
            </div>
        </div>
        <hr style={{
            height:"10px",
            backgroundColor:"#089ff7ff"
            }} />

            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "60px",
                    marginRight: "60px"
                }}>
                    <div>
                        <p>Yatish Chandra -rn</p>
                        <p>35 Bullescroft Road HA88RN United Kingdom</p>
                    </div>
                    <div>
                        <div>
                            <h2>INVOICE</h2>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                // gap: "60px"
                            }}>
                                <p>Invoice no.:</p>
                                <p>{}INV-20252937-A</p>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                // gap: "60px"
                            }}>
                                <p>Date:</p>
                                <p>{}25/06/2025</p>
                            </div>
                            <div style={{
                                display: "flex",
                                gap: "60px"
                            }}>
                                <p>Due date:</p>
                                <p>{}25/06/2025</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>
    </div>
  )
}

export default InvoicePdf