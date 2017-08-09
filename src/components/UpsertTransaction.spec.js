import React from 'react'
import { shallow } from 'enzyme'
import UpsertTransaction from './UpsertTransaction'
import {TRANSACTION_TYPES} from '../resources/enums'

function setup() {
  const component = shallow(
    <UpsertTransaction/>
  )

  return {
    component: component
  }
}

describe('UpsertTransaction component', () => {
  it('should exist', () => {
    expect(UpsertTransaction).toBeTruthy()
  })
  it('should have a type select element', () => {
    const { component } = setup()
    const matchedSelects = component.find('select[name="type"]');
    expect(matchedSelects.length).toEqual(1);
  })
  it('should have a type select element with values matching TRANSACTION_TYPES', () => {
    const { component } = setup()
    for(let transactionTypeKey in TRANSACTION_TYPES){
        const matchedOptions = component.find(`select[name="type"] option[value="${TRANSACTION_TYPES[transactionTypeKey].code}"]`);
        expect(matchedOptions.length).toEqual(1);
    }
  })
  it('should have a type select element with values labels matching TRANSACTION_TYPES', () => {
    const { component } = setup()
    for(let transactionTypeKey in TRANSACTION_TYPES){
        const matchedOption = component.find(`select[name="type"] option[value="${TRANSACTION_TYPES[transactionTypeKey].code}"]`);
        expect(matchedOption.text()).toEqual(TRANSACTION_TYPES[transactionTypeKey].display);
    }
  })
})
