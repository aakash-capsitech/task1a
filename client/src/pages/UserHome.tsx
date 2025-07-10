import Layout from '../components/Layout'
import UserProfilePage from '../components/UserProfilePage'

const UserHome = () => {
  return (
    <div>
       <Layout>
        <UserProfilePage active={""} />
      </Layout>
    </div>
  )
}

export default UserHome