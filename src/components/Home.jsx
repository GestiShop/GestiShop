import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect as connectDb } from '../db'
import './Home.css'
import logo from '../assets/gestishop_logo.png'

const Home = () => {
    const history = useHistory()

    useEffect(() => {
        console.log('Starting db connection')
        connectDb().then(() => {
            console.log('Mongoose connected!')
            history.replace('/dashboard')
        }).catch(err => {
            console.log('Failed to connect to db', err)
        })
    }, [])

    return (
        <div className="float-center">
            <img className="logo" src={logo} alt="GestiShop"/>
            <p>Loading, please wait...</p>
        </div>
    )
}

export default Home
