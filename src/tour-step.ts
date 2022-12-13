const tourStep = {
  created(el, binding) {
    const step = binding.arg;
    const { tour, options } = binding.value;
    if (!tour.getById(step)) {
      if (!options.attachTo) {
        options.attachTo = {};
      }
      options.attachTo.element = el;
      tour.addStep({
        id: step,
        ...options,
      });
      tour.steps.sort((a, b) => a.id - b.id);
    }
  },
};

export default tourStep;
