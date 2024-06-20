"use client"
import React from 'react'
import Aside from './Aside/page'
import { useEffect } from 'react';


function AdminLayout({children}) {
  
  let adminToken  = localStorage.getItem("adminToken");  
 
  useEffect(()=>{
      if(!adminToken){
          route.push("/");
        }
  },[adminToken])

  return (
    <>
     <Aside/>
     <br /><br /><br /><br />
     {children}
    </>
  )
}

export default AdminLayout;

