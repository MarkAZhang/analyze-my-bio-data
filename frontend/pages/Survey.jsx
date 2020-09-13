import { Component } from 'react'
import { Link } from 'react-router-dom'
import { set } from 'lodash/fp'
import cx from 'classnames'

import Button from '~/components/Button'
import Icon from '~/components/Icon'
import RadioButton from '~/components/RadioButton'
import Section from '~/core/Section'

import { STEPS } from './surveySteps'
import cs from './survey.css'

class Survey extends Component {
  state = {
    selectedOptions: {},
    currentStep: 'start',
  }

  goToStep = step => {
    this.setState({
      currentStep: step,
    })
  }

  selectOption = (step, value) => {
    const { selectedOptions } = this.state
    this.setState({
      selectedOptions: set(step, value, selectedOptions),
    })
  }

  render() {
    const { currentStep, selectedOptions } = this.state
    const curStep = STEPS[currentStep]

    return (
      <Section className={cx(cs.survey, curStep.previousStep && cs.hasPreviousStep)}>
        <div className={cs.text}>
          {curStep.previousStep && (
            <div className={cs.backButton} onClick={() => this.goToStep(curStep.previousStep)}>
              &larr; Go back
            </div>
          )}
          <div className={cs.title}>
            {curStep.title}
          </div>
          {curStep.subtitle && (
            <div className={cs.subtext}>
              {curStep.subtitle}
            </div>
          )}
          {curStep.options && (
            <div className={cs.options}>
              {curStep.options.map(option => (
                <div
                  className={cx(cs.option, option.disabled && cs.disabled)}
                  onClick={() => !option.disabled && this.selectOption(currentStep, option.value)}
                >
                  <RadioButton
                    selected={selectedOptions[currentStep] === option.value}
                    disabled={option.disabled}
                  />
                  <div className={cs.label}>{option.label}</div>
                </div>
              ))}
            </div>
          )}
          <div className={cs.button}>
            <Button
              label={curStep.buttonLabel}
              onClick={() => this.goToStep(curStep.nextStep)}
              disabled={curStep.options && !selectedOptions[currentStep]}
            />
          </div>
        </div>
      </Section>
    )
  }
}

export default Survey
