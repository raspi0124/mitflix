export default {
  data: {
    particles: {
      number: {
        value: 10,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ffffff"
      },
      shape: {
        type: "image",
        stroke: {
          width: 3,
          color: "#fff"
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: "/starburst_white_300_drop_2.png",
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 0.7,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: false,
        distance: 50,
        color: "#ffffff",
        opacity: 0.6,
        width: 1
      },
      move: {
        enable: true,
        speed: 5,
        direction: "bottom",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 300,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      modes: {
        grab: {
          distance: 150,
          line_linked: {
            opacity: 0
          }
        },
        bubble: {
          distance: 200,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.2
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  }
};
