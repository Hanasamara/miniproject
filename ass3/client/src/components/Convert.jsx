function Convert()
{
    return (
    <div className="converter">
        <div>
            <h3>Convert</h3>
        </div>
        <form className="conbox">
            {/* I used chatgpt to create regex to allow only accepted input for each field in these input fields */}
            <label>FROM</label>
            <input type="text" required pattern="[a-zA-Z]{3}" placeholder="Currency Code"/>
            <input type="number" pattern="^\d+$" placeholder="Amount"/>

            <label>TO</label>
            <input type="text" required pattern="[a-zA-Z]{3}" placeholder="Currency Code"/>
            <button>Convert</button>
        </form><br></br>
        <p className="outputCurrencyAmount"></p>

    </div>
    );
}

export default Convert