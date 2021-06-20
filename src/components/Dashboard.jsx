import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div>
            <p>This is the dashboard</p>
            <Link to='/onboarding'>Onboarding</Link>
            <Link to='/settings'>Settings</Link>
            <Link to='/createProduct'>Create Product</Link>
        </div>
    )
}

export default Dashboard
