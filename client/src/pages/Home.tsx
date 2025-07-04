import React from 'react'
import Layout from '../components/Layout'
import UserTable from '../components/UserTable'
import MainUserTablePage from '../components/UserTable'

const Home = () => {
  return (
    <div>
       <Layout>
        <MainUserTablePage />
      </Layout>
    </div>
  )
}

export default Home