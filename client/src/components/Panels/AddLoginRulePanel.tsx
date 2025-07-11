// import {
//   Panel,
//   PanelType,
// } from "@fluentui/react/lib/Panel";
// import {
//   Dropdown,
//   type IDropdownOption,
//   Checkbox,
//   DatePicker,
//   DayOfWeek,
//   DefaultButton,
//   PrimaryButton,
//   Stack,
//   Spinner,
//   ComboBox,
//   type IComboBoxOption,
// } from "@fluentui/react";
// import { useEffect, useState } from "react";
// import axios from "axios";

// type AddLoginRulePanelProps = {
//   isOpen: boolean;
//   onDismiss: () => void;
//   existingUsers?: string[]; // for edit
// };

// const restrictionOptions: IDropdownOption[] = [
//   { key: "deny", text: "Deny" },
//   { key: "allow", text: "Allow" },
// ];

// export const AddLoginRulePanel = ({ isOpen, onDismiss, existingUsers = [] }: AddLoginRulePanelProps) => {
//   const [restriction, setRestriction] = useState("deny");
//   const [dateRangeEnabled, setDateRangeEnabled] = useState(false);
//   const [fromDate, setFromDate] = useState<Date | null>(null);
//   const [toDate, setToDate] = useState<Date | null>(null);
// //   const [userOptions, setUserOptions] = useState<IDropdownOption[]>([]);
// const [userOptions, setUserOptions] = useState<IComboBoxOption[]>([]);

//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//   const [loadingUsers, setLoadingUsers] = useState(false);

//   // Fetch users when panel opens
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoadingUsers(true);
//       try {
//         const response = await axios.get("http://localhost:5153/api/users");
//         console.log("Fetched user data:", response.data);

//         const users = Array.isArray(response.data)
//           ? response.data
//           : response.data.users; // fallback if backend wraps it

//         const options = users.map((user: any) => ({
//           key: user.id,
//           text: user.email,
//         }));

//         setUserOptions(options);
//       } catch (err) {
//         console.error("Failed to fetch users", err);
//       } finally {
//         setLoadingUsers(false);
//       }
//     };

//     if (isOpen) {
//       fetchUsers();
//     }
//   }, [isOpen]);

//   // Pre-fill selected users on open (edit case)
//   useEffect(() => {
//     if (isOpen) {
//       setSelectedUsers(existingUsers);
//     }
//   }, [isOpen]); // ✅ avoid infinite loop by NOT including `existingUsers` here

//   return (
//     <Panel
//       isOpen={isOpen}
//       onDismiss={onDismiss}
//       headerText="Add login rule for users"
//       closeButtonAriaLabel="Close"
//       type={PanelType.smallFixedFar}
//     >
//       <Stack tokens={{ childrenGap: 15 }}>
//         {/* Multi-user selector */}
//         {loadingUsers ? (
//           <Spinner label="Loading users..." />
//         ) : (
//         //   <Dropdown
//         //     label="Select users"
//         //     placeholder="Search users..."
//         //     multiSelect
//         //     selectedKeys={selectedUsers}
//         //     onChange={(_, option) => {
//         //       if (!option) return;
//         //       const key = option.key as string;
//         //       setSelectedUsers((prev) =>
//         //         option.selected
//         //           ? [...prev, key]
//         //           : prev.filter((id) => id !== key)
//         //       );
//         //     }}
//         //     options={userOptions}
//         //   />
//         <ComboBox
//             label="Select users"
//             placeholder="Search users..."
//             multiSelect
//             allowFreeform={false}
//             autoComplete="on"
//             selectedKey={null} // prevent conflict
//             selectedKeys={selectedUsers}
//             options={userOptions}
//             onChange={(_, option) => {
//                 if (!option) return;
//                 const key = option.key as string;
//                 setSelectedUsers((prev) =>
//                 option.selected
//                     ? [...prev, key]
//                     : prev.filter((id) => id !== key)
//                 );
//             }}
//             />
//         )}

//         {/* Restriction */}
//         <Dropdown
//           label="Restrictions"
//           options={restrictionOptions}
//           selectedKey={restriction}
//           onChange={(_, opt) => setRestriction(opt?.key as string)}
//         />

//         {/* Date range */}
//         <Checkbox
//           label="Select date range"
//           checked={dateRangeEnabled}
//           onChange={(_, checked) => setDateRangeEnabled(!!checked)}
//         />

//         {dateRangeEnabled && (
//           <>
//             <DatePicker
//               label="From Date"
//               firstDayOfWeek={DayOfWeek.Sunday}
//               placeholder="DD/MM/YYYY"
//               value={fromDate ?? undefined}
//               onSelectDate={(date) => setFromDate(date ?? null)}
//               allowTextInput
//             />
//             <DatePicker
//               label="To Date"
//               firstDayOfWeek={DayOfWeek.Sunday}
//               placeholder="DD/MM/YYYY"
//               value={toDate ?? undefined}
//               onSelectDate={(date) => setToDate(date ?? null)}
//               allowTextInput
//             />
//           </>
//         )}

//         {/* Buttons */}
//         <Stack horizontal tokens={{ childrenGap: 10 }}>
//           <DefaultButton text="Cancel" onClick={onDismiss} />
//           <PrimaryButton
//             text="Save"
//             onClick={() => {
//               // Save logic placeholder
//               console.log({
//                 users: selectedUsers,
//                 restriction,
//                 fromDate,
//                 toDate,
//               });
//               onDismiss();
//             }}
//             disabled={selectedUsers.length === 0}
//           />
//         </Stack>
//       </Stack>
//     </Panel>
//   );
// };
















// import {
//   Panel,
//   PanelType,
// } from "@fluentui/react/lib/Panel";
// import {
//   Dropdown,
//   type IDropdownOption,
//   Checkbox,
//   DatePicker,
//   DayOfWeek,
//   DefaultButton,
//   PrimaryButton,
//   Stack,
//   Spinner,
//   TextField,
// } from "@fluentui/react";
// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";

// type AddLoginRulePanelProps = {
//   isOpen: boolean;
//   onDismiss: () => void;
//   existingUsers?: string[]; // for edit
// };

// const restrictionOptions: IDropdownOption[] = [
//   { key: "deny", text: "Deny" },
//   { key: "allow", text: "Allow" },
// ];

// export const AddLoginRulePanel = ({
//   isOpen,
//   onDismiss,
//   existingUsers = [],
// }: AddLoginRulePanelProps) => {
//   const [restriction, setRestriction] = useState("deny");
//   const [dateRangeEnabled, setDateRangeEnabled] = useState(false);
//   const [fromDate, setFromDate] = useState<Date | null>(null);
//   const [toDate, setToDate] = useState<Date | null>(null);
//   const [userOptions, setUserOptions] = useState<IDropdownOption[]>([]);
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch users from backend when panel opens
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoadingUsers(true);
//       try {
//         const response = await axios.get("http://localhost:5153/api/users");
//         console.log("Fetched user data:", response.data);

//         const users = Array.isArray(response.data)
//           ? response.data
//           : response.data.users;

//         const options = users.map((user: any) => ({
//           key: user.id,
//           text: user.email,
//         }));

//         setUserOptions(options);
//       } catch (err) {
//         console.error("Failed to fetch users", err);
//       } finally {
//         setLoadingUsers(false);
//       }
//     };

//     if (isOpen) {
//       fetchUsers();
//     }
//   }, [isOpen]);

//   // Set selected users when panel opens (edit support)
//   useEffect(() => {
//     if (isOpen) {
//       setSelectedUsers(existingUsers);
//     }
//   }, [isOpen]);

//   // Filtered user options based on search input
//   const filteredOptions = useMemo(() => {
//     if (!searchTerm) return userOptions;
//     return userOptions.filter((opt) =>
//       opt.text.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, userOptions]);

//   return (
//     <Panel
//       isOpen={isOpen}
//       onDismiss={onDismiss}
//       headerText="Add login rule for users"
//       closeButtonAriaLabel="Close"
//       type={PanelType.smallFixedFar}
//     >
//       <Stack tokens={{ childrenGap: 15 }}>
//         {/* Multi-user selector with search */}
//         {loadingUsers ? (
//           <Spinner label="Loading users..." />
//         ) : (
//           <Stack tokens={{ childrenGap: 8 }}>
//             <TextField
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(_, val) => setSearchTerm(val || "")}
//             />

//             <Dropdown
//               label="Select users"
//               multiSelect
//               selectedKeys={selectedUsers}
//               onChange={(_, option) => {
//                 if (!option) return;
//                 const key = option.key as string;
//                 setSelectedUsers((prev) =>
//                   option.selected
//                     ? [...prev, key]
//                     : prev.filter((id) => id !== key)
//                 );
//               }}
//               options={filteredOptions}
//             />
//           </Stack>
//         )}

//         {/* Restriction */}
//         <Dropdown
//           label="Restrictions"
//           options={restrictionOptions}
//           selectedKey={restriction}
//           onChange={(_, opt) => setRestriction(opt?.key as string)}
//         />

//         {/* Date range */}
//         <Checkbox
//           label="Select date range"
//           checked={dateRangeEnabled}
//           onChange={(_, checked) => setDateRangeEnabled(!!checked)}
//         />

//         {dateRangeEnabled && (
//           <>
//             <DatePicker
//               label="From Date"
//               firstDayOfWeek={DayOfWeek.Sunday}
//               placeholder="DD/MM/YYYY"
//               value={fromDate ?? undefined}
//               onSelectDate={(date) => setFromDate(date ?? null)}
//               allowTextInput
//             />
//             <DatePicker
//               label="To Date"
//               firstDayOfWeek={DayOfWeek.Sunday}
//               placeholder="DD/MM/YYYY"
//               value={toDate ?? undefined}
//               onSelectDate={(date) => setToDate(date ?? null)}
//               allowTextInput
//             />
//           </>
//         )}

//         {/* Buttons */}
//         <Stack horizontal tokens={{ childrenGap: 10 }}>
//           <DefaultButton text="Cancel" onClick={onDismiss} />
//           <PrimaryButton
//             text="Save"
//             onClick={() => {
//               // Save logic
//               console.log({
//                 users: selectedUsers,
//                 restriction,
//                 fromDate,
//                 toDate,
//               });
//               onDismiss();
//             }}
//             disabled={selectedUsers.length === 0}
//           />
//         </Stack>
//       </Stack>
//     </Panel>
//   );
// };















import {
  Panel,
  PanelType,
} from "@fluentui/react/lib/Panel";
import {
  Dropdown,
  type IDropdownOption,
  Checkbox,
  DatePicker,
  DayOfWeek,
  DefaultButton,
  PrimaryButton,
  Stack,
  Spinner,
  TextField,
} from "@fluentui/react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type AddLoginRulePanelProps = {
  isOpen: boolean;
  onDismiss: () => void;
  existingRule?: {
    id: string;
    userIds: string[];
    restriction: string;
    fromDate?: string;
    toDate?: string;
  };
};

const restrictionOptions: IDropdownOption[] = [
  { key: "deny", text: "Deny" },
  { key: "allow", text: "Allow" },
];

export const AddLoginRulePanel = ({
  isOpen,
  onDismiss,
  existingRule,
}: AddLoginRulePanelProps) => {
  const [restriction, setRestriction] = useState("deny");
  const [dateRangeEnabled, setDateRangeEnabled] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [userOptions, setUserOptions] = useState<IDropdownOption[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await axios.get("http://localhost:5153/api/users");
        const users = Array.isArray(response.data)
          ? response.data
          : response.data.users;

        const options = users.map((user: any) => ({
          key: user.id,
          text: user.email,
        }));

        setUserOptions(options);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoadingUsers(false);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && existingRule) {
      setSelectedUsers(existingRule.userIds);
      setRestriction(existingRule.restriction);
      setFromDate(existingRule.fromDate ? new Date(existingRule.fromDate) : null);
      setToDate(existingRule.toDate ? new Date(existingRule.toDate) : null);
      setDateRangeEnabled(!!existingRule.fromDate || !!existingRule.toDate);
    } else {
      setSelectedUsers([]);
      setRestriction("deny");
      setFromDate(null);
      setToDate(null);
      setDateRangeEnabled(false);
    }
  }, [isOpen, existingRule]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return userOptions;
    return userOptions.filter((opt) =>
      opt.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, userOptions]);

  const handleSave = async () => {
    const payload = {
      userIds: selectedUsers,
      restriction,
      fromDate,
      toDate,
    };

    try {
      if (existingRule) {
        await axios.put(`http://localhost:5153/api/loginrules/${existingRule.id}`, payload);
        toast.success("Login rules Updated")
      } else {
        await axios.post("http://localhost:5153/api/loginrules", payload);
        toast.success("Login rules created")
      }
    } catch (err) {
      console.error("Save failed", err);
    }

    onDismiss();
  };

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText={existingRule ? "Edit login rule" : "Add login rule"}
      closeButtonAriaLabel="Close"
      type={PanelType.smallFixedFar}
    >
      <Stack tokens={{ childrenGap: 15 }}>
        {loadingUsers ? (
          <Spinner label="Loading users..." />
        ) : (
          <Stack tokens={{ childrenGap: 8 }}>
            <TextField
              placeholder="Search users..."
              value={searchTerm}
              onChange={(_, val) => setSearchTerm(val || "")}
            />

            <Dropdown
              label="Select users"
              multiSelect
              selectedKeys={selectedUsers}
              onChange={(_, option) => {
                if (!option) return;
                const key = option.key as string;
                setSelectedUsers((prev) =>
                  option.selected
                    ? [...prev, key]
                    : prev.filter((id) => id !== key)
                );
              }}
              options={filteredOptions}
            />
          </Stack>
        )}

        <Dropdown
          label="Restrictions"
          options={restrictionOptions}
          selectedKey={restriction}
          onChange={(_, opt) => setRestriction(opt?.key as string)}
        />

        <Checkbox
          label="Select date range"
          checked={dateRangeEnabled}
          onChange={(_, checked) => setDateRangeEnabled(!!checked)}
        />

        {dateRangeEnabled && (
          <>
            <DatePicker
              label="From Date"
              firstDayOfWeek={DayOfWeek.Sunday}
              placeholder="DD/MM/YYYY"
              value={fromDate ?? undefined}
              onSelectDate={(date) => setFromDate(date ?? null)}
              allowTextInput
            />
            <DatePicker
              label="To Date"
              firstDayOfWeek={DayOfWeek.Sunday}
              placeholder="DD/MM/YYYY"
              value={toDate ?? undefined}
              onSelectDate={(date) => setToDate(date ?? null)}
              allowTextInput
            />
          </>
        )}

        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <DefaultButton text="Cancel" onClick={onDismiss} />
          <PrimaryButton
            text="Save"
            onClick={handleSave}
            disabled={selectedUsers.length === 0}
          />
        </Stack>
      </Stack>
    </Panel>
  );
};
