import React, { Component } from 'react';
import BScroll from 'better-scroll';
import classNames from 'classnames';

const TITLE_HEIGHT = 40
const ANCHOR_HEIGHT = window.innerHeight <= 480 ? 17 : 18;
export default class IndexList extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      fixedTitle: ''
    };
    this.touch = {};
  }

  componentWillMount() {
    this.indexArr = this.props.data.map(item => item.index);
  }

  componentDidMount() {
    this.scroll = new BScroll(this.scrollContainer, {
      probeType: 2 // 开启才能触发scroll事件，应该是性能考虑
    });
    this.scroll.on('scroll', this.setActiveIndex);
    this.scroll.on('scrollEnd', this.setActiveIndex);
  }

  onNavTouchMove = evt => {
    evt.stopPropagation(); // 阻止冒泡防止父元素滚动引起的页面抖动
    const firstTouch = evt.touches[0];
    this.touch.y2 = firstTouch.pageY;
    const delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0; // eslint-disable-line
    let anchorIndex = parseInt(parseInt(this.touch.anchorIndex, 10) + delta, 10);
    // if (this.state.activeIndex === anchorIndex) return;
    if (anchorIndex < 0) {
      anchorIndex = 0;
    } else if (anchorIndex > (this.indexArr.length - 1)) {
      anchorIndex = this.indexArr.length - 1;
    }
    this.scroll.scrollToElement(this.scrollContent.children[anchorIndex], 0);
    this.setState({
      activeIndex: anchorIndex
    });
  };

  onNavTouchStart = evt => {
    evt.stopPropagation(); // 阻止冒泡防止父元素滚动引起的页面抖动
    let anchorIndex = parseInt(evt.target.getAttribute('data-index'), 10);
    const firstTouch = evt.touches[0];
    this.touch.y1 = firstTouch.pageY;
    this.touch.anchorIndex = anchorIndex;
    if (anchorIndex < 0) {
      anchorIndex = 0;
    } else if (anchorIndex > (this.indexArr.length - 1)) {
      anchorIndex = this.indexArr.length - 1;
    }
    this.scroll.scrollToElement(this.scrollContent.children[anchorIndex], 0);
    this.setState({
      activeIndex: parseInt(anchorIndex, 10)
    });
  };

  setActiveIndex = () => {
    const sortTop = (node1, node2) => Math.abs(node1.top) - Math.abs(node2.top);
    const activeIndex = this.calcuHeight().sort(sortTop)[0].index;
    this.setState({
      activeIndex
    });
  };

  setTitle(activeIndex, y) {
    const fixedTitle = (y > 0 || Math.abs(y) < TITLE_HEIGHT)
      ? '' : this.indexArr[activeIndex];
    this.setState({
      fixedTitle
    })
  }

  calcuHeight() {
    const childrenNodeArr = [].slice.call(this.scrollContent.children);
    return childrenNodeArr.map((child, index) => ({
      top: child.getBoundingClientRect().top,
      index
    }));
  }

  render() {
    const { fixedTitle } = this.state;
    // 只有到父元素指定高度，并且子元素内容超过父元素高度的时候，
    // 才会出现纵向滚动
    return (
      <div
        className="scroll-container"
        ref={ins => {
          this.scrollContainer = ins;
        }}
      >
        <ul
          className="scroll-content index-scroll-content"
          ref={content => {
            this.scrollContent = content;
          }}
        >
          {this.props.data.map(dataItem => (
            <li key={dataItem.index}>
              <h5>{dataItem.index}</h5>
              <ul>
                {dataItem.children.map((child, index) => (
                  <li key={index}>{child.name}</li> // eslint-disable-line
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <ul
          className="index-nav"
          onTouchMove={this.onNavTouchMove}
          onTouchStart={this.onNavTouchStart}
        >
          {this.indexArr.map((index, arrIndex) => (
            <li
              key={index}
              data-index={arrIndex}
              className={classNames({
                active: this.state.activeIndex === arrIndex
              })}
            >
              {index}
            </li>
          ))}
        </ul>
        {fixedTitle && <div className="fixed-index-title">{fixedTitle}</div>}
      </div>
    );
  }
}
