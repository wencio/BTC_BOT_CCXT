## BTC Arbitrage Bot using CCXT

This Node.js bot utilizes the CCXT library to perform arbitrage trading between the Binance and Coinbase Pro exchanges for the BTC/USD trading pair.

### Setup

1. Clone the repository.
2. Install dependencies by running `npm install`.
3. Create a `.env` file in the project root and add your Binance and Coinbase Pro API keys and secrets as follows:
   ```plaintext
   BINANCE_API_KEY=your_binance_api_key
   BINANCE_API_SECRET=your_binance_api_secret
   COINBASE_API_KEY=your_coinbase_api_key
   COINBASE_API_SECRET=your_coinbase_api_secret
   ```
4. Adjust the `symbol`, `type`, `tradeAmount`, and `profitThreshold` variables according to your trading preferences.

### Usage

Run the bot by executing the command `node btc_arbitrage_bot.js` in your terminal.

### Functionality

The bot performs the following steps:

1. Fetches order books from Binance and Coinbase Pro for the specified trading pair.
2. Calculates the best bid and ask prices from both exchanges.
3. Determines if there is an arbitrage opportunity based on the configured profit threshold.
4. Executes trades accordingly, buying on one exchange and selling on the other to exploit the price difference.

### Notes

- Make sure to fund your Binance and Coinbase Pro accounts with sufficient balances for trading.
- Monitor the bot's output and adjust the profit threshold as needed for optimal trading performance.
- Use this bot at your own risk, as trading cryptocurrencies involves inherent risks.

### Disclaimer

This bot is provided for educational purposes only and should not be considered financial advice. Always conduct thorough research and consult with a financial advisor before engaging in any trading activities.
