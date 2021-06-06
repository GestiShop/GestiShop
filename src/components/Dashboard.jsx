import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <>
            <p>This is the dashboard</p>
            <Link to='/onboarding'>Onboarding</Link>
            <Link to='/settings'>Settings</Link>
        </>
    )
}

export default Dashboard
