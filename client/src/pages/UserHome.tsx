import React from 'react'
import Layout from '../components/Layout'
import UserTable from '../components/UserTable'
import MainUserTablePage from '../components/UserTable'
import MainUserUserTablePage from '../components/UserUserTablePage'

const UserHome = () => {
  return (
    <div>
       <Layout>
        <MainUserUserTablePage />
      </Layout>
    </div>
  )
}

export default UserHome