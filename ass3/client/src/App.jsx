import { useState, useEffect } from 'react'
import axios from "axios";
import User from './components/User'
import Convert from './components/Convert'
import Addcurrency from './components/Addcurrency'
import Deletecurrency from './components/Deletecurrency'
import Updatecurrency from './components/Updatecurrency'
import './App.css'


function App() {
  const [currencyCode, setCurrencyCode] = useState('');
  const [countryId, setCountryId] = useState('');
  const [conversionRate, setConversionRate] = useState('');
  useEffect(() => { 
    const response = axios.get('http://localhost:3001/api/currency/');
    response.then((data) =>{
      console.log(data.data);
    }).catch((error)=>{
      console.log("error");
    })
  }, []);


  const apiAddress = '/api/currency';

  const handleAddCurrency = async () => {
    try {
        console.log(currencyCode,countryId,conversionRate);
        await axios.post("http://localhost:3001/api/currency/",
          {
            "currencyCode": "jjj",
            "countryId": 3,
            "conversionRate": 3.3
          }
      );
        console.log('Currency added successfully');

        } catch (error) {
        console.error(' 123 Error adding currency:', error);

    }
};

  return (
    <>
      <h2>Currency Converter</h2>
      <User/>
      <Convert/>
      <Addcurrency onAddCurrency={handleAddCurrency}
                    onCurrencyCode={setCurrencyCode}
                    onCountryId={setCountryId}
                    onConversionRate={setConversionRate} />
      <Deletecurrency/>
      <Updatecurrency/>
    </>
  )
}

export default App
