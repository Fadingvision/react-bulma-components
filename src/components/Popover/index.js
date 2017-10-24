import React from 'react';
import ReactDOM from 'react-dom';

function PopoverContent(props) {
  const { position } = props;
  const style = {
    right: document.body.getBoundingClientRect().width + (position.width / 2) - // eslint-disable-line
      position.right + 'px',  // eslint-disable-line
    top: `${position.actualTop + position.height + 20}px`
  };
  return (
    <div>
      <div className="am-popover-mask" onClick={props.close} onTouchMove={props.close} />
      <div
        className="am-popover fortest am-popover-placement-bottomRight"
        style={style}
      >
        <div className="am-popover-content">
          {props.content}
        </div>
      </div>
    </div>
  );
}
const div = document.createElement('div');
document.body.appendChild(div);

export default class Popover extends React.Component {
  componentDidMount() {
    const position = this.calcuPosition();
    if (this.props.visible) {
      const component = React.createElement(PopoverContent, {
        close: this.props.close,
        position,
        content: this.props.content,
      });
      ReactDOM.render(component, div);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.visible && this.props.visible) {
      ReactDOM.unmountComponentAtNode(div);
    } else if (newProps.visible && !this.props.visible) {
      const position = this.calcuPosition();
      const component = React.createElement(PopoverContent, {
        close: this.props.close,
        position,
        content: newProps.content,
      });
      ReactDOM.render(component, div);
    }
  }

  componentWillUnmount() {
    if (this.props.visible) {
      ReactDOM.unmountComponentAtNode(div);
    }
  }

  calcuPosition() {
    function getElementTop(element) {
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return actualTop;
    }
    const target = ReactDOM.findDOMNode(this); // eslint-disable-line
    const position = target.getBoundingClientRect();
    position.actualTop = getElementTop(target);
    return position;
  }

  render() {
    return this.props.children;
  }
}
