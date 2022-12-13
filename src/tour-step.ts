const tourStep = {
  created(el, binding) {
    const stepNumber = binding.arg;
    const { tour, options } = binding.value;
    const step = tour.getById(stepNumber)
    if (!options.attachTo) {
      options.attachTo = {};
    }
    options.attachTo.element = el;
    if (!step) {
      tour.addStep({
        id: stepNumber,
        ...options,
      });
      tour.steps.sort((a, b) => a.id - b.id);
    } else {
      step.updateStepOptions({
        id: stepNumber,
        ...options,
      })
    }
  },
};

export default tourStep;
