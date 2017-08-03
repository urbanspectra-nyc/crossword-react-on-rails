import React from 'react';
import { mount, shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import PuzzleMenu from '../../src/containers/PuzzleMenu'
import MenuButton from '../../src/components/MenuButton'
import PuzzleTitle from '../../src/components/PuzzleTitle'

describe('PuzzleMenu', () => {
  let wrapper;
  let onSpies = jasmine.createSpyObj('on', ['handleClear', 'publishPuzzle']);

  beforeEach(() => {
    wrapper = mount(<PuzzleMenu editMode={false} on={onSpies} />)
  })

  it("should render a div#puzzle-menu", () => {
    expect(wrapper.find("div#puzzle-menu")).toBePresent();
  })

  it("should render a PuzzleTitle component", () => {
    expect(wrapper.find(PuzzleTitle)).toBePresent();
  })

  it("should render a Clear MenuButton with correct props", () => {
    let clear = wrapper.find(MenuButton).filterWhere(n => n.prop('name') == "CLEAR")
    expect(clear).toBePresent()
    expect(clear.props().onClick).toEqual(onSpies.handleClear)
  })


  describe("when not in edit mode", () => {
    it("should not render a Publish MenuButton", () => {
      let publish = wrapper.find(MenuButton).filterWhere(n => n.prop('name') == "PUBLISH")
      expect(publish).not.toBePresent()
    })
  })

  describe("when in edit mode", () => {
    beforeEach(() => {
      wrapper = mount(<PuzzleMenu editMode={true} on={onSpies} />)
    })

    it("should render a Publish MenuButton with correct props", () => {
      let publish = wrapper.find(MenuButton).filterWhere(n => n.prop('name') == "PUBLISH")
      expect(publish).toBePresent()
      expect(publish.props().onClick).toEqual(onSpies.publishPuzzle)
    })
  })
})
