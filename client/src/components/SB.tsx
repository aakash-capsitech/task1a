

const SB = () => {
  const sidebarItems = [
    {
      section: "Your preferences",
      items: ["Profile"],
    },
    {
      section: "Practice configuration",
      items: [
        "Practice profile",
        "Automation",
        { label: "Users", active: true },
        "Call flow",
        "Addons",
        "Canned emails",
        {
          label: "Customisations",
          children: [
            "Web chat",
            "Engagement letter",
            "E-signature",
            "Other letters",
            "Email templates",
            "Leads",
            "Data-link",
            "Services",
            "Tasks",
            "Client tags",
            "Notes",
            "Leaves",
            "DMS (alerts)",
            "Holidays",
          ],
        },
      ],
    },
  ];

  return (
    <div
      style={{
        width: "220px",
        backgroundColor: "#fff",
        fontFamily: "Segoe UI, sans-serif",
        fontSize: "14px",
        color: "#323130",
        padding: "8px 0",
      }}
    >
      {sidebarItems.map((section, idx) => (
        <div key={idx} style={{ padding: "0 16px", marginBottom: "8px" }}>
          <div
            style={{
              fontWeight: 600,
              color: "#004578",
              fontSize: "13px",
              margin: "12px 0 6px",
            }}
          >
            {section.section}
          </div>

          {section.items.map((item, i) => {
            if (typeof item === "string") {
              return (
                <div
                  key={i}
                  style={{
                    padding: "6px 8px",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </div>
              );
            }

            if (item.children) {
              return (
                <div key={i}>
                  <div
                    style={{
                      padding: "6px 8px",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ marginLeft: "16px" }}>
                    {item.children.map((child, j) => (
                      <div
                        key={j}
                        style={{
                          padding: "6px 8px",
                          borderRadius: "2px",
                          cursor: "pointer",
                        }}
                      >
                        {child}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={i}
                style={{
                  padding: "6px 8px",
                  borderRadius: "2px",
                  backgroundColor: item.active ? "#f3f2f1" : "transparent",
                  fontWeight: item.active ? 500 : "normal",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SB;
