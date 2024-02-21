import { useState } from 'react';
import axios from "axios";


function Addcurrency()
{
    const [currencyCode, setCurrencyCode] = useState('');
    const [countryId, setCountryId] = useState('');
    const [conversionRate, setConversionRate] = useState('');

    const handleAddCurrency = async (e) => {
        e.preventDefault();
        try {
            //console.log(currencyCode,countryId,conversionRate);
            await axios.post("http://localhost:3001/api/currency/",
              {
                "currencyCode": currencyCode,
                "countryId": countryId,
                "conversionRate": conversionRate
              }
          );
            console.log('Currency added successfully');
    
            } catch (error) {
            console.error('Error adding currency:', error);
    
        }
    };

    return (
        <div className="addcurrency">
            <h3>Add Currency</h3>
            <form className="addinginput" onSubmit={handleAddCurrency}>
                {/* I used chatgpt to create regex to allow only accepted input for each field in these input fields */}
                <input type="text" required pattern="[a-zA-Z]{3}" placeholder="Currency Code" value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)}/>
                <input type="number" required pattern="^[0-9]+$" placeholder="Country ID" value={countryId} onChange={(e) => setCountryId(e.target.value)}/>
                <input type="number" required pattern="^-?\d+(\.\d+)?$" placeholder="Conversion Rate" value={conversionRate} onChange={(e) => setConversionRate(e.target.value)} />
                <button>Add</button>
            </form>
        </div>
    );
}

export default Addcurrency