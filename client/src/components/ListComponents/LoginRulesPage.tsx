// import {
//   Stack,
//   PrimaryButton,
//   IconButton,
//   SearchBox,
//   DetailsList,
//   DetailsListLayoutMode,
//   type IColumn,
//   SelectionMode,
//   Text,
// } from "@fluentui/react";
// import { useState } from "react";
// import { AddLoginRulePanel } from "../Panels/AddLoginRulePanel";
// // import { AddLoginRulePanel } from "./AddLoginRulePanel"; // assume this is already implemented

// type LoginRule = {
//   id: number;
//   type: "IP" | "User" | "Role";
//   value: string;
//   restriction: "Allowed" | "Deny";
//   fromDate?: string;
//   toDate?: string;
// };

// const mockData: LoginRule[] = [
//   { id: 1, type: "IP", value: "192.16.123.1/32", restriction: "Allowed" },
//   { id: 2, type: "IP", value: "0.0.0.0/1", restriction: "Allowed" },
//   { id: 3, type: "IP", value: "172.0.0.0/8", restriction: "Allowed" },
//   { id: 4, type: "IP", value: "169.0.0.0/8", restriction: "Allowed" },
//   { id: 5, type: "User", value: "user1@example.com", restriction: "Allowed" },
//   {
//     id: 6,
//     type: "User",
//     value: "user2@example.com",
//     restriction: "Deny",
//     fromDate: "28/02/2023 07:30 PM",
//     toDate: "30/05/2025 07:30 PM",
//   },
//   {
//     id: 7,
//     type: "User",
//     value: "user3@example.com",
//     restriction: "Deny",
//     fromDate: "12/06/2025 07:30 PM",
//   },
//   { id: 8, type: "User", value: "user4@example.com", restriction: "Allowed" },
//   { id: 9, type: "Role", value: "Admin", restriction: "Allowed" },
//   { id: 10, type: "Role", value: "Editor", restriction: "Allowed" },
// ];

// export const LoginRulesPage = () => {
//   const [isPanelOpen, setIsPanelOpen] = useState(false);
//   const [data, setData] = useState<LoginRule[]>(mockData);

//   const columns: IColumn[] = [
//     { key: "sno", name: "S.No.", fieldName: "id", minWidth: 50, maxWidth: 70 },
//     { key: "type", name: "Type", fieldName: "type", minWidth: 70 },
//     { key: "value", name: "Value", fieldName: "value", minWidth: 150 },
//     { key: "restriction", name: "Restrictions", fieldName: "restriction", minWidth: 100 },
//     {
//       key: "fromDate",
//       name: "From date",
//       minWidth: 150,
//       onRender: (item) => item.fromDate ?? "-",
//     },
//     {
//       key: "toDate",
//       name: "To date",
//       minWidth: 150,
//       onRender: (item) =>
//         item.toDate ? (
//           <>
//             {item.toDate}{" "}
//             <IconButton
//               iconProps={{ iconName: "Edit" }}
//               title="Edit"
//               ariaLabel="Edit"
//               onClick={() => {
//             //   setEditingRule(item);     // store the rule being edited
//               setIsPanelOpen(true);     // open the panel
//             }}

//             />
//           </>
//         ) : (
//           <IconButton
//             iconProps={{ iconName: "Edit" }}
//             title="Edit"
//             ariaLabel="Edit"
//             onClick={() => {
//             // setEditingRule(item);     // store the rule being edited
//             setIsPanelOpen(true);     // open the panel
//         }}

//           />
//         ),
//     },
//   ];

//   return (
//     <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20 } }}>
//       <Stack horizontal horizontalAlign="space-between">
//         <PrimaryButton text="+ Add" onClick={() => setIsPanelOpen(true)} />
//         <SearchBox placeholder="Search" />
//       </Stack>

//       <DetailsList
//         items={data}
//         columns={columns}
//         setKey="loginRulesList"
//         layoutMode={DetailsListLayoutMode.fixedColumns}
//         selectionMode={SelectionMode.none}
//       />

//       <Text variant="small">Showing all {data.length} items</Text>

//       <AddLoginRulePanel isOpen={isPanelOpen} onDismiss={() => setIsPanelOpen(false)} />
//     </Stack>
//   );
// };








import {
  Stack,
  PrimaryButton,
  IconButton,
  SearchBox,
  DetailsList,
  DetailsListLayoutMode,
  type IColumn,
  SelectionMode,
  Text,
} from "@fluentui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddLoginRulePanel } from "../Panels/AddLoginRulePanel";

type LoginRule = {
  id: string;
  userIds: string[];
  restriction: "allow" | "deny";
  fromDate?: string;
  toDate?: string;
};

export const LoginRulesPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [rules, setRules] = useState<LoginRule[]>([]);
  const [editingRule, setEditingRule] = useState<LoginRule | null>(null);
  const [search, setSearch] = useState("");

  const fetchRules = async () => {
    const response = await axios.get("http://localhost:5153/api/loginrules");
    setRules(response.data);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const columns: IColumn[] = [
    { key: "sno", name: "S.No.", fieldName: "id", minWidth: 50, maxWidth: 70, onRender: (_, i) => i! + 1 },
    {
      key: "users", name: "Users", minWidth: 200,
      onRender: (item: LoginRule) => item.userIds.join(", ")
    },
    { key: "restriction", name: "Restriction", fieldName: "restriction", minWidth: 100 },
    {
      key: "fromDate", name: "From", minWidth: 130,
      onRender: (item) => item.fromDate ? new Date(item.fromDate).toLocaleString() : "-"
    },
    {
      key: "toDate", name: "To", minWidth: 130,
      onRender: (item) => item.toDate ? new Date(item.toDate).toLocaleString() : "-"
    },
    {
      key: "actions", name: "Actions", minWidth: 50,
      onRender: (item: LoginRule) => (
        <IconButton
          iconProps={{ iconName: "Edit" }}
          title="Edit"
          onClick={() => {
            setEditingRule(item);
            setIsPanelOpen(true);
          }}
        />
      )
    },
  ];

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20 } }}>
      <Stack horizontal horizontalAlign="space-between">
        <PrimaryButton text="+ Add" onClick={() => {
          setEditingRule(null);
          setIsPanelOpen(true);
        }} />
        <SearchBox placeholder="Search" value={search} onChange={(_, val) => setSearch(val || "")} />
      </Stack>

      <DetailsList
        items={rules.filter(r => r.userIds.some(u => u.toLowerCase().includes(search.toLowerCase())))}
        columns={columns}
        setKey="loginRulesList"
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionMode={SelectionMode.none}
      />

      <Text variant="small">Showing {rules.length} rules</Text>

      <AddLoginRulePanel
        isOpen={isPanelOpen}
        onDismiss={() => {
          setIsPanelOpen(false);
          setEditingRule(null);
          fetchRules();
        }}
        existingRule={editingRule as any}
      />
    </Stack>
  );
};
