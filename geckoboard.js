var API_KEY = process.env.GB_API_KEY;

var gb = require('geckoboard')(API_KEY);

module.exports = {
  prepareData: function (data) {
    postToGeckoboard(data);
  }
};

function postToGeckoboard (data) {
  gb.datasets.findOrCreate(
    {
      id: 'usd_bitcoin_exchange_rate_tracker',
      fields: {
        buy: {
          type: 'money',
          name: 'Buy',
          currency_code: "USD"
        },
        sell: {
          type: 'money',
          name: 'Sell',
          currency_code: "USD"
        },

        last: {
          type: 'money',
          name: 'Last price',
          currency_code: "USD"
        },
        datetime: {
          type: 'datetime',
          name: 'Datetime'
        }
      }
    },
    function (err, dataset) {
      if (err) {
        console.error(err);
        return;
      }

      dataset.put(
        data,
        function (err) {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Dataset created and data added');
        }
      );
    }
  );
}
