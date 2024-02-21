import { useState } from 'react';
import axios from "axios";

function Convert()
{
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState(null);

    const handleConvert = async (e) => 
    {
        e.preventDefault();
        try {
            // Retrieve all currencies
            const allCurrencies = await axios.get('http://localhost:3001/api/currency/').then(response => response.data);
            console.log(allCurrencies);

            // find from currency rate
            const fromCurrencyIndex = allCurrencies.findIndex((currency) => currency.currencyCode== fromCurrency);
            const fromCurrencyRecord = allCurrencies[fromCurrencyIndex];
            console.log(fromCurrencyRecord.conversionRate);

            // find to currency rate
            const toCurrencyIndex = allCurrencies.findIndex((currency) => currency.currencyCode == toCurrency);
            const toCurrencyRecord = allCurrencies[toCurrencyIndex];
            console.log(toCurrencyRecord.conversionRate);

            // conversion equation
            
            const converted = (Number(amount) * toCurrencyRecord.conversionRate)/ fromCurrencyRecord.conversionRate;
            setConvertedAmount(converted);

    
            } catch (error) {
            console.error('Error converting currency:', error);
    
        }
    }

    return (
    <div className="converter">
        <div>
            <h3>Convert</h3>
        </div>
        <form onSubmit={handleConvert} className="conbox" >
            {/* I used chatgpt to create regex to allow only accepted input for each field in these input fields */}
            <label id="fromc-label">FROM</label>
            <input type="text" required pattern="[a-zA-Z]{3}" placeholder="Currency Code From" value={fromCurrency} onChange={(e)=>setFromCurrency(e.target.value)}/>
            <input type="number" pattern="^\d+$" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>

            <label>TO</label>
            <input type="text" required pattern="[a-zA-Z]{3}" placeholder="Currency Code To" value={toCurrency} onChange={(e)=>setToCurrency(e.target.value)}/>
            <button >Convert</button>
        </form>
        <br></br>
        <p title="outputCurrencyAmount">{convertedAmount}</p>

    </div>
    );
}

export default Convert