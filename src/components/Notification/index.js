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
    animation: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    };
    this.timer = null;
    this.delayClose = this.delayClose.bind(this);
    this.clearToast = this.clearToast.bind(this);
    this.leave = this.leave.bind(this);
    this.isClose = false;
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
    this.notificationDom.classList.remove('bounceInRight');
    this.notificationDom.classList.add('bounceOutRight');

    if (this.props.animation) {
      this.isClose = true;
    } else {
      this.destory();
    }
  }

  leave() {
    if (this.isClose) {
      this.destory();
      this.isClose = false;
    }
  }

  destory() {
    ReactDOM.unmountComponentAtNode(div);
    if (is.function(this.props.onClose)) this.props.onClose();
  }

  render() {
    const {
      type,
      msg,
      className,
      style,
      showClose,
      animation
    } = this.props;

    const {
      isShow
    } = this.state;

    const classnames = classNames('notification', {
      [`is-${type}`]: type,
      animated: animation,
      bounceInRight: animation
    }, className);

    const styleObj = Object.assign({
      position: 'fixed',
      right: '20px',
      top: '20px',
      zIndex: 1000,
      width: '335px'
    }, style);

    if (!isShow) return null;
    return (
      <div
        className={classnames}
        style={styleObj}
        onAnimationEnd={this.leave}
        ref={notification => { this.notificationDom = notification; }}
      >
        {showClose && <button className="delete" onClick={this.clearToast} />}
        <span>{msg}</span>
      </div>
    );
  }
}
const TYPE_ARR = ['error', 'warn', 'success'];
const notification = msg => {
  const config = is.object(msg) ? msg : { msg };
  const component = React.createElement(Notification, config);
  notification.container = config.container || document.body;
  notification.container.appendChild(div);
  ReactDOM.render(component, div);
};

notification.destory = () => {
  ReactDOM.unmountComponentAtNode(div);
  notification.container.removeChild(div);
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
