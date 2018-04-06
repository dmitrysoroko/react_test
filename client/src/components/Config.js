import React, { Component } from 'react'

export default class Config extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: this.props.config
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ config: newProps.config })
  }

  render() {
    return (
      <div className="config">
        <label className="left">
          <input name={this.props.type + 'MethodIP'} type="radio" value="auto"
          checked={this.state.config[this.props.type + 'MethodIP'] === 'auto'}
          onChange={this.props.onChange}
          disabled={this.props.disabled} />
          Obtain an IP address automatically (DCHP/BootP)
        </label>
        <label className="left">
          <input name={this.props.type + 'MethodIP'} type="radio" value="presented"
          checked={this.state.config[this.props.type + 'MethodIP'] === 'presented'}
          onChange={this.props.onChange}
          disabled={this.props.disabled} />
          Use the following IP address:
        </label>
        <label className="right">
          IP address:
          <input name="IP" type="text" value={this.state.config.IP} onChange={this.props.onChange}
          disabled={this.props.disabled || this.state.config[this.props.type + 'MethodIP'] === 'auto'} required
          pattern="((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}"/>
          <sup>*</sup>
        </label>
        <label className="right">
          Subnet Mask:
          <input name="mask" type="text" value={this.state.config.mask} onChange={this.props.onChange}
          disabled={this.props.disabled || this.state.config[this.props.type + 'MethodIP'] === 'auto'} required
          pattern="((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}"/>
          <sup>*</sup>
        </label>
        <label className="right">
          Default Gateway:
          <input name="gateway" type="text" value={this.state.config.gateway} onChange={this.props.onChange}
          disabled={this.props.disabled || this.state.config[this.props.type + 'MethodIP'] === 'auto'}
          pattern="((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}"/>
        </label>
        <label className="left">
          <input name={this.props.type + 'MethodDNS'} type="radio" value="auto"
          checked={this.state.config[this.props.type + 'MethodDNS'] === 'auto'}
          onChange={this.props.onChange}
          disabled={this.props.disabled} />
          Obtain DNS server address automatically
        </label>
        <label className="left">
          <input name={this.props.type + 'MethodDNS'} type="radio" value="presented"
          checked={this.state.config[this.props.type + 'MethodDNS'] === 'presented'}
          onChange={this.props.onChange}
          disabled={this.props.disabled} />
          Use the following DS server address:
        </label>
        <label className="right">
          Preferred DNS server:
          <input name="preferredDNS" type="text" value={this.state.config.preferredDNS} onChange={this.props.onChange}
          disabled={this.props.disabled || this.state.config[this.props.type + 'MethodDNS'] === 'auto'} required
          pattern="((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}"/>
          <sup>*</sup>
        </label>
        <label className="right">
          Alternative DNS server:
          <input name="alternativeDNS" type="text" value={this.state.config.alternativeDNS} onChange={this.props.onChange}
          disabled={this.props.disabled || this.state.config[this.props.type + 'MethodDNS'] === 'auto'}
          pattern="((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}"/>
        </label>
      </div>
    )
  }
}
