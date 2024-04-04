require('dotenv').config();
const ccxt = require('ccxt');


// Initialize excahnges
const binance = new ccxt.binance({
    apiKey: process.env.BINANCE_API_KEY,
    secret: process.env.BINANCE_API_SECRET

});

const coinbase = new ccxt.coinbasepro({
    apiKey: process.env.COINBASE_API_KEY,
    secret: process.env.COINBASE_API_SECRET

});

// Trade parameters
const symbol = 'BTC/USD';	
const type = 'limit';
const tradeAmount = '0.001'; // BTC amount
const profitThreshold = 10;


const checkArbitrageOpportunity = async()=>{
    // Fectch order books
    const binanceOrderBook = await binance.fetchOrderBook(symbol);
    const coinbaseOrderBook = await coinbase.fetchOrderBook(symbol);

    const binanceBestAsk = binanceOrderBook.asks[0][0];
    const binanceBestBid = binanceOrderBook.bids[0][0];
    const coinbaseBestBid = coinbaseOrderBook.bids[0][0];
    const coinbaseBestAsk = coinbaseOrderBook.asks[0][0];
    
    console.log ('Binance order book');  
    console.log (binanceOrderBook.asks);
    console.log ('Coinbase order book');  
    console.log (coinbaseOrderBook.asks);
    console.log(`best bid on Binance:${binanceBestBid }`);
    console.log(`best ask on Binance:${binanceBestAsk}`);
    console.log(`best bid on Coinbase:${coinbaseBestBid}`);
    console.log(`best ask on Coinbase:${coinbaseBestAsk}`);
   
 // Check for arbitrage opportunity : Buy on Binance, Sell on Coinbase Pro
    if (coinbaseBestBid - binanceBestAsk > profitThreshold) {
        console.log `Arbitrage opportunity found! Buy on Binance at ${binanceBestAsk}`;
        try {
            const buyOrder = await binance.createOrder(symbol, type, 'buy', tradeAmount, binanceBestAsk);
            const sellOrder = await coinbase.createOrder(symbol, type, 'sell', tradeAmount, coinbaseBestBid);
            console.log(buyOrder);
            console.log(sellOrder);
        }catch(error){
            console.log(error);
        }
    } else if (binanceBestBid - coinbaseBestAsk > profitThreshold) {
        console.log `Arbitrage opportunity found! Buy on Coinbase at ${coinbaseBestAsk}`;
        try {
            const buyOrder = await coinbase.createOrder(symbol, type, 'buy', tradeAmount, coinbaseBestAsk);
            const sellOrder = await coinbase.createOrder(symbol, type, 'sell', tradeAmount, binanceBestBid);
            console.log(buyOrder);
            console.log(sellOrder);

        }catch(error){
            console.log(error);
        }
    }
}

checkArbitrageOpportunity();





