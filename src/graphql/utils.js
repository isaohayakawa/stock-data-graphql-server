import fetch from 'node-fetch'
import moment from 'moment'

const companyDataMap = {}

async function _fetchCompanyData(ticker) {
  let result
  const res = await fetch(
    `https://yfapi.net/v6/finance/quote?symbols=${ticker}`,
    {
      method: 'get',
      headers: {
        'x-api-key': process.env.KEY,
      },
    }
  )
  const data = await res.json()
  const results = data?.quoteResponse?.result
  if (results.length === 1) {
    result = results[0]
  } else {
    throw Error('No data returned')
  }

  return result
}

async function getCompanyData(ticker) {
  let data
  if (ticker === '') {
    throw Error('Please enter a valid ticker!')
  }

  const tickerUpperCase = ticker.toUpperCase()
  const companyDataCached = companyDataMap[tickerUpperCase]
  if (companyDataCached) {
    data = companyDataCached
  } else {
    data = _fetchCompanyData(ticker)
    companyDataMap[tickerUpperCase] = data
  }

  return data
}

async function getPriceHistory(ticker) {
  let result
  const res = await fetch(
    `https://yfapi.net/v8/finance/spark?symbols=${ticker}&interval=1d&range=1y`,
    {
      method: 'get',
      headers: {
        'x-api-key': '0BWqCoY9mr33pys0d7T2lopgAsf23V2nO1iSGgb0',
      },
    }
  )
  const data = await res.json()
  const tickerUpperCase = ticker.toUpperCase()
  const pricingData = data[tickerUpperCase]
  if (pricingData) {
    const timestamps = pricingData.timestamp
    result = {
      dates: timestamps.map((time) => moment(time, 'X').format('YYYYMMDD')),
      prices: pricingData.close,
    }
  } else {
    throw Error('No data returned')
  }

  return result
}

export { getCompanyData, getPriceHistory }
