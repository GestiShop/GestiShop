import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from '../assets/gestishop_logo.png'

const Home = (props) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {

    }, [])

    return (
        <>
            <img src={logo} alt='GestiShop'/>
            <h1>👋 Hello {props.test}!</h1>
            <Link to='/settings'>Settings</Link>
        </>
    )
}

Home.defaultProps = {
    test: 'IscleGaming'
}

Home.propTypes = {
    test: PropTypes.string.isRequired
}

export default Home
