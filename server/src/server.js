import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'
import networks from './resources/mock.json'

const app = express()
const upload = multer()

let config = {
  wifi: false,
  ethernetConfig: {
    ethernetMethodIP: 'auto',
    ethernetMethodDNS: 'auto',
    IP: '',
    mask: '',
    gateway: '',
    preferredDNS: '',
    alternativeDNS: ''
  },
  wifiConfig: {
    wifiMethodIP: 'auto',
    wifiMethodDNS: 'auto',
    IP: '',
    mask: '',
    gateway: '',
    preferredDNS: '',
    alternativeDNS: ''
  },
  ssid: '',
  wifiSecurity: false,
  securityKey: ''
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


app.get('/getWirelessNetworks', (req, res) => {
  res.type('json')
	res.send(networks)
})

app.get('/getConfig', (req, res) => {
  res.type('json')
	res.send(config)
})

app.post('/saveConfig', (req, res) => {
  config = req.body
  res.type('json')
	res.send({result: 'success'})
})

export default app
