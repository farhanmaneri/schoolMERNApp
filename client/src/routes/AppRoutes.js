import React from 'react'
import {Routes, Route, } from 'react-router-dom'
import Home from '../pages/Home'
import Schools from '../pages/Schools';
import Contact from '../pages/Contact';
function AppRoutes() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/contacts" element={<Contact />} />
    </Routes>
    </>
  )
}

export default AppRoutes
