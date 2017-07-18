import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';
var tickIcon = require('./tick.svg');
var uncheckIcon = require('./unchecked.svg');

export default class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  validate()
  {
    if(this.props.validated ==true)
    {
      return tickIcon;
    }
    else
    {
      return uncheckIcon;
    }
  }

  render() {
    var icon = tickIcon;
    if(this.props.status && this.props.status.length>0)
    {
      icon = uncheckIcon;
    }
    const styles = require('./PanelContainer.scss');
    return (

      <Card>
    <CardHeader className={styles.panelHeader}
      title={this.props.title}
      subtitle={this.props.subtitle}
      avatar={icon}
    />
{
  this.props.status && this.props.status.length>0 && 
          <div className={styles.scriptStyles}>
                  {this.props.status != undefined && this.props.status.map(function (status) {
                    return <li><span>{status}</span></li>
                  })
                }
          </div>
        }
<div>
{this.props.children}
</div>
  </Card>
    );
  }
}