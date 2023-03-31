import React from 'react'
import Navbar from '../component/navbar'

export default function Home() {
  return (
    <>
    <Navbar activeLink = {'Home'}/>
    <div  className="card mb-3">
    <img height="500" width="100%" src="https://www.ramco.com/hubfs/Data-Will-Help-Add-the-Payroll-Function-to-the-Businesses.jpg"  className="card-img-top" alt="..."/>
    <div  className="card-body">
      <h5  className="card-title">Card title</h5>
      <p  className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p  className="card-text"><small  className="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
    </>
  )
}
