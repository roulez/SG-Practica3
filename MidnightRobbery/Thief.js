
/// The Robot class
/**
 * @author Alexandra-Diana Dumitru 
 * @author José Manuel Pérez Carrasco
 */



class Thief extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    //Componentes del personaje
    this.cabeza = null;
    this.rightArm = null;
    this.leftArm = null;
    this.rightLeg = null;
    this.leftLeg = null;
    this.tronco = null;
    this.character = null;
    this.mira = 270;

    //Angulos para los grados de libertad del personaje
    this.anguloCabeza = 0;
    this.anguloXRightArm = 0;
    this.anguloZRightArm = -35;
    this.anguloXLeftArm = 0;
    this.anguloZLeftArm = 35;
    this.anguloXRightLeg = 0;
    this.anguloZRightLeg = 0;
    this.anguloXLeftLeg = 0;
    this.anguloZLeftLeg = 0;
    
    //Texturas
    var loaderPiel = new THREE.TextureLoader();
    var texturaPiel = loaderPiel.load("imgs/piel.png");
    this.materialPiel = new THREE.MeshPhongMaterial({map: texturaPiel});

    var loaderSuelo = new THREE.TextureLoader();
    var texturaSuelo = loaderSuelo.load("imgs/suelo.jpg");
    this.materialSuelo = new THREE.MeshPhongMaterial({map: texturaSuelo});

    var loaderTraje = new THREE.TextureLoader();
    var texturaTraje = loaderTraje.load("imgs/pantalonesTraje.jpg");
    this.materialTraje = new THREE.MeshPhongMaterial({map: texturaTraje});
    
    var loaderTshirt = new THREE.TextureLoader();
    var texturaTshirt = loaderTshirt.load("imgs/pantalonesTraje.jpg");
    this.materialTshirt = new THREE.MeshPhongMaterial({map: texturaTshirt});
    
    var loaderVaqueros = new THREE.TextureLoader();
    var texturaVaqueros = loaderVaqueros.load("imgs/camuflaje.jpg");
    this.materialVaqueros = new THREE.MeshPhongMaterial({map: texturaVaqueros});
    
    this.character = this.createCharacter();

    this.campo = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    
    this.add(this.character);
    this.campo.setFromObject(this);
  }

  createCabeza(){
    /**********************************************************************************/
    //OJOS
    var ojoI = new THREE.SphereGeometry(0.8, 20, 50);
    var ojoD = new THREE.SphereGeometry(0.8, 20, 50);
    
    ojoI.applyMatrix(new THREE.Matrix4().makeTranslation(-2.5,1+3+3,4));
    ojoD.applyMatrix(new THREE.Matrix4().makeTranslation(2.5,1+3+3,4));

    var ojoIBSP = new ThreeBSP(ojoI);
    var ojoDBSP = new ThreeBSP(ojoD);

    var ojos = ojoIBSP.union(ojoDBSP);
   
    var loaderOjos = new THREE.TextureLoader();
    var texturaOjos = loaderOjos.load("imgs/eyes.jpg");
    var materialOjos = new THREE.MeshPhongMaterial({map: texturaOjos}); 

    var ojosMesh = new THREE.Mesh(ojos.toGeometry(), materialOjos);

    /**********************************************************************************/
    //Cuello
    var cuelloGeo = new THREE.CylinderGeometry(0.7, 0.7, 3, 50);
    cuelloGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));
 
    var cuelloMesh = new THREE.Mesh(cuelloGeo, this.materialPiel);
 
    /**********************************************************************************/
    //Pelo
    var hair = this.createHair();   
    hair.scale.x = 0.8;
    hair.scale.y = 0.8;
    hair.scale.z = 0.7;
    hair.position.x = 1;
    hair.position.y = -11;
    hair.position.z = -1;
    /**********************************************************************************/
    //Nariz
    var narizGeo = new THREE.ConeGeometry(0.4, 1, 50);
    narizGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,5.5,4.5));

    var narizMesh = new THREE.Mesh(narizGeo, this.materialPiel);

    /**********************************************************************************/
    //Cabeza
    var cabezaGeo = new THREE.SphereGeometry(5, 20, 50);
    cabezaGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,7.5,0));

    this.cabeza = new THREE.Mesh(cabezaGeo, this.materialPiel);
    this.cabeza.rotation.y = this.anguloCabeza;
    this.cabeza.add(cuelloMesh);
    this.cabeza.add(ojosMesh);
    this.cabeza.add(hair);
    this.cabeza.add(narizMesh);
    
    return this.cabeza;

  }

  createTronco(){
    /**********************************************************************************/
    //Cabeza
    this.cabeza = this.createCabeza();
    this.cabeza.position.y = 6.5;
    
    /**********************************************************************************/
    //Vestido
    var troncoGeo = new THREE.CylinderGeometry(2,4,8,50);
    troncoGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,4,0));

    var troncoMesh = new THREE.Mesh(troncoGeo, this.materialTraje);
    troncoMesh.rotation.y = Math.PI;
    
    /**********************************************************************************/
    //Brazos
    this.rightArm = this.createRightArm(this.anguloXRightArm,this.anguloZRightArm);
    this.rightArm.position.x = -1.5;
    this.rightArm.position.y = 7;

    this.leftArm = this.createLeftArm(this.anguloXLeftArm, this.anguloZLeftArm);
    this.leftArm.position.x = 1.5;
    this.leftArm.position.y = 7;

    this.tronco = new THREE.Mesh();
    
    this.tronco.add(troncoMesh);
    this.tronco.add(this.cabeza);
    this.tronco.add(this.rightArm);
    this.tronco.add(this.leftArm);    
    return this.tronco;
  }

  createHand(){
    var hand = new THREE.Mesh();
    
    // texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
    
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/piel.png", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    });
    
    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/hand/');
    ObjLoader.load('hand.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.15;
        object.scale.z = 0.15;
        object.scale.y = 0.15;
        object.position.x = 1.5;
        object.position.y = 0.5;
        object.position.z = 0.5;
        object.rotation.x = 90*Math.PI/180;
        hand.add(object);
    });

    return hand;  
  }

  createRightArm(anguloX, anguloZ){
    /**********************************************************************************/
    //Hombro        
    var shoulderGeo = new THREE.SphereGeometry(1, 20, 50);   

    /**********************************************************************************/
    //Brazo

    var armGeo = new THREE.CylinderGeometry( 1, 1.2, 10, 50);
    armGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,-5,0));
    var armMesh = new THREE.Mesh(armGeo, this.materialTshirt);

    /**********************************************************************************/
    //Mano
    var hand = this.createHand();
    hand.position.y = -10;
    armMesh.add(hand)
    
    var arm = new THREE.Mesh(shoulderGeo, this.materialTshirt);
    arm.add(armMesh);
    arm.rotation.z = anguloZ*Math.PI/180;
    arm.rotation.x = anguloX*Math.PI/180;
    arm.position.y = 20;
    
    return arm;

  }
  createLeftArm(anguloX, anguloZ){
    /**********************************************************************************/
    //Hombro        
    var shoulderGeo = new THREE.SphereGeometry(1, 20, 50);   

    /**********************************************************************************/
    //Brazo 

    var armGeo = new THREE.CylinderGeometry( 1, 1.2, 10, 50);
    armGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,-5,0));
    var armMesh = new THREE.Mesh(armGeo, this.materialTshirt);

    /**********************************************************************************/
    //Mano
    var hand = this.createHand();
    hand.position.y = -10;
    hand.rotation.y = Math.PI;
    armMesh.add(hand)
    
    var arm = new THREE.Mesh(shoulderGeo, this.materialTshirt);
    arm.add(armMesh);
    arm.rotation.z = anguloZ*Math.PI/180;
    arm.rotation.x = anguloX*Math.PI/180;
    arm.position.y = 20;
    
    return arm;
  }

  createRightLeg(anguloX, anguloZ){
    //Base        
    var baseGeo = new THREE.SphereGeometry(1, 20, 50);   
    var baseMesh = new THREE.Mesh(baseGeo, this.materialPiel);
    /**********************************************************************************/
    //Pierna
    var legGeo = new THREE.CylinderGeometry( 1.2, 1.5, 10, 50);
    legGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,-5,0));
    var legMesh = new THREE.Mesh(legGeo, this.materialVaqueros);

    //Pie        
    var pieGeo = new THREE.SphereGeometry(1, 20, 50);
    pieGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,-10,0));   
    var pieMesh = new THREE.Mesh(pieGeo, this.materialVaqueros);
    
    //texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
    
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/eyes.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    });
    
    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/shoes/');
    ObjLoader.load('rightshoe.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.2;
        object.scale.z = 0.2;
        object.scale.y = 0.2;
        object.position.x = 9;
        object.position.y = -12;
        object.position.z = 2.5;
        legMesh.add(object);
    });
    
    legMesh.rotation.x = anguloX*Math.PI/180;
    legMesh.rotation.z = anguloZ*Math.PI/180;
    legMesh.position.y = 12;
    legMesh.add(baseMesh);
    legMesh.add(pieMesh);
    
    return legMesh;
  }

  createLeftLeg(anguloX, anguloZ){
    //Base        
    var baseGeo = new THREE.SphereGeometry(1, 20, 50);   
    var baseMesh = new THREE.Mesh(baseGeo, this.materialPiel);
    /**********************************************************************************/
    //Pierna
    var legGeo = new THREE.CylinderGeometry( 1.2, 1.5, 10, 50);
    legGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,-5,0));
    var legMesh = new THREE.Mesh(legGeo, this.materialVaqueros);

    //Pie        
    var pieGeo = new THREE.SphereGeometry(1, 20, 50);
    pieGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,-10,0));   
    var pieMesh = new THREE.Mesh(pieGeo, this.materialVaqueros);
    
    //texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
    
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/eyes.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    });
    
    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/shoes/');
    ObjLoader.load('leftshoe.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.2;
        object.scale.z = 0.2;
        object.scale.y = 0.2;
        object.position.x = -5;
        object.position.y = -12;
        object.position.z = 1.5;
        legMesh.add(object);
    });
    
    legMesh.rotation.x = anguloX*Math.PI/180;
    legMesh.rotation.z = anguloZ*Math.PI/180;
    legMesh.position.y = 12;
    legMesh.add(baseMesh);
    legMesh.add(pieMesh);
    
    return legMesh;
  }

  createCharacter(){
    this.character = new THREE.Mesh();

    this.tronco = this.createTronco();
    this.tronco.position.y = 10;

    this.leftLeg = this.createLeftLeg(this.anguloXLeftLeg, this.anguloZLeftLeg);
    this.leftLeg.position.x = 2;

    this.rightLeg = this.createRightLeg(this.anguloXRightLeg, this.anguloZRightLeg);
    this.rightLeg.position.x = -2;

    this.character.add(this.tronco);
    this.character.add(this.leftLeg);
    this.character.add(this.rightLeg);

    return this.character;
  }

  setAnguloCabeza(angulo){
    this.anguloCabeza = angulo * Math.PI/180;
    this.cabeza.rotation.y = this.anguloCabeza;
  }
  setAngulosRightArm(anguloX, anguloZ){
    this.anguloXRightArm = anguloX * Math.PI/180;
    this.anguloZRightArm = anguloZ * Math.PI/180;

    this.rightArm.rotation.x = this.anguloXRightArm;
    this.rightArm.rotation.z = this.anguloZRightArm;
  }
  setAngulosLeftArm(anguloX, anguloZ){
    this.anguloXLeftArm = anguloX * Math.PI/180;
    this.anguloZLeftArm = anguloZ * Math.PI/180;

    this.leftArm.rotation.x = this.anguloXLeftArm;
    this.leftArm.rotation.z = this.anguloZLeftArm;
  }
  setAngulosRightLeg(anguloX, anguloZ){
    this.anguloXRightLeg = anguloX * Math.PI/180;
    this.anguloZRightLeg = anguloZ * Math.PI/180;

    this.rightLeg.rotation.x = this.anguloXRightLeg;
    this.rightLeg.rotation.z = this.anguloZRightLeg;
  }
  setAngulosLeftLeg(anguloX, anguloZ){
    this.anguloXLeftLeg = anguloX * Math.PI/180;
    this.anguloZLeftLeg = anguloZ * Math.PI/180;

    this.leftLeg.rotation.x = this.anguloXLeftLeg;
    this.leftLeg.rotation.z = this.anguloZLeftLeg;
  }

  createHair(){
    var hair = new THREE.Mesh(); 

    //texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
    
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/red.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    });
    
    var ObjLoader1 = new THREE.OBJLoader(); 
    ObjLoader1.setPath('recursos/hair/');
    ObjLoader1.load('hair2.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 72 ;
        object.scale.z = 65;
        object.scale.y = 55;
        object.position.x = -0.5;
        object.position.y = -72;
        object.position.z = 2;
        hair.add(object);
    });
    
    //texture
    var manager2 = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
    
    var texture2 = new THREE.Texture();
    var loader2 = new THREE.ImageLoader(manager2);
    loader2.load("imgs/eyes.jpg", function(image) {
        texture2.image = image;
        texture2.needsUpdate = true;
    });
    
    var ObjLoader2 = new THREE.OBJLoader(); 
    ObjLoader2.setPath('recursos/');
    ObjLoader2.load('Cap.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture2;
        });
        object.scale.x = 0.04;
        object.scale.z = 0.045;
        object.scale.y = 0.05;
        object.position.x = -1;
        object.position.y = 23.5;
        object.position.z = 10;

        hair.add(object);
    });
      
    return hair;
  }

  moveThief(x,z){
    this.position.x = x;
    this.position.z = z;
    this.campo.setFromObject(this);
  }
  rotateThief(alfa){
    this.rotation.y += alfa*Math.PI/180;

    this.mira += alfa;
    if(this.mira < 0){
      this.mira+=360;
    }

    this.mira = this.mira % 360;
  }

  setAnguloAbsolutoThief(alfa){
    this.rotation.y = alfa*Math.PI/180;

    this.mira += alfa;
    if(this.mira < 0){
      this.mira+=360;
    }

    this.mira = this.mira % 360;
  }

}

// class variables
Character.WORLD = 0;
Character.LOCAL = 1;
