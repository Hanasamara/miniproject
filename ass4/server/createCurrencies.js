const Currency = require("./models/currency");

Currency.sync().then(()=>
{
    console.log("Sync currency table");
    Currency.bulkCreate([
        { currencyCode: 'SDN', countryId: 2020, conversionRate: 1.79 },
        { currencyCode: 'OMN', countryId: 5001, conversionRate: 0.25 },
        { currencyCode: 'USD', countryId: 1001, conversionRate: 1.0 },
        { currencyCode: 'CAD', countryId: 1002, conversionRate: 0.78 },
        { currencyCode: 'AUD', countryId: 1003, conversionRate: 0.74 },
        { currencyCode: 'GBP', countryId: 1004, conversionRate: 0.64 },
        { currencyCode: 'EUR', countryId: 1005, conversionRate: 0.85 },
        { currencyCode: 'JPY', countryId: 1006, conversionRate: 110.15 },
        { currencyCode: 'CNY', countryId: 1007, conversionRate: 6.46 },
        { currencyCode: 'INR', countryId: 1008, conversionRate: 74.48 },
        { currencyCode: 'BRL', countryId: 1009, conversionRate: 5.24 },
        { currencyCode: 'RUB', countryId: 1010, conversionRate: 75.90 },
        { currencyCode: 'ZAR', countryId: 1011, conversionRate: 15.07 },
        { currencyCode: 'MXN', countryId: 1012, conversionRate: 20.06 },
        { currencyCode: 'ARS', countryId: 1013, conversionRate: 91.29 },
        { currencyCode: 'NGN', countryId: 1014, conversionRate: 411.29 },
        { currencyCode: 'EGP', countryId: 1015, conversionRate: 15.70 },
        { currencyCode: 'SAR', countryId: 1016, conversionRate: 3.75 },
        { currencyCode: 'KRW', countryId: 1017, conversionRate: 1124.90 },
        { currencyCode: 'TRY', countryId: 1018, conversionRate: 8.41 },
        { currencyCode: 'IDR', countryId: 1019, conversionRate: 14293.00 },
        { currencyCode: 'NOK', countryId: 1020, conversionRate: 8.86 },
        { currencyCode: 'SEK', countryId: 1021, conversionRate: 8.31 },
        { currencyCode: 'BEL', countryId: 1022, conversionRate: 40.34 },
        { currencyCode: 'CHF', countryId: 1023, conversionRate: 0.92 },
        { currencyCode: 'AED', countryId: 1024, conversionRate: 3.67 },
        { currencyCode: 'DKK', countryId: 1025, conversionRate: 6.35 },
        { currencyCode: 'SGD', countryId: 1026, conversionRate: 1.32 },
        { currencyCode: 'PLN', countryId: 1027, conversionRate: 3.87 },
        { currencyCode: 'ILS', countryId: 1028, conversionRate: 3.24 },
        { currencyCode: 'IEP', countryId: 1029, conversionRate: 0.86 },
        { currencyCode: 'PTE', countryId: 1030, conversionRate: 1.99 },
        { currencyCode: 'MYR', countryId: 1031, conversionRate: 4.11 },
        { currencyCode: 'THB', countryId: 1032, conversionRate: 32.96 },
        { currencyCode: 'GRD', countryId: 1033, conversionRate: 341.13 },
        { currencyCode: 'UAH', countryId: 1034, conversionRate: 27.45 },
        { currencyCode: 'PHP', countryId: 1035, conversionRate: 48.06 },
        { currencyCode: 'PKR', countryId: 1036, conversionRate: 288.76 },
        { currencyCode: 'COP', countryId: 1037, conversionRate: 3826.00 },
        { currencyCode: 'BDT', countryId: 1038, conversionRate: 85.85 },
        { currencyCode: 'VND', countryId: 1039, conversionRate: 23061.00 },
        { currencyCode: 'CZK', countryId: 1040, conversionRate: 21.80 },
        { currencyCode: 'CLP', countryId: 1041, conversionRate: 801.54 },
        { currencyCode: 'RON', countryId: 1042, conversionRate: 4.95 },
        { currencyCode: 'HUF', countryId: 1043, conversionRate: 297.50 },
        { currencyCode: 'BYN', countryId: 1044, conversionRate: 2.56 },
        { currencyCode: 'AZN', countryId: 1045, conversionRate: 1.70 }
    ])
})