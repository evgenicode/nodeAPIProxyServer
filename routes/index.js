const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')

// Environment variables
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// Init cache
let cache = apicache.middleware

router.get('/', cache('2 minutes'), async (inRequest, inResponse) => {
  try {
    console.log()

    const params = new URLSearchParams({
      [API_KEY_NAME] : API_KEY_VALUE,
      ...url.parse(inRequest.url, true).query
    })
    //console.log(params)
    const apiResponse = await needle('get', `${API_BASE_URL}?${params}`)
    const data = apiResponse.body

    // Log the request to the public API
    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`)
    }

    inResponse.status(200).json(data)
  } catch (error) {
    inResponse.status(500).json({ error })
  }

})

module.exports = router