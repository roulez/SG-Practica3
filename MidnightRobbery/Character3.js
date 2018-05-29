
/// The Robot class
/**
 * @author Alexandra-Diana Dumitru 
 * @author José Manuel Pérez Carrasco
 */



class Character3 extends THREE.Object3D {
  
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
    
    var loaderDress = new THREE.TextureLoader();
    var texturaDress = loaderDress.load("imgs/flores.jpg");
    this.materialDress = new THREE.MeshPhongMaterial({map: texturaDress}); 
  
    //Campo de detección
    this.character = this.createCharacter();

    var geometry = new THREE.ConeGeometry( 20, 20, 2 );
    var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    this.cone = new THREE.Mesh( geometry, material );
    this.cone.rotation.y = 90*Math.PI/180;
    this.cone.rotation.x = 90*Math.PI/180;
    this.cone.position.z += -10;
    
    this.fov = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    
    this.campo =  new THREE.Sphere(this.character.position, 20);
  
    this.conoRotado = new THREE.Mesh();
    this.conoRotado.add(this.cone);
    this.conoRotado.rotation.y += 180*Math.PI/180;
    this.fov.setFromObject(this.conoRotado);
    this.add(this.conoRotado);
    
    this.add(this.character);
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
    var hair = new THREE.Mesh();
        
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

    ObjLoader.setPath('recursos/hair/');
    ObjLoader.load('PeachHair.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 140;
        object.scale.z = 100;
        object.scale.y = 100;
        object.position.y = -56;
        object.position.z = 0.5;
        hair.add(object);
    });    
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
    this.cabeza.position.y = 13;
    
    /**********************************************************************************/
    //Vestido
    var troncoGeo = new THREE.CylinderGeometry(2,5,14,50);
    troncoGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,7,0));

    var troncoMesh = new THREE.Mesh(troncoGeo, this.materialDress);
    
    /**********************************************************************************/
    //Brazos
    this.rightArm = this.createRightArm(this.anguloXRightArm,this.anguloZRightArm);
    this.rightArm.position.x = -2;
    this.rightArm.position.y = 13;

    this.leftArm = this.createLeftArm(this.anguloXLeftArm, this.anguloZLeftArm);
    this.leftArm.position.x = 2;
    this.leftArm.position.y = 13;

    var tronco = new THREE.Mesh();
    tronco.add(troncoMesh);
    tronco.add(this.cabeza);
    tronco.add(this.rightArm);
    tronco.add(this.leftArm);    
    return tronco;
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

    var armGeo = new THREE.CylinderGeometry( 1, 2, 10, 50);
    armGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,-5,0));
    var armMesh = new THREE.Mesh(armGeo, this.materialDress);

    /**********************************************************************************/
    //Mano
    var hand = this.createHand();
    hand.position.y = -10;
    armMesh.add(hand)
    
    var arm = new THREE.Mesh(shoulderGeo, this.materialDress);
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
    var armGeo = new THREE.CylinderGeometry( 1, 2, 10, 50);
    armGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,-5,0));
    var armMesh = new THREE.Mesh(armGeo, this.materialDress);

    /**********************************************************************************/
    //Mano
    var hand = this.createHand();
    hand.position.y = -10;
    hand.rotation.y = Math.PI;
    armMesh.add(hand)
    
    var arm = new THREE.Mesh(shoulderGeo, this.materialDress);
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
    var legGeo = new THREE.CylinderGeometry( 1, 1, 10, 50);
    legGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,-5,0));
    var legMesh = new THREE.Mesh(legGeo, this.materialPiel);

    //Pie        
    var pieGeo = new THREE.SphereGeometry(1, 20, 50);
    pieGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,-10,0));   
    var pieMesh = new THREE.Mesh(pieGeo, this.materialPiel);
    
    //texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
    
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/cuero.jpg", function(image) {
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
    var legGeo = new THREE.CylinderGeometry( 1, 1, 10, 50);
    legGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,-5,0));
    var legMesh = new THREE.Mesh(legGeo, this.materialPiel);

    //Pie        
    var pieGeo = new THREE.SphereGeometry(1, 20, 50);
    pieGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0,-10,0));   
    var pieMesh = new THREE.Mesh(pieGeo, this.materialPiel);
    
    //texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
    
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/cuero.jpg", function(image) {
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
    this.character.position.y = 4;
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

    Rota(angulo){
        this.angu_ro = angulo*Math.PI/180;
        this.character.rotation.y += this.angu_ro;
        this.conoRotado.rotation.y += this.angu_ro;
        this.fov.setFromObject(this.conoRotado);
    }

    Move(x,z){
        this.character.position.x += x;
        this.conoRotado.position.x += x;
        this.character.position.z += z;
        this.conoRotado.position.z += z;

        this.campo.center = this.character.position;
        this.fov.setFromObject(this.conoRotado);        
    }  

}

// class variables
Character.WORLD = 0;
Character.LOCAL = 1;
