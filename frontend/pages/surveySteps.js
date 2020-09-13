export const STEPS = {
  start: {
    title: 'Find the best statistical test for your experiment',
    subtitle: `This tool will help you choose the best statistical analysis
      method based on the details of your experiment and the scientific question
      you are interested in.`,
    buttonLabel: 'Start',
    nextStep: 'experimentType',
    showGraphic: true,
  },
  experimentType: {
    title: 'Which of the following best describes your experiment?',
    options: [
      {
        label: 'Animal study',
        value: 'animalStudy',
      },
      {
        label: 'Omics analysis (coming soon)',
        value: 'omics',
        disabled: true,
      },
      {
        label: '96-well Plate analysis (coming soon)',
        value: '96Well',
        disabled: true,
      },
      {
        label: '384-well Plate analysis (coming soon)',
        value: '384Well',
        disabled: true,
      },
      {
        label: 'Behavioral tests (coming soon)',
        value: 'behavioralTest',
        disabled: true,
      },
    ],
    buttonLabel: 'Continue',
    previousStep: 'start',
    nextStep: 'experimentType',
  },
}
