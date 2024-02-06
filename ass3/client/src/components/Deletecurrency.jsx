import { useState } from 'react';
import axios from "axios";

function Deletecurrency()
{
    const [currencyCode, setCurrencyCode] = useState('');

    const handleDeleteCurrency = async (e) =>
    {
        e.preventDefault();
        try {
            // find specific row to update it
            const allCurrencies = await axios.get('http://localhost:3001/api/currency/').then(response => response.data);
            console.log(allCurrencies);

            const specificCurrencyIndex = allCurrencies.findIndex((currency) => currency.currencyCode == currencyCode);
            const specificCurrency = allCurrencies[specificCurrencyIndex];
            console.log(specificCurrency.id);

            //Update that currency
            const deleteCurrency = await axios.delete(`http://localhost:3001/api/currency/${specificCurrency.id}`).then(response => response.data);

            console.log(deleteCurrency);

            console.log('Currency delete successfully');
    
            } catch (error) {
            console.error('Error delete currency:', error);
    
        }

    };
    return(
        <div className="deletecurrency">
            <h3>Delete Currency</h3>
            <div className="delcomponent">
                {/* I used chatgpt to create regex to allow only accepted input for each field in these input fields */}
                <input type="text" required pattern="[a-zA-Z]{3}" placeholder="Currency Code" value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)}/>
                <button onClick={handleDeleteCurrency} >Delete</button>
            </div>
        </div>
    );

}

export default Deletecurrency