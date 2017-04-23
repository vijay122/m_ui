import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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
    const styles = require('./PanelContainer.scss');
    return (
      <Card>
    <CardHeader className={styles.panelHeader}
      title={this.props.title}
      subtitle={this.props.subtitle}
      avatar={uncheckIcon}
    />
<div>
{this.props.children}
</div>
  </Card>
    );
  }
}