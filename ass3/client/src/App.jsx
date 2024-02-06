import { useState, useEffect } from 'react'
import axios from "axios";
import User from './components/User'
import Convert from './components/Convert'
import Addcurrency from './components/Addcurrency'
import Deletecurrency from './components/Deletecurrency'
import Updatecurrency from './components/Updatecurrency'
import './App.css'


function App() {
  
  // useEffect(() => { 
  //   const response = axios.get('http://localhost:3001/api/currency/');
  //   response.then((data) =>{
  //     console.log(data.data);
  //   }).catch((error)=>{
  //     console.log("error");
  //   })
  // }, []);


  // const apiAddress = '/api/currency';

 

  return (
    <>
      <h2>Currency Converter</h2>
      <User/>
      <Convert/>
      <Addcurrency/>
      <Deletecurrency/>
      <Updatecurrency/>
    </>
  )
}

export default App
