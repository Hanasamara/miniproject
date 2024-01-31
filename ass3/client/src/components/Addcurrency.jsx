import react from "react";


function Addcurrency({onAddCurrency,onCurrencyCode,onCountryId,onConversionRate})
{
    return (
        <div className="addcurrency">
            <h3>Add Currency</h3>
            <div className="addinginput">
                <input type="text" placeholder="Currency Code" onChange={(e) => onCurrencyCode(e.target.value)}/>
                <input type="text" placeholder="Country ID" onChange={(e) => onCountryId(e.target.value)}/>
                <input type="text" placeholder="Conversion Rate" onChange={(e) => onConversionRate(e.target.value)} />
                <button onClick={onAddCurrency}>Add</button>
            </div>
        </div>
    );
}

export default Addcurrency