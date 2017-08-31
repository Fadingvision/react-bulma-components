import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import Button from './index';

describe('Button test', () => {

  it('should render correctly', () => {
    const wrapper = render(<Button>button text</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should change loading state instantly by default', () => {
    class DefaultButton extends Component {
      state = {
        loading: false,
      };
      enterLoading = () => {
        this.setState({ loading: true });
      }
      render() {
        return <Button loading={this.state.loading} onClick={this.enterLoading}>Button</Button>;
      }
    }
    const wrapper = mount(
      <DefaultButton />
    );
    wrapper.simulate('click');
    expect(wrapper.hasClass('is-loading')).toBe(true);
  });
});
