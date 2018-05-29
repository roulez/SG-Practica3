

/// The Model Facade class. The root node of the graph.
/**
 * @author Alexandra-Diana Dumitru 
 * @author José Manuel Pérez Carrasco

 * @param renderer - The renderer to visualize the scene
 */
var model = null;

class TheScene extends THREE.Scene {
  /*******************************************************************************************************************************************************************/
  //Constructor de la escena 
  constructor (renderer) {
    super();
    
    // Attributes  
    this.ambientLight = null;
    this.spotLight = null;
    this.camera = null;
    this.cameraSubjetiva = null;
    this.cameraDesdeArriba = null;
    this.trackballControls = null;
    this.casa = null;
    this.lista = null;
    this.ground = null;

    //Agentes juego
    this.Thief = null;
    this.character1 = null;
    this.character2 = null;
    this.character3 = null;
    //this.character4 = null;

    //Variables jugador
    this.raycaster = new THREE.Raycaster();
    this.raycasterColisionDetras = new THREE.Raycaster();
    this.raycasterColisionDelante = new THREE.Raycaster();
    this.OBJS = new Array();
    this.numeroObjetosARobar = 0;
    this.mePuedoMoverDelante = true;
    this.mePuedoMoverAtras = true;
    this.gameOver = false;
    this.ganador = false;

    //Animaciónes
    this.pasos1 = 0;
    this.loop1 = false;
    this.pasos2 = 0;
    this.loop2 = false;
    this.pasos3 = 0;
    this.loop3 = false;
    this.pasos4 = 0;
    this.loop4 = false;

    //Otras variables
    this.axis = new THREE.AxisHelper (25);
    this.add (this.axis);
    
    //Creamos la escena 
    this.model = this.createModel ();
    this.createCamera (renderer);
    this.createVista (renderer);
    this.createVistaDesdeArriba(renderer);
    this.createLights ();
    this.add (this.model);
  }
  
  /*******************************************************************************************************************************************************************/
  // It creates the camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createCamera (renderer) {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    this.camera.position.set (0, 40, -15);
    this.camera.updateProjectionMatrix();
    var look = new THREE.Vector3();
    look.y = 30;
    this.camera.lookAt(look);
  
    this.Thief.add(this.camera);
  }

  /*******************************************************************************************************************************************************************/
  // It creates lights and adds them to the graph
  createLights () {
  
    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    this.add (this.ambientLight);
    
    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight( 0xffffff, 0.3);
    this.spotLight.position.set( 60, 60, 40 );
    this.spotLight.castShadow = true;
  
    // the shadow resolution
    this.spotLight.shadow.mapSize.width=2048
    this.spotLight.shadow.mapSize.height=2048;

    this.add (this.spotLight);
  }
  
  /*******************************************************************************************************************************************************************/
  // It creates the first person camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createVista(renderer){
    this.cameraSubjetiva = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.cameraSubjetiva.position.set (0, 22, 5);
    this.cameraSubjetiva.updateProjectionMatrix();
    var look = new THREE.Vector3();
    look.y = 22;
    look.z = 10;
    this.cameraSubjetiva.lookAt(look);
  
    this.Thief.add(this.cameraSubjetiva);
  }
  
  /*******************************************************************************************************************************************************************/
  // It creates the first person camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createVistaDesdeArriba(renderer){
    this.cameraDesdeArriba = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.cameraDesdeArriba.position.set (0, 300, 200);
    var look = new THREE.Vector3 (0,0,0);
    this.cameraDesdeArriba.lookAt(look);

    this.trackballControls = new THREE.TrackballControls (this.cameraDesdeArriba, renderer);
    this.trackballControls.rotateSpeed = 5;
    this.trackballControls.zoomSpeed = -2;
    this.trackballControls.panSpeed = 0.5;
    this.trackballControls.target = look;

    
    this.add(this.cameraDesdeArriba);
  }
  /*******************************************************************************************************************************************************************/
  // It creates the geometric model: Thief and ground
  /**
   * @return The model
   */
  createModel () {
    model = new THREE.Object3D();

    //Casa
    this.Thief = new Thief();
    this.Thief.scale.x = 0.7;
    this.Thief.scale.y = 0.7;
    this.Thief.scale.z = 0.7;
    this.casa = new Casa();
    model.add(this.casa);

    //Thief-Jugador
    this.Thief.moveThief(0,200);
    this.Thief.rotateThief(180);
    model.add(this.Thief);

    //Agentes enemigos
    //Niña
    this.character1 = new Character();
    this.character1.scale.x = 0.5;
    this.character1.scale.y = 0.5;
    this.character1.scale.z = 0.5;
    this.character1.Rota(90);
    this.character1.Move(45, -65);
    model.add(this.character1);

    //Niño  
    this.character2 = new Character2();
    this.character2.scale.x = 0.5;
    this.character2.scale.y = 0.5;
    this.character2.scale.z = 0.5;
    this.character2.Rota(-90);
    this.character2.Move(155,7);
    model.add(this.character2);

    //Madre
    this.character3 = new Character3();
    this.character3.scale.x = 0.5;
    this.character3.scale.y = 0.5;
    this.character3.scale.z = 0.5;
    this.character3.Rota(180);
    this.character3.Move(-155,70);
    model.add(this.character3);

    //Padre
    this.character4 = new Character4();
    this.character4.scale.x = 0.5;
    this.character4.scale.y = 0.5;
    this.character4.scale.z = 0.5;
    this.character4.Move(-35,0);
    model.add(this.character4);
	
    //Coleccion de objetos a robar
    this.lista = new Objetos();
    model.add(this.lista.obj1);
    model.add(this.lista.obj2);
    model.add(this.lista.obj3);
    model.add(this.lista.obj4);
    model.add(this.lista.obj5);
    model.add(this.lista.obj6);
    model.add(this.lista.obj7);
    
    this.OBJS.push(this.lista.obj1);  
    this.OBJS.push(this.lista.obj2);  
    this.OBJS.push(this.lista.obj3);  
    this.OBJS.push(this.lista.obj4);  
    this.OBJS.push(this.lista.obj5);  
    this.numeroObjetosARobar = this.OBJS.length;
    model.updateMatrixWorld(true);
    //
    //Suelo
    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/grass.png");
    this.ground = new Ground (500, 500, new THREE.MeshPhongMaterial ({map: textura}), 4);
    model.add (this.ground);

    return model;
  }
  
  /*******************************************************************************************************************************************************************/  
  /**
   * @controls - The GUI information
   */
  animate (controls) {
    this.axis.visible = controls.axis;
    this.spotLight.intensity = controls.lightIntensity;
    
    //Posicion del Thief
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( this.Thief.character.matrixWorld );

    /**************************************************************************************************************************************/
    //Detección del ladrón por parte del personaje
    if(this.character1.fov.containsPoint(position) || this.character1.campo.intersectsBox(this.Thief.campo)
      || this.character2.fov.containsPoint(position) || this.character2.campo.intersectsBox(this.Thief.campo)
      || this.character3.fov.containsPoint(position) || this.character3.campo.intersectsBox(this.Thief.campo)
      || this.character4.fov.containsPoint(position) || this.character4.campo.intersectsBox(this.Thief.campo)){
      this.gameOver = true;
      this.ganador = false;
    }
    if(this.numeroObjetosARobar == 0){
      this.ganador = true;
      this.gameOver = false;
    }

    if(this.gameOver == false && this.ganador == false){
      /**************************************************************************************************************************************/
      //Animación de los personajes 
      //Niña - character1
      if(this.pasos1 < 80){
        if(this.loop1 == false)
          this.character1.Move(0.7, 0);
        else
          this.character1.Move(-0.7, 0);
     
        this.pasos1++;
      }
      else{
        this.character1.Rota(180);
        this.pasos1 = 0;
        if(this.loop1 == true)
          this.loop1 = false;
        else
          this.loop1 = true;
      }

      //Niño - character2
      if(this.pasos2 < 80){
        if(this.loop2 == false)
          this.character2.Move(-0.7, 0);
        else
          this.character2.Move(0.7, 0);
     
        this.pasos2++;
      }
      else{
        this.character2.Rota(180);
        this.pasos2 = 0;
        if(this.loop2 == true)
          this.loop2 = false;
        else
          this.loop2 = true;
      }

      //Madre - character3
      if(this.pasos3 < 100){
        if(this.loop3 == false)
          this.character3.Move(0,-0.7);
        else
          this.character3.Move(0,0.7);
     
        this.pasos3++;
      }
      else{
        this.character3.Rota(180);
        this.pasos3 = 0;
        if(this.loop3 == true)
          this.loop3 = false;
        else
          this.loop3 = true;
      }

      //Padre - character4
      /*if(this.pasos4 < 120){
        if(this.loop4 == false)
          this.character4.Move(0,0.7);
        else
          this.character4.Move(0,-0.7);
     
        this.pasos4++;
      }
      else{
        this.character4.Rota(180);
        this.pasos4 = 0;
        if(this.loop4 == true)
          this.loop4 = false;
        else
          this.loop4 = true;
      }*/
    }
    else if(this.gameOver == true || this.ganador == true){
      if(this.ganador == true && this.gameOver == false)
        setMessage("Enhorabuena, ha robado todos los objetos!");
      else if(this.ganador == false && this.gameOver == true)
        setMessage("Game Over!");
    }
  }
  
  //Movimiento del ladrón 
  /**
   * @param tecla - La tecla que define el movimiento que realiza el Thief
   */  
  ThiefMove(tecla){
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( this.Thief.character.matrixWorld );

    /**************************************************************************************************************************************/
    //Raycaster para coger objetos
    if(tecla.COGER == true){
      if(tecla.VISTA == false){
        this.raycaster.set(this.camera.getWorldPosition(), this.camera.getWorldDirection());
        this.raycaster.far = 25;
      }
      else{
        this.raycaster.set(this.cameraSubjetiva.getWorldPosition(), this.cameraSubjetiva.getWorldDirection());
        this.raycaster.far = 10;
      }
      var intersectados = this.raycaster.intersectObjects(this.OBJS);
      if(intersectados.length > 0){
        for (var i = 0; i < intersectados.length; i++) {
          this.model.remove(intersectados[i].object);
          this.numeroObjetosARobar--;
        }
      }
    }

    /**************************************************************************************************************************************/
    //Raycaster para saber si choco con algo segun el giro a la derecha
    if(tecla.DERECHA == true && this.gameOver == false && this.ganador == false){
      this.Thief.rotateThief(-30);
      if(tecla.VISTA == false){
        var direccion = this.camera.getWorldDirection();
        direccion.negate();
        this.raycasterColisionDetras.set(this.camera.getWorldPosition(), direccion);
        this.raycasterColisionDetras.far = 5;
      }
      else{
        var direccion = this.cameraSubjetiva.getWorldDirection();
        direccion.negate();
        this.raycasterColisionDetras.set(this.cameraSubjetiva.getWorldPosition(), direccion);
        this.raycasterColisionDetras.far = 5;
      } 

      var intersectados = this.raycasterColisionDetras.intersectObjects(this.casa.children);
      if(intersectados.length > 0){
        this.mePuedoMoverAtras = false;
      }
      else{
        this.mePuedoMoverAtras = true;
      }

      if(tecla.VISTA == false){
        this.raycasterColisionDelante.set(this.camera.getWorldPosition(), this.camera.getWorldDirection());
        this.raycasterColisionDelante.far = 20;
      }
      else{
        this.raycasterColisionDelante.set(this.cameraSubjetiva.getWorldPosition(), this.cameraSubjetiva.getWorldDirection());
        this.raycasterColisionDelante.far = 5;
      }
        
      var intersectados = this.raycasterColisionDelante.intersectObjects(this.casa.children);
      if(intersectados.length > 0){
        this.mePuedoMoverDelante = false;
      }
      else{
        this.mePuedoMoverDelante = true;
      }        
    }

    /**************************************************************************************************************************************/
    //Raycaster para saber si choco con algo segun el giro a la derecha
    if(tecla.IZQUIERDA == true && this.gameOver == false && this.ganador == false){
      this.Thief.rotateThief(30);  
      if(tecla.VISTA == false){
        var direccion = this.camera.getWorldDirection();
        direccion.negate();
        this.raycasterColisionDetras.set(this.camera.getWorldPosition(), direccion);
        this.raycasterColisionDetras.far = 5;
      }
      else{
        var direccion = this.cameraSubjetiva.getWorldDirection();
        direccion.negate();
        this.raycasterColisionDetras.set(this.cameraSubjetiva.getWorldPosition(), direccion);
        this.raycasterColisionDetras.far = 5;
      } 

      var intersectados = this.raycasterColisionDetras.intersectObjects(this.casa.children);
      if(intersectados.length > 0){
        this.mePuedoMoverAtras = false;
      }
      else{
        this.mePuedoMoverAtras = true;
      }

      if(tecla.VISTA == false){
        this.raycasterColisionDelante.set(this.camera.getWorldPosition(), this.camera.getWorldDirection());
        this.raycasterColisionDelante.far = 20;
      }
      else{
        this.raycasterColisionDelante.set(this.cameraSubjetiva.getWorldPosition(), this.cameraSubjetiva.getWorldDirection());
        this.raycasterColisionDelante.far = 5;
      }
        
      var intersectados = this.raycasterColisionDelante.intersectObjects(this.casa.children);
      if(intersectados.length > 0){
        this.mePuedoMoverDelante = false;
      }
      else{
        this.mePuedoMoverDelante = true;
      }   
    }

    /**************************************************************************************************************************************/
    //Raycaster para saber si choco con algo cuando avanzo
    if(tecla.ARRIBA == true && this.gameOver == false && this.ganador == false && this.mePuedoMoverDelante == true){   
      /************************************************************************************************************************************/
      //Compruebo si me puedo mover
      if(tecla.VISTA == false){
        var direccion = this.camera.getWorldDirection();
        direccion.negate();
        this.raycasterColisionDetras.set(this.camera.getWorldPosition(), direccion);
        this.raycasterColisionDetras.far = 5;
      }
      else{
        var direccion = this.cameraSubjetiva.getWorldDirection();
        direccion.negate();
        this.raycasterColisionDetras.set(this.cameraSubjetiva.getWorldPosition(), direccion);
        this.raycasterColisionDetras.far = 5;
      }  
      var intersectados = this.raycasterColisionDetras.intersectObjects(this.casa.children);
      if(intersectados.length > 0){
        this.mePuedoMoverAtras = false;
      }
      else{
        this.mePuedoMoverAtras = true;
      } 

      if(tecla.VISTA == false){
        this.raycasterColisionDelante.set(this.camera.getWorldPosition(), this.camera.getWorldDirection());
        this.raycasterColisionDelante.far = 20;
      }
      else{
        this.raycasterColisionDelante.set(this.cameraSubjetiva.getWorldPosition(), this.cameraSubjetiva.getWorldDirection());
        this.raycasterColisionDelante.far = 5;
      }
        
      var intersectados = this.raycasterColisionDelante.intersectObjects(this.casa.children);
      if(intersectados.length > 0){
        this.mePuedoMoverDelante = false;
      }
      else{
        this.mePuedoMoverDelante = true;
      } 

      /************************************************************************************************************************************/
      //Avanzo
      if((this.Thief.mira) > 270 && (this.Thief.mira) < 360){
        this.Thief.moveThief(position.x + 1, position.z + 1);
      }
      else if((this.Thief.mira) > 0 && (this.Thief.mira) < 90){
        this.Thief.moveThief(position.x + 1, position.z - 1);
      }
      else if((this.Thief.mira) > 90 && (this.Thief.mira) < 180){
        this.Thief.moveThief(position.x - 1, position.z - 1);
      }
      else if((this.Thief.mira) > 180 && (this.Thief.mira) < 270){
        this.Thief.moveThief(position.x - 1, position.z + 1);
      }
      else if((this.Thief.mira) == 0){
        this.Thief.moveThief(position.x + 1, position.z);
      }
      else if((this.Thief.mira) == 90){
        this.Thief.moveThief(position.x, position.z - 1);
      }
      else if((this.Thief.mira) == 180){
        this.Thief.moveThief(position.x - 1, position.z);
      }
      else if((this.Thief.mira) == 270){
        this.Thief.moveThief(position.x, position.z + 1);
      }
    }

    /**************************************************************************************************************************************/
    //Raycaster para saber si choco con algo cuando retrocedo
    if(tecla.ABAJO == true && this.gameOver == false && this.ganador == false && this.mePuedoMoverAtras == true){  
      /************************************************************************************************************************************/
      //Compruebo si me puedo mover
      if(tecla.VISTA == false){
        this.raycasterColisionDelante.set(this.camera.getWorldPosition(), this.camera.getWorldDirection());
        this.raycasterColisionDelante.far = 20;
      }
      else{
        this.raycasterColisionDelante.set(this.cameraSubjetiva.getWorldPosition(), this.cameraSubjetiva.getWorldDirection());
        this.raycasterColisionDelante.far = 5;
      }
        
      var intersectados = this.raycasterColisionDelante.intersectObjects(this.casa.children);
      if(intersectados.length > 0){
        this.mePuedoMoverDelante = false;
      }
      else{
        this.mePuedoMoverDelante = true;
      }

      if(tecla.VISTA == false){
        var direccion = this.camera.getWorldDirection();
        direccion.negate();
        this.raycasterColisionDetras.set(this.camera.getWorldPosition(), direccion);
        this.raycasterColisionDetras.far = 5;
      }
      else{
        var direccion = this.cameraSubjetiva.getWorldDirection();
        direccion.negate();
        this.raycasterColisionDetras.set(this.cameraSubjetiva.getWorldPosition(), direccion);
        this.raycasterColisionDetras.far = 5;
      }  
      var intersectados = this.raycasterColisionDetras.intersectObjects(this.casa.children);
      if(intersectados.length > 0){
        this.mePuedoMoverAtras = false;
      }
      else{
        this.mePuedoMoverAtras = true;
      }  
      
      /************************************************************************************************************************************/
      //Retrocedo
      if((this.Thief.mira) > 270 && (this.Thief.mira) < 360){
        this.Thief.moveThief(position.x - 1, position.z - 1);
      }
      else if((this.Thief.mira) > 0 && (this.Thief.mira) < 90){
        this.Thief.moveThief(position.x - 1, position.z + 1);
      }
      else if((this.Thief.mira) > 90 && (this.Thief.mira) < 180){
        this.Thief.moveThief(position.x + 1, position.z + 1);
      }
      else if((this.Thief.mira) > 180 && (this.Thief.mira) < 270){
        this.Thief.moveThief(position.x + 1, position.z - 1);
      }
      else if((this.Thief.mira) == 0){
        this.Thief.setPosicionEntera(position.x - 1, position.z);
      }
      else if((this.Thief.mira) == 90){
        this.Thief.moveThief(position.x, position.z + 1);
      }
      else if((this.Thief.mira) == 180){
        this.Thief.moveThief(position.x + 1, position.z);
      }
      else if((this.Thief.mira) == 270){
        this.Thief.moveThief(position.x, position.z - 1);
      }
    }
  }

  /*******************************************************************************************************************************************************************/
  /**
   * @return la camara perspectiva
   */  
  getCamera () {
    return this.camera;
  }

  /*******************************************************************************************************************************************************************/
  /**
   * @return los controles de la camara perspectiva
   */  
  getCameraSubjetiva () {
    return this.cameraSubjetiva;
  }

  
  /*******************************************************************************************************************************************************************/
  /**
   * @return los controles de la camara desde arriba
   */  
  getCameraDesdeArriba () {
    return this.cameraDesdeArriba;
  }

  /*******************************************************************************************************************************************************************/
  /**
   * @return los controles de la camara perspectiva
   */  
  getCameraControls () {
    return this.trackballControls;
  }

  /*******************************************************************************************************************************************************************/
  //Establece el aspecto de ambas camaras   
  setCameraAspect (anAspectRatio) {
    this.camera.aspect = anAspectRatio;
    this.camera.updateProjectionMatrix();

    this.cameraSubjetiva.aspect = anAspectRatio;
    this.cameraSubjetiva.updateProjectionMatrix();

    this.cameraDesdeArriba.aspect = anAspectRatio;
    this.cameraDesdeArriba.updateProjectionMatrix();
  }  
}
  // Application modes
  TheScene.NO_ACTION = 0;
  

