import React from 'react'
import Navbar from '../component/navbar'

export default function Home() {
  return (
    <>
    <Navbar activeLink = {'Home'}/>
    <div  className="card mb-3">
    <div  className="card-body">
      <h2  className="card-title"><center>Welcome To Payroll Managment</center></h2>
    </div>
    <img height="500" width="100%" src="https://perkpayroll.com/images/payroll-management-system.png" className="card-img-top" alt="..."/>
    
  </div>
    </>
  )
}
