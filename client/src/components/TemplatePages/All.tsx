import UserDetailsDemo from '../CardComponenets/UserDetailDemo';
import AllUsers from '../ListComponents/AllUsers';
import PageLayout from '../Navs/PageLayout';
const All = () => {
  return (
    <PageLayout activeItem="All">
      <AllUsers />
    </PageLayout>
  );
};

export default All;
