import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

const Home = (props) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {

    }, [])

    return (
        <>
            <h1>👋 Hello {props.test}!</h1>
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
