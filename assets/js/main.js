const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;
const root = document.documentElement;


themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  updateColors();
  updateIcon();
});


function updateColors() {
  if (body.classList.contains('dark-mode')) {
    root.style.setProperty('--background', '#2E2D2D');
    root.style.setProperty('--textcolor1', '#ECECEC');
    root.style.setProperty('--textcolorpurple', '#A36DFF');
    root.style.setProperty('--textcolorblue', '#C4E6FF');
    root.style.setProperty('--textcolorgreen', '#B4D54D');
    root.style.setProperty('--textcolorpink', '#FF5084');
    root.style.setProperty('--colorhover', '#1E1D1D');
    root.style.setProperty('--colordescription', '#b5b5b5');
    root.style.setProperty('--datecolor', '#fffdfdc7');
  } else {
    root.style.setProperty('--background', '#ECECEC');
    root.style.setProperty('--textcolor1', '#2E2D2D');
    root.style.setProperty('--textcolorpurple', '#52b77c');
    root.style.setProperty('--textcolorblue', '#6988E2');
    root.style.setProperty('--textcolorgreen', '#B4D54D');
    root.style.setProperty('--textcolorpink', '#F36870');
    root.style.setProperty('--colorhover', '#1E1D1D');
    root.style.setProperty('--colordescription', '#9a9a9a');
    root.style.setProperty('--datecolor', '#000000a6');
  }
}


function updateIcon() {
  if (body.classList.contains('dark-mode')) {
    themeIcon.classList.remove('bi-moon-stars-fill');
    themeIcon.classList.add('bi-brightness-high-fill');
  } else {
    themeIcon.classList.remove('bi-brightness-high-fill');
    themeIcon.classList.add('bi-moon-stars-fill');
  }
}


updateColors();
updateIcon();






(function() {
  "use strict";


  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }


  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }


  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }


  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar .scrollto')
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = document.querySelector(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  window.addEventListener('scroll', navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }


  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }


  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()


      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)


  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });




/**
 * Preloader
 */
let preloader = select('#preloader');


if (preloader) {
  window.addEventListener('load', () => {
    // Adicione uma classe ao corpo para ocultar a barra de rolagem
    document.body.classList.add('preloader-active');


    // Simule um atraso de 3 segundos antes de remover o preloader
    setTimeout(() => {
      // Remova o preloader
      preloader.remove();
      // Remova a classe do corpo para restaurar a barra de rolagem
      document.body.classList.remove('preloader-active');
    }, 550);
  });
}




  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }


  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }


  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });


      let portfolioFilters = select('#portfolio-flters li', true);


      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');


        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }


  });


  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });


  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });


  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });


  /**
   * Initiate Pure Counter
   */
  new PureCounter();


})()






/*Form*/
const isPageReloaded = sessionStorage.getItem('formSubmitted');


function handleFormSubmission(event) {
  event.preventDefault();


  const form = event.target;


  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Response from server:', data);
    if (data.ok) {
      showSentMessage();
      clearForm();


      sessionStorage.setItem('formSubmitted', 'true');


      history.replaceState({}, document.title, window.location.pathname);
     
      setTimeout(() => {
        hideSentMessage();
      }, 10000);
    } else {
      showErrorMessage("Tente novamente mais tarde.");
    }
  })
  .catch(error => {
    showErrorMessage("Tente novamente mais tarde.");
  });
}


window.addEventListener('load', function () {
  sessionStorage.removeItem('formSubmitted');
});


if (isPageReloaded) {
  window.addEventListener('beforeunload', function () {
    sessionStorage.removeItem('formSubmitted');
  });
}


function showSentMessage() {
  console.log('Showing sent message');
  document.querySelector('.loading').style.display = 'none';
  document.querySelector('.sent-message').style.display = 'block';
  document.querySelector('.error-message').style.display = 'none';
}


function hideSentMessage() {
  console.log('Hiding sent message');
  document.querySelector('.sent-message').style.display = 'none';
}


  function showErrorMessage(errorMessage) {
    console.log('Showing error message:', errorMessage);
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('.sent-message').style.display = 'none';
    document.querySelector('.error-message').innerHTML = errorMessage;
    document.querySelector('.error-message').style.display = 'block';
  }


  function clearForm() {
    setTimeout(function() {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = ""; // Corrigido o seletor para o id "message"
    }, 500);
  }




  /* certificate */
  const accordionBtns = document.querySelectorAll(".item__header");


accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("active");


    let content = this.nextElementSibling;
    console.log(content);


    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };
});



