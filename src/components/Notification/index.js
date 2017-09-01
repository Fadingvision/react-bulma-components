import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import is from '../../util/is';

const div = document.createElement('div');
class Notification extends Component {
  static displayName = 'Notification';

  static defaultProps = {
    closeTimeoutMS: 3000,
    msg: null,
    type: null,
    showClose: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    };
    this.timer = null;
    this.delayClose = this.delayClose.bind(this);
    this.clearToast = this.clearToast.bind(this);
  }

  componentDidMount() {
    this.delayClose(this.props.closeTimeoutMS);
  }

  componentWillUpdate(nextProps) {
    this.delayClose(nextProps.closeTimeoutMS);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  delayClose(closeTimeoutMS) {
    clearTimeout(this.timer);
    if (closeTimeoutMS) {
      this.timer = setTimeout(this.clearToast, closeTimeoutMS);
    }
  }

  clearToast() {
    ReactDOM.unmountComponentAtNode(div);
    if (is.function(this.props.onClose)) this.props.onClose();
  }

  render() {
    const {
      type,
      msg,
      className,
      showClose
    } = this.props;

    const {
      isShow
    } = this.state;

    const classnames = classNames('notification', {
      [`is-${type}`]: type
    }, className);

    if (!isShow) return null;
    return (
      <div className={classnames}>
        {showClose && <button className="delete" />}
        <span>{msg}</span>
      </div>
    );
  }
}
const TYPE_ARR = ['error', 'warn', 'success'];
const notification = msg => {
  const config = is.object(msg) ? msg : { msg };
  const component = React.createElement(Notification, config);
  document.body.appendChild(div);
  ReactDOM.render(component, div);
};

notification.destory = () => {
  ReactDOM.unmountComponentAtNode(div);
  document.body.removeChild(div);
};
TYPE_ARR.forEach(type => {
  notification[type] = msg => {
    const config = is.object(msg) ? {
      ...msg,
      type
    } : {
      type,
      msg
    };
    notification(config);
  };
});

export default notification;
