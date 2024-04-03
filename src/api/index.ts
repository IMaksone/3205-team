import { CurrencyRatesInterface } from "src/store/types";

const GET_RATES = "https://open.er-api.com/v6/latest/";

export const apiGetRates = async (rates: CurrencyRatesInterface) => {
  try {
    const keys = Object.keys(rates);

    const promises = keys.map((key) =>
      fetch(GET_RATES + key).then((res) => res.json())
    );

    const results = (await Promise.all(promises)) || [];

    const newRates = { ...rates };

    results.forEach((result) => {
      newRates[result.base_code] = {};

      keys.forEach((el) => (newRates[result.base_code][el] = result.rates[el]));
    });

    return newRates;
  } catch (error) {
    console.log("**** API ERROR ****", error);
  }
};

// results = [
//   {
//     base_code: "USD",
//     documentation: "https://www.exchangerate-api.com/docs/free",
//     provider: "https://www.exchangerate-api.com",
//     rates: {
//       USD: 1,
//       AED: 3.6725,
//       AFN: 71.14029,
//       ALL: 95.510835,
//       AMD: 391.250925,
//       ...
//     },
//     result: "success",
//     terms_of_use: "https://www.exchangerate-api.com/terms",
//     time_eol_unix: 0,
//     time_last_update_unix: 1712102551,
//     time_last_update_utc: "Wed, 03 Apr 2024 00:02:31 +0000",
//     time_next_update_unix: 1712189741,
//     time_next_update_utc: "Thu, 04 Apr 2024 00:15:41 +0000"
//   },
//   ...
// ];
