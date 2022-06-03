const express = require('express')
const router = express.Router()
const needle = require('needle')

router.get('/', async (inRequest, inResponse) => {
  const apiResonse = await needle('get', )
})

module.exports = router