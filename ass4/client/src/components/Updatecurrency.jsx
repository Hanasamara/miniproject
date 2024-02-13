import { useState } from 'react';
import axios from "axios";

function Updatecurrency()
{
    const [currencyCode, setCurrencyCode] = useState('');
    const [currencyRate, setCurrencyRate] = useState('');

    const handleUpdateCurrency = async (e) =>{
        e.preventDefault();
        try {
            // find specific row to update it
            const allCurrencies = await axios.get('http://localhost:3001/api/currency/').then(response => response.data);
            console.log(allCurrencies);

            const specificCurrencyIndex = allCurrencies.findIndex((currency) => currency.currencyCode == currencyCode);
            const specificCurrency = allCurrencies[specificCurrencyIndex];
            console.log(specificCurrency.id);

            //Update that currency
            const updateCurrency = await axios.put(`http://localhost:3001/api/currency/${specificCurrency.id}/${currencyRate}`).then(response => response.data);

            console.log(updateCurrency);

            console.log('Currency update successfully');
    
            } catch (error) {
            console.error('Error update currency:', error);
    
        }


    };
    return(
        <div className="updatecurrency">
            <h3>Update Currency</h3>
            <form onSubmit={handleUpdateCurrency} className="updatecomponent">
                {/* I used chatgpt to create regex to allow only accepted input for each field in these input fields */}
                <input type="text" required pattern="[a-zA-Z]{3}" placeholder="Currency Code" value={currencyCode} onChange={(e)=>{setCurrencyCode(e.target.value)}} />
                <input type="number" required pattern="^-?\d+(\.\d+)?$" placeholder="New Currency Rate" value={currencyRate} onChange={(e)=>{setCurrencyRate(e.target.value)}}/>
                <button>Update</button>
            </form>
        </div>
    );
}

export default Updatecurrency