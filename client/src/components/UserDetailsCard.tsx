import { Stack, Text, Icon, Separator, TooltipHost, FontWeights } from '@fluentui/react';

type UserDetailsProps = {
  username: string;
  email: string;
  phone?: string;
  role?: string;
  address?: string;
  configs?: string[];
  country?: string;
  nationality?: string;
  contactPerson?: string;
};

const sectionStyle = {
  root: {
    backgroundColor: '#fafafa',
    border: '1px solid #ddd',
    borderRadius: 6,
    padding: 16,
    maxWidth: 1100,
  },
};

const labelStyle = { root: { color: '#888', fontSize: 12 } };
const valueStyle = { root: { fontSize: 14, fontWeight: FontWeights.semibold } };

const UserDetailsCard = ({
  username,
  email,
  phone,
  role,
  address,
  configs,
  country,
  nationality,
  contactPerson,
}: UserDetailsProps) => {
  return (
    <Stack tokens={{ childrenGap: 8 }} styles={sectionStyle}>
      <Text variant="mediumPlus" styles={{ root: { fontWeight: FontWeights.semibold } }}>
        Basic details
      </Text>
      <Separator />

      <Stack horizontal wrap tokens={{ childrenGap: 40 }}>
        {/* Username */}
        <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 200 } }}>
          <Text styles={labelStyle}>Username</Text>
          <Text styles={valueStyle}>{username}</Text>
        </Stack>

        {/* Email */}
        <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 250 } }}>
          <Text styles={labelStyle}>Email</Text>
          <Text styles={valueStyle}>{email}</Text>
        </Stack>

        {/* Phone */}
        {phone && (
          <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 250 } }}>
            <Text styles={labelStyle}>Phone number</Text>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
              <img
                src="https://flagcdn.com/gb.svg"
                alt="UK Flag"
                width={20}
                style={{ borderRadius: 2 }}
              />
              <Text styles={valueStyle}>{phone}</Text>
              <TooltipHost content="WhatsApp available">
                <Icon iconName="Chat" styles={{ root: { color: '#25d366' } }} />
              </TooltipHost>
            </Stack>
          </Stack>
        )}

        {/* Role */}
        {role && (
          <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 200 } }}>
            <Text styles={labelStyle}>Role</Text>
            <Text styles={valueStyle}>{role}</Text>
          </Stack>
        )}

        {/* Address */}
        {address && (
          <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 300 } }}>
            <Text styles={labelStyle}>Address (default)</Text>
            <Text styles={valueStyle}>{address}</Text>
          </Stack>
        )}

        {/* Configs */}
        {configs && configs.length > 0 && (
          <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 300 } }}>
            <Text styles={labelStyle}>Configs</Text>
            <Text styles={valueStyle}>{configs.join(', ')}</Text>
          </Stack>
        )}

        {/* Country */}
        <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 200 } }}>
          <Text styles={labelStyle}>Country of residence</Text>
          <Text styles={valueStyle}>{country || '-'}</Text>
        </Stack>

        {/* Nationality */}
        <Stack tokens={{ childrenGap: 4 }} styles={{ root: { minWidth: 200 } }}>
          <Text styles={labelStyle}>Nationality</Text>
          <Text styles={valueStyle}>{nationality || '-'}</Text>
        </Stack>
      </Stack>

      {contactPerson && (
        <Text variant="small" styles={{ root: { marginTop: 12, color: '#888' } }}>
          Default contact - {contactPerson}
        </Text>
      )}
    </Stack>
  );
};

export default UserDetailsCard;
