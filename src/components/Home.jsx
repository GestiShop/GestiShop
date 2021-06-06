import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Home.css'
import logo from '../assets/gestishop_logo.png'

const Home = (props) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        require('../db')
    }, [])

    return (
        <div className='float-center'>
            <img className='logo' src={logo} alt='GestiShop'/>
            <p>Loading, please wait...</p>
            <Link to='/onboarding'>Onboarding</Link>
            <Link to='/settings'>Settings</Link>
        </div>
    )
}

Home.defaultProps = {
    test: 'IscleGaming'
}

Home.propTypes = {
    test: PropTypes.string.isRequired
}

export default Home
