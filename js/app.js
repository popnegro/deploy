gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-title", {
  opacity: 0,
  y: 80,
  duration: 1.2,
  ease: "power4.out"
});

gsap.utils.toArray(".project").forEach((project) => {
  gsap.from(project, {
    scrollTrigger: {
      trigger: project,
      start: "top 80%"
    },
    opacity: 0,
    y: 100,
    duration: 1
  });
});
