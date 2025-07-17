// import { Breadcrumb, type IBreadcrumbItem } from '@fluentui/react';
// import { useNavigate } from 'react-router-dom';

// const BreadcrumbBar = ({ activeItem }: { activeItem: string }) => {
//   const navigate = useNavigate();

//   const items: IBreadcrumbItem[] = [
//     {
//       text: 'Home',
//       key: 'home',
//       onClick: () => navigate('/'),
//     },
//   ];

//   if (activeItem) {
//     items.push({
//       text: activeItem,
//       key: 'current',
//       isCurrentItem: true,
//     });
//   }

//   return (
//     <div style={{ padding: '8px 16px', borderBottom: '1px solid #ddd' }}>
//       <Breadcrumb items={items} />
//     </div>
//   );
// };

// export default BreadcrumbBar;














import { Breadcrumb, type IBreadcrumbItem } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

const BreadcrumbBar = ({ activeItem }: { activeItem: string }) => {
  const navigate = useNavigate();

  const items: IBreadcrumbItem[] = [
    {
      text: 'Home',
      key: 'home',
      onClick: () => navigate('/'),
    },
  ];

  if (activeItem) {
    items.push({
      text: activeItem,
      key: 'current',
      isCurrentItem: true,
    });
  }

  return (
    <div
      style={{
        padding: '8px 16px',
        borderBottom: '1px solid #ddd',
        fontSize: '18px',
        lineHeight: '1.2',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        overflow: "hidden"
      }}
    >
      <Breadcrumb
        items={items}
        styles={{
          root: {
            fontSize: '18px',
            height: 'auto',
            padding: 0,
          },
          listItem: {
            selectors: {
              'a, span': {
                fontSize: '14px',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BreadcrumbBar;
