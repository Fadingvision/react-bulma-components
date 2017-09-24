import React, { Component } from 'react';
import BScroll from 'better-scroll';
// import IScroll from 'iscroll';

let number = 100;

export default class PullMore extends Component {
  constructor() {
    super();
    this.state = {
      list: [
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123,
        123
      ]
    }
  }

  componentDidMount() {
    // this.bsIns = new IScroll(this.scrollContainer);
    this.scroll = new BScroll(this.scrollContainer, {
      pullUpLoad: true,
      pullDownRefresh: true,
    });

    // 开始上拉加载，此时应该通知父元素加载数据
    this.scroll.on('pullingUp', () => {
      this.isPullUpLoad = true // 用于展现页面loading效果
      this.getMoreData()
    })

    // 开始下拉刷新，此时应该通知父元素加载数据
    this.scroll.on('pullingDown', () => {
      this.iPullingDown = true // 用于展现页面loading效果
      this.getMoreData1()
    })
  }

  getMoreData = () => {
    setTimeout(() => {
      this.setState(prevState => {
        const newList = [];
        for (let i = 0; i < 10; i++) { //eslint-disable-line
          newList.push(++number); //eslint-disable-line
        }
        return {
          list: prevState.list.concat(newList)
        }
      }, () => {
        // 终止上拉加载并重新计算scroll
        this.scroll.finishPullUp();
        this.scroll.refresh();
      })
    }, 1500)
  }

  getMoreData1 = () => {
    setTimeout(() => {
      this.setState(prevState => {
        const newList = [];
        for (let i = 0; i < 10; i++) { //eslint-disable-line
          newList.push(++number); //eslint-disable-line
        }
        prevState.list.unshift(...newList)
        return {
          list: prevState.list
        }
      }, () => {
        // 终止下拉刷新并重新计算scroll
        this.scroll.finishPullDown();
        this.scroll.refresh();
      })
    }, 1500)
  }

  render() {
    // 只有到父元素指定高度，并且子元素内容超过父元素高度的时候，
    // 才会出现纵向滚动
    return (
      <div
        className="scroll-container"
        ref={ins => {
          this.scrollContainer = ins;
        }}
      >
        <ul className="pull-more">
          {
            this.state.list.map((item, index) => (
              <li key={index}>{item}</li> // eslint-disable-line
            ))
          }
        </ul>
      </div>
    );
  }
}
