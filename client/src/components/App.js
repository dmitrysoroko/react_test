import React, { Component } from 'react'
import Config from './Config'
import refresh from '../img/refresh_icon.svg'
import axios from 'axios'
import './styles.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: {
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
      },
      wirelessNetworks: []
    }

    axios.get(`http://localhost:4500/getConfig`)
      .then((response) => {
        this.setState({config: response.data})
      }, (e) => { throw e })
      .catch((err) => {
        console.error(err)
      })

    this.normalize = this.normalize.bind(this)
    this.refreshSSID = this.refreshSSID.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentWillMount() {
    this.refreshSSID()
  }

  refreshSSID() {
    axios.get(`http://localhost:4500/getWirelessNetworks`)
			.then((response) => {
        response.data.sort((a, b) => a.favorite === b.favorite ? b.strength - a.strength : b.favorite - a.favorite)
        this.setState({ wirelessNetworks: response.data })
			}, (e) => { throw e })
			.catch((err) => {
				console.err(err)
			})
  }

  normalize(type) {
    if (!this.state.config.wifi) {
      let config = this.state.config
      config.wifiConfig.wifiMethodIP = 'auto'
      config.wifiConfig.wifiMethodDNS = 'auto'
      config.ssid = ''
      config.wifiSecurity = false
      config.securityKey = ''
      this.setState({config})
    }
    if (!this.state.config.wifiSecurity) {
      let config = this.state.config
      config.securityKey = ''
      this.setState({config})
    }
    if (type) {
      if (this.state.config[type + 'Config'][type + 'MethodIP'] === 'auto') {
        let config = this.state.config
        config[type + 'Config'].IP = ''
        config[type + 'Config'].mask = ''
        config[type + 'Config'].gateway = ''
        this.setState({config})
      }
      if (this.state.config[type + 'Config'][type + 'MethodDNS'] === 'auto') {
        let config = this.state.config
        config[type + 'Config'].preferredDNS = ''
        config[type + 'Config'].alternativeDNS = ''
        this.setState({config})
      }
    }
  }

  handleInputChange(event, type) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    let config = this.state.config
    type ? config[type + 'Config'][name] = value : config[name] = value
    this.setState({config}, () => this.normalize(type))
  }

  handleSave(event) {
    axios.post(`http://localhost:4500/saveConfig`, this.state.config)
			.then((response) => {
        console.log('response:')
        console.log(response.data)
			}, (e) => { throw e })
			.catch((err) => {
				console.err(err)
			})
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSave}>
      <div className="ethernet">
        <h3 className="title">Ethernet Settings</h3>
        <Config config={this.state.config.ethernetConfig} type="ethernet" onChange={(e) => this.handleInputChange(e, 'ethernet')} disabled={false}/>
      </div>
      <div className="wireless">
        <h3 className="title">Wireless Settings</h3>
        <label className="left">
          <input name="wifi" type="checkbox" checked={this.state.config.wifi} onChange={this.handleInputChange} />
          Enable wifi:
        </label>
        <label className="right">
          Wireless Network Name:
          <img src={refresh} onClick={this.refreshSSID} />
          <select name="ssid" value={this.state.config.ssid} onChange={this.handleInputChange} disabled={!this.state.config.wifi} required>
            <option style={{display: 'none'}} value="" disabled>Please select</option>
            {this.state.wirelessNetworks.map((el, idx) => <option key={idx} value={el.name}>{el.name}</option>)}
          </select>
          <sup>*</sup>
        </label>
        <label className="left">
          <input name="wifiSecurity" type="checkbox" checked={this.state.config.wifiSecurity} onChange={this.handleInputChange}
          disabled={!this.state.config.wifi} />
          Enable Wireless Security:
        </label>
        <label className="right">
          Security Key:
          <input name="securityKey" type="text" value={this.state.config.securityKey} onChange={this.handleInputChange}
          disabled={!this.state.config.wifi || !this.state.config.wifiSecurity} required
          pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$"/>
          <sup>*</sup>
        </label>
        <Config config={this.state.config.wifiConfig} type="wifi" onChange={(e) => this.handleInputChange(e, 'wifi')} disabled={!this.state.config.wifi}/>
      </div>
      <div className="control">
        <input className="submit" type="submit" value="Save" />
      </div>
      </form>
    )
  }
}
