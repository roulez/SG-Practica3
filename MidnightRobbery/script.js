/// Several functions, including the main
/**
 * @author Alexandra-Diana Dumitru 
 * @author José Manuel Pérez Carrasco
 */

/// The scene graph
scene = null;

/// The GUI information
GUIcontrols = null;

/// The object for the statistics
stats = null;

/// A boolean to know if the left button of the mouse is down
mouseDown = false;

/// The current mode of the application
applicationMode = TheScene.NO_ACTION;

//TECLAS
TECLA = {ARRIBA:false, ABAJO:false, IZQUIERDA:false, DERECHA:false, ESPACIO:false, VISTA:false, COGER:false, PERSPECTIVA:true};


/*******************************************************************************************************************************************************************/
// It creates the GUI and, optionally, adds statistic information
/**
 * @param withStats - A boolean to show the statictics or not
 */
function createGUI (withStats) {
  GUIcontrols = new function() {
    this.axis = true;
    this.lightIntensity = 0.5;
  }
  
  var gui = new dat.GUI();
  var axisLights = gui.addFolder ('Axis and Lights');
    axisLights.add(GUIcontrols, 'axis').name('Axis on/off :');
    axisLights.add(GUIcontrols, 'lightIntensity', 0, 1.0).name('Light intensity :');
    
  /*var robotControls = gui.addFolder ('Robot Controls');
    robotControls.add (GUIcontrols, 'giroCabeza', -80, 80, 1).name('Heads rotation :');
    robotControls.add (GUIcontrols, 'alturaBrazo', 4, 4.8, 0.05).name('Arms length :');
    robotControls.add (GUIcontrols, 'balanceo', -45, 30, 1).name('Bodys rotation :').listen();*/
    // The method  listen()  allows the height attribute to be written, not only read
  
  if (withStats)
    stats = initStats();
}


/*******************************************************************************************************************************************************************/
// It adds statistics information to a previously created Div
/**
 * @return The statistics object
 */
function initStats() {
  
  var stats = new Stats();
  
  stats.setMode(0); // 0: fps, 1: ms
  
  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  
  $("#Stats-output").append( stats.domElement );
  
  return stats;
}

/*******************************************************************************************************************************************************************/
// It shows a feed-back message for the user
/**
 * @param str - The message
 */
function setMessage (str) {
  document.getElementById ("Messages").innerHTML = "<h2>"+str+"</h2>";
}


/*******************************************************************************************************************************************************************/
// It processes the clic-down of the mouse
/**
 * @param event - Mouse information
 */
function onMouseDown (event) { 
  if(TECLA.PERSPECTIVA == true){
    if (event.ctrlKey) {
      // The Trackballcontrol only works if Ctrl key is pressed
      scene.getCameraControls().enabled = true;
    } else {  
      scene.getCameraControls().enabled = false;
    }
  }
  
  if (event.button === 0) {   // Left button
    mouseDown = true;
    applicationMode = TheScene.NO_ACTION;
  } else {
    applicationMode = TheScene.NO_ACTION;
  }
}


/*******************************************************************************************************************************************************************/
// It processes the drag of the mouse
/**
 * @param event - Mouse information
 */
function onMouseMove (event) {
  if (mouseDown) {
    applicationMode = TheScene.NO_ACTION;
  }
}


/*******************************************************************************************************************************************************************/
// It processes the clic-up of the mouse
/**
 * @param event - Mouse information
 */
function onMouseUp (event) {
  if (mouseDown) {
    applicationMode = TheScene.NO_ACTION;
    mouseDown = false;
  }
}


/*******************************************************************************************************************************************************************/
// It processes the wheel rolling of the mouse
/**
 * @param event - Mouse information
 */
function onMouseWheel (event) {
  if(TECLA.PERSPECTIVA == true){
    if (event.ctrlKey) {
      // The Trackballcontrol only works if Ctrl key is pressed
      scene.getCameraControls().enabled = true;
    } else {  
      scene.getCameraControls().enabled = false;
    }
  }
  if (mouseDown) {
    applicationMode = TheScene.NO_ACTION;
  }   
}



/*******************************************************************************************************************************************************************/
// It processes the keys-down 
/**
 * @param event - Mouse information
 */
function onKeyDown(event){
    switch (event.keyCode) {
      case 37: // Izquierda
        TECLA.IZQUIERDA=true;
        
        break;
      case 39: // Derecha
        TECLA.DERECHA=true;

        break;
      case 38: // Arriba
        TECLA.ARRIBA=true;

        break;
      case 40: // Abajo
        TECLA.ABAJO=true;

        break;
      case 32: //Barra espaciadora
        if(TECLA.ESPACIO==true){
          TECLA.ESPACIO=false;
        }
        else{
          TECLA.ESPACIO=true;
        }
        
        break;
      case 86: //VISTA
        if(TECLA.VISTA==false){
          TECLA.VISTA=true;
        }
        else{
          TECLA.VISTA=false;
        }

        break;
      case 69: //COGER
        TECLA.COGER=true;
      break;

      case 65: //VISTA DESDE ARRIBA
        if(TECLA.PERSPECTIVA==false){
          TECLA.PERSPECTIVA = true;
        }
        else{
          TECLA.PERSPECTIVA = false;
        }
      break;
  }
  if(TECLA.ESPACIO == false)
    scene.ThiefMove(TECLA);
}


/*******************************************************************************************************************************************************************/
// It processes the keys-up 
/**
 * @param event - Mouse information
 */
function onKeyUp(event){
  switch(event.keyCode){
    case 37: // Izquierda
      TECLA.IZQUIERDA=false;
    break;
    case 39: // Derecha
      TECLA.DERECHA=false;
    break;
    case 38: // Arriba
      TECLA.ARRIBA=false;
    break;
    case 40: // Abajo
      TECLA.ABAJO=false;
    break;
    case 69: //COGER
      TECLA.COGER=false;
    break;
  }
}


/*******************************************************************************************************************************************************************/
// It processes the window size changes
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

/*******************************************************************************************************************************************************************/
// It creates and configures the WebGL renderer
/**
 * @return The renderer
 */
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  return renderer;  
}

/*******************************************************************************************************************************************************************/
// It renders every frame
function render() {
  requestAnimationFrame(render);
  
  stats.update();

  //Solo se anima cuando el juego no esta en pausa 
  if(TECLA.ESPACIO==false){
      scene.animate(GUIcontrols);
  }
  if(TECLA.PERSPECTIVA == false){
    if(TECLA.VISTA == false){
      renderer.render(scene, scene.getCamera());
    }else{
      renderer.render(scene, scene.getCameraSubjetiva());
    }
  }
  else{
    scene.getCameraControls().update();
    renderer.render(scene, scene.getCameraDesdeArriba());
  }
}


/*******************************************************************************************************************************************************************/
// The main function
function start() {
  // create a render and set the size
  renderer = createRenderer();
  var menu = document.getElementById('menu');
  menu.style.display = 'none';

  // add the output of the renderer to the html element
  $("#WebGL-output").append(renderer.domElement);

  // liseners
  window.addEventListener ("resize", onWindowResize);
  window.addEventListener ("mousemove", onMouseMove, true);
  window.addEventListener ("mousedown", onMouseDown, true);
  window.addEventListener ("mouseup", onMouseUp, true);
  window.addEventListener ("mousewheel", onMouseWheel, true);   // For Chrome an others
  window.addEventListener ("DOMMouseScroll", onMouseWheel, true); // For Firefox
  window.addEventListener ("keydown", onKeyDown, true);
  window.addEventListener ("keyup", onKeyUp, true);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new TheScene (renderer.domElement);
 
  createGUI(true);

  render();
}

// The main function
function restart() {
  var fin = document.getElementById('fin');
  fin.style.display = 'none';

  // liseners
  window.addEventListener ("resize", onWindowResize);
  window.addEventListener ("mousemove", onMouseMove, true);
  window.addEventListener ("mousedown", onMouseDown, true);
  window.addEventListener ("mouseup", onMouseUp, true);
  window.addEventListener ("mousewheel", onMouseWheel, true);   // For Chrome an others
  window.addEventListener ("DOMMouseScroll", onMouseWheel, true); // For Firefox
  window.addEventListener ("keydown", onKeyDown, true);
  window.addEventListener ("keyup", onKeyUp, true);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new TheScene (renderer.domElement);

  render();
}

//funcion para mostrar los controles en pantalla
function mostrarControles() {
  var menu = document.getElementById('menu');
  menu.style.display = 'none';

  var controles = document.getElementById('controles');
  controles.style.display = 'inline';
}

function cerrarControles() {
  var controles = document.getElementById('controles');
  controles.style.display = 'none';

  var menu = document.getElementById('menu');
  menu.style.display = 'inline';
}
