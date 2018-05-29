
/// The Robot class
/**
 * @author Alexandra-Diana Dumitru 
 * @author José Manuel Pérez Carrasco
 */



class Casa extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    this.casa = null;
    this.suelo = null;
    this.puertaPrincipal = null;
    this.puertas = new Array();
    this.paredesPlanta1 = null;
    this.paredesPlanta2 = null;
    this.vallasPlanta1 = null;
    this.vallasPlanta2 = null;
    this.mueblesPlanta1 = null;

    /***************************************************************************/
    //TEXTURAS
    var loaderSuelo = new THREE.TextureLoader();
    var texturaSuelo = loaderSuelo.load("imgs/suelo.jpg");
    this.materialSuelo = new THREE.MeshPhongMaterial({map: texturaSuelo});

    var loaderValla = new THREE.TextureLoader();
    var texturaValla = loaderValla.load("imgs/suelo4.jpg");
    this.materialValla = new THREE.MeshPhongMaterial({map: texturaValla});

    var loaderTejado = new THREE.TextureLoader();
    var texturaTejado = loaderTejado.load("imgs/tejado.jpg");
    this.materialTejado = new THREE.MeshPhongMaterial({map: texturaTejado});

    var loaderPared = new THREE.TextureLoader();
    var texturaPared = loaderPared.load("imgs/pared.jpg");
    this.materialPared = new THREE.MeshPhongMaterial({map: texturaPared});
    
    var loaderMarco = new THREE.TextureLoader();
    var texturaMarco = loaderMarco.load("imgs/puerta2.jpg");
    this.materialMarco = new THREE.MeshPhongMaterial({map: texturaMarco});

    var loaderPuerta = new THREE.TextureLoader();
    var texturaPuerta = loaderPuerta.load("imgs/puerta.jpg");
    this.materialPuerta = new THREE.MeshPhongMaterial({map: texturaPuerta});
    
    /***************************************************************************/
    this.casa = this.createCasa();   
    this.add(this.casa);
  }

  /************************************************************************************************************************************************/
  /************************************************************************************************************************************************/
  //ARQUITECTURA

  createSuelo(){
    //Creación de las geometrias
    var baseG = new THREE.BoxGeometry( 200, 2, 150);
    var aux1 = new THREE.BoxGeometry(35,2,25);
    var aux2 = new THREE.BoxGeometry(35,2,25);
    var aux3 = new THREE.BoxGeometry(35,2,25);
    
    //Transformaciones sobre las geometrias
    aux1.applyMatrix (new THREE.Matrix4().makeTranslation (82.5, 0, -62.5));
    aux2.applyMatrix (new THREE.Matrix4().makeTranslation (-82.5, 0, 62.5));
    aux3.applyMatrix (new THREE.Matrix4().makeTranslation (82.5, 0, 62.5));
  
    //Creación de las versiones BSP    
    var baseBSP = new ThreeBSP(baseG);
    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);
    var aux3BSP = new ThreeBSP(aux3);
    
    var resultParcial1 = aux1BSP.union(aux2BSP);
    var resultParcial2 = resultParcial1.union(aux3BSP);
    var result = baseBSP.subtract(resultParcial2);

    var resultado = result.toGeometry();
    resultado.applyMatrix (new THREE.Matrix4().makeTranslation(0,1,0));

    var suelo =  new THREE.Mesh(resultado, this.materialSuelo);
    suelo.geometry.computeVertexNormals();
    suelo.geometry.computeFaceNormals();

    return suelo; 
  }

  createParedesPlanta1(){
    var pared1 = new THREE.BoxGeometry(80, 60, 2);
    pared1.applyMatrix(new THREE.Matrix4().makeTranslation(-100+35+40, 30, 74));
    var auxP1 = new THREE.BoxGeometry(16,28,2);
    auxP1.applyMatrix(new THREE.Matrix4().makeTranslation(-100+35+40+16/2, 14, 74));
    var auxV1_1 = new THREE.BoxGeometry(14, 20, 2);
    var auxV1_2 = new THREE.BoxGeometry(14, 20, 2);
    auxV1_1.applyMatrix(new THREE.Matrix4().makeTranslation(1, 25, 74));
    auxV1_2.applyMatrix(new THREE.Matrix4().makeTranslation(-100+35+35/2, 25, 74));
    
    var pared2 = new THREE.BoxGeometry(50, 60, 2);
    pared2.applyMatrix(new THREE.Matrix4().makeTranslation((200/2)-35-(50/2), 30, -74));
    var auxV2 = new THREE.BoxGeometry(14, 20, 2);
    auxV2.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-35/2-14/2, 25, -74));
    
    var pared3 = new THREE.BoxGeometry(2, 60, 100);
    pared3.applyMatrix(new THREE.Matrix4().makeTranslation(-100+1, 30, 0));
    var auxV3_1 = new THREE.BoxGeometry(2, 20, 14);
    var auxV3_2 = new THREE.BoxGeometry(2, 20, 14);
    auxV3_1.applyMatrix(new THREE.Matrix4().makeTranslation(-100+1, 25, -20));
    auxV3_2.applyMatrix(new THREE.Matrix4().makeTranslation(-100+1, 25, 20));
    
    var pared4 = new THREE.BoxGeometry(115, 60, 2);
    pared4.applyMatrix(new THREE.Matrix4().makeTranslation(-100+(115/2), 30, -76+25));
    var auxP4_1 = new THREE.BoxGeometry(16,28,2);
    var auxP4_2 = new THREE.BoxGeometry(16,28,2);
    auxP4_1.applyMatrix(new THREE.Matrix4().makeTranslation(1, 14, -76+25));
    auxP4_2.applyMatrix(new THREE.Matrix4().makeTranslation(-100+35/2 +16/2, 14, -76+25));
    var auxV4_1 = new THREE.BoxGeometry(14, 20, 2);
    var auxV4_2 = new THREE.BoxGeometry(14, 20, 2);
    auxV4_1.applyMatrix(new THREE.Matrix4().makeTranslation(-100+35+16/3+7, 25, -76+25));
    auxV4_2.applyMatrix(new THREE.Matrix4().makeTranslation(-100+35+40+4, 25, -76+25));
    
    var pared5 = new THREE.BoxGeometry(2, 60, 125);
    pared5.applyMatrix(new THREE.Matrix4().makeTranslation(-100+60+1, 30, 25/2));
    var auxP5 = new THREE.BoxGeometry(2,28,16);
    auxP5.applyMatrix(new THREE.Matrix4().makeTranslation(-100+60+1, 14, 25/2-16/2));
    
    var pared6 = new THREE.BoxGeometry(35, 60, 2);
    pared6.applyMatrix(new THREE.Matrix4().makeTranslation(-100+(35/2), 30, (150/2)-25-1));
    
    var pared7 = new THREE.BoxGeometry(25, 60, 2);
    pared7.applyMatrix(new THREE.Matrix4().makeTranslation(-100+35+(25/2), 30, (150/2)-50-1));

    var pared8 = new THREE.BoxGeometry(2, 60, 50);
    pared8.applyMatrix(new THREE.Matrix4().makeTranslation(-100+35+1, 30, (150/2)-(50/2)));
    var auxP8 = new THREE.BoxGeometry(2,28,16);
    auxP8.applyMatrix(new THREE.Matrix4().makeTranslation(-100+35+1, 14, 150/2-50/2-16/2-5));

    var pared9 = new THREE.BoxGeometry(2, 60, 150);
    pared9.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-50-0.5, 30, 0));
    var auxP9_1 = new THREE.BoxGeometry(2,28,16);
    var auxP9_2 = new THREE.BoxGeometry(2,28,16);
    auxP9_1.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-50-0.5, 14, 10));
    auxP9_2.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-50-0.5, 14, -75+25+10+16/2));

    var pared10 = new THREE.BoxGeometry(2, 60, 60);
    pared10.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-1, 30, -75+60/2));

    var pared11 = new THREE.BoxGeometry(2, 60, 100);
    pared11.applyMatrix(new THREE.Matrix4().makeTranslation(100-1, 30, 0));
    var auxV11 = new THREE.BoxGeometry(2, 20, 14);
    auxV11.applyMatrix(new THREE.Matrix4().makeTranslation(100-1, 25, 20));

    var pared12 = new THREE.BoxGeometry(35, 60, 2);
    pared12.applyMatrix(new THREE.Matrix4().makeTranslation(100-35/2, 30, -75+25+1));
    var auxV12 = new THREE.BoxGeometry(14, 20, 2);
    auxV12.applyMatrix(new THREE.Matrix4().makeTranslation(100-35/2, 25, -75+25+1));

    var pared13 = new THREE.BoxGeometry(35+50, 60, 2);
    pared13.applyMatrix(new THREE.Matrix4().makeTranslation(100-85/2, 30, -75+60+1));
    var auxP13 = new THREE.BoxGeometry(16,28,2);
    auxP13.applyMatrix(new THREE.Matrix4().makeTranslation(100-35/3-16/2, 14, -75+60+1));
    
    
    var pared14 = new THREE.BoxGeometry(35+50, 60, 2);
    pared14.applyMatrix(new THREE.Matrix4().makeTranslation(100-85/2, 30, 75-25-1));
    var auxP14 = new THREE.BoxGeometry(16,28,2);
    auxP14.applyMatrix(new THREE.Matrix4().makeTranslation(100-85/2-16/2, 14, 75-25-1));
    var auxV14 = new THREE.BoxGeometry(14, 20, 2);
    auxV14.applyMatrix(new THREE.Matrix4().makeTranslation(100-35/2, 25, 75-25-1));

    var pared1BSP = new ThreeBSP(pared1);
    var auxP1BSP = new ThreeBSP(auxP1);
    var auxV1_1BSP = new ThreeBSP(auxV1_1);
    var auxV1_2BSP = new ThreeBSP(auxV1_2);

    var pared2BSP = new ThreeBSP(pared2);
    var auxV2BSP = new ThreeBSP(auxV2);

    var pared3BSP = new ThreeBSP(pared3);
    var auxV3_1BSP = new ThreeBSP(auxV3_1);
    var auxV3_2BSP = new ThreeBSP(auxV3_2);

    var pared4BSP = new ThreeBSP(pared4);
    var auxP4_1BSP = new ThreeBSP(auxP4_1);
    var auxP4_2BSP = new ThreeBSP(auxP4_2);
    var auxV4_1BSP = new ThreeBSP(auxV4_1);
    var auxV4_2BSP = new ThreeBSP(auxV4_2);

    var pared5BSP = new ThreeBSP(pared5);
    var auxP5BSP = new ThreeBSP(auxP5);

    var pared6BSP = new ThreeBSP(pared6);
    var pared7BSP = new ThreeBSP(pared7);

    var pared8BSP = new ThreeBSP(pared8);
    var auxP8BSP = new ThreeBSP(auxP8);

    var pared9BSP = new ThreeBSP(pared9);
    var auxP9_1BSP = new ThreeBSP(auxP9_1);
    var auxP9_2BSP = new ThreeBSP(auxP9_2);

    var pared10BSP = new ThreeBSP(pared10);
    
    var pared11BSP = new ThreeBSP(pared11);
    var auxV11BSP = new ThreeBSP(auxV11);
    
    var pared12BSP = new ThreeBSP(pared12);
    var auxV12BSP = new ThreeBSP(auxV12);
    
    var pared13BSP = new ThreeBSP(pared13);
    var auxP13BSP = new ThreeBSP(auxP13);
    
    var pared14BSP = new ThreeBSP(pared14);
    var auxP14BSP = new ThreeBSP(auxP14);
    var auxV14BSP = new ThreeBSP(auxV14);
    
    pared1BSP = pared1BSP.subtract(auxP1BSP);
    pared1BSP = pared1BSP.subtract(auxV1_1BSP);
    pared1BSP = pared1BSP.subtract(auxV1_2BSP);
    pared2BSP = pared2BSP.subtract(auxV2BSP);
    var resultParcial1 = pared1BSP.union(pared2BSP);

    pared3BSP = pared3BSP.subtract(auxV3_1BSP);
    pared3BSP = pared3BSP.subtract(auxV3_2BSP);
    var resultParcial2 = resultParcial1.union(pared3BSP);
    pared4BSP = pared4BSP.subtract(auxP4_1BSP);
    pared4BSP = pared4BSP.subtract(auxP4_2BSP);
    pared4BSP = pared4BSP.subtract(auxV4_1BSP);
    pared4BSP = pared4BSP.subtract(auxV4_2BSP);
    var resultParcial3 = resultParcial2.union(pared4BSP);
    pared5BSP = pared5BSP.subtract(auxP5BSP);
    var resultParcial4 = resultParcial3.union(pared5BSP);
    var resultParcial5 = resultParcial4.union(pared6BSP);
    var resultParcial6 = resultParcial5.union(pared7BSP);
    pared8BSP = pared8BSP.subtract(auxP8BSP);
    var resultParcial7 = resultParcial6.union(pared8BSP);
    pared9BSP = pared9BSP.subtract(auxP9_1BSP);
    pared9BSP = pared9BSP.subtract(auxP9_2BSP);
    var resultParcial8 = resultParcial7.union(pared9BSP);
    var resultParcial9 = resultParcial8.union(pared10BSP);
    pared11BSP = pared11BSP.subtract(auxV11BSP);
    var resultParcial10 = resultParcial9.union(pared11BSP);
    pared12BSP = pared12BSP.subtract(auxV12BSP);
    var resultParcial11 = resultParcial10.union(pared12BSP);
    pared13BSP = pared13BSP.subtract(auxP13BSP);
    var resultParcial12 = resultParcial11.union(pared13BSP);
    pared14BSP = pared14BSP.subtract(auxP14BSP);
    pared14BSP = pared14BSP.subtract(auxV14BSP);
    var paredesPlanta1 = resultParcial12.union(pared14BSP);

    return paredesPlanta1.toGeometry();    
    
  }

  createParedesPlanta2(){
    var pared1 = new THREE.BoxGeometry(80, 60, 2);
    pared1.applyMatrix(new THREE.Matrix4().makeTranslation(-100+35+40, 30+60, 74));

    var pared2 = new THREE.BoxGeometry(2, 60, 100);
    pared2.applyMatrix(new THREE.Matrix4().makeTranslation(-100+1, 30+60, 0));

    var pared3 = new THREE.BoxGeometry(115, 60, 2);
    pared3.applyMatrix(new THREE.Matrix4().makeTranslation(-100+(115/2), 30+60, -76+25));
    
    var pared4 = new THREE.BoxGeometry(2, 60, 125);
    pared4.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-50-0.5, 30+60, 25/2));
    
    var pared5 = new THREE.BoxGeometry(36, 60, 2);
    pared5.applyMatrix(new THREE.Matrix4().makeTranslation(-100+(35/2)+0.5, 30+60, (150/2)-25-1));

    var pared6 = new THREE.BoxGeometry(2, 60, 25);
    pared6.applyMatrix(new THREE.Matrix4().makeTranslation(-100+35, 30+60, 75-25/2));

    var pared7 = new THREE.BoxGeometry(115, 60, 2);
    pared7.applyMatrix(new THREE.Matrix4().makeTranslation(-100+(115/2), 30+60, 10));
    
    var pared8 = new THREE.BoxGeometry(2, 60, 40);
    pared8.applyMatrix(new THREE.Matrix4().makeTranslation(-100+35, 30+60, 30));
    
    var pared1BSP = new ThreeBSP(pared1);
    var pared2BSP = new ThreeBSP(pared2);
    var pared3BSP = new ThreeBSP(pared3);
    var pared4BSP = new ThreeBSP(pared4);
    var pared5BSP = new ThreeBSP(pared5);
    var pared6BSP = new ThreeBSP(pared6);
    var pared7BSP = new ThreeBSP(pared7);
    var pared8BSP = new ThreeBSP(pared8);


    var resultParcial1 = pared1BSP.union(pared2BSP);
    var resultParcial2 = resultParcial1.union(pared3BSP);
    var resultParcial3 = resultParcial2.union(pared4BSP);
    var resultParcial4 = resultParcial3.union(pared5BSP);
    var resultParcial5 = resultParcial4.union(pared6BSP);
    var resultParcial6 = resultParcial5.union(pared7BSP);

    var paredesPlanta2 = resultParcial6.union(pared8BSP);
    
    return paredesPlanta2.toGeometry();
  }

  createValla1Planta1(){
    var aux1 = new THREE.BoxGeometry(50, 2, 2);
    var aux2 = new THREE.BoxGeometry(50, 2, 2);
    var aux3 = new THREE.BoxGeometry(2, 10, 2);
    var aux4 = new THREE.BoxGeometry(2, 10, 2);

    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-25, 1+10, 75-1));
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-25, 1+6, 75-1));
    aux3.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-35, 5, 75-1));
    aux4.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-15, 5, 75-1));


    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);
    var aux3BSP = new ThreeBSP(aux3);
    var aux4BSP = new ThreeBSP(aux4);

    var resultParcial1 = aux1BSP.union(aux2BSP);
    var resultParcial2 = resultParcial1.union(aux3BSP);
    var result = resultParcial2.union(aux4BSP);

    var valla1 = new THREE.Mesh(result.toGeometry(), this.materialValla);
    valla1.geometry.computeVertexNormals();
    valla1.geometry.computeFaceNormals();

    return valla1; 
  }


  createValla2Planta1(){
    var aux1 = new THREE.BoxGeometry(2, 2, 25);
    var aux2 = new THREE.BoxGeometry(2, 2, 25);
    var aux3 = new THREE.BoxGeometry(2, 10, 2);

    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-1, 1+10, 75-25/2));
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-1, 1+6, 75-25/2));
    aux3.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-1, 5, 75-25/2));

    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);
    var aux3BSP = new ThreeBSP(aux3);

    var resultParcial1 = aux1BSP.union(aux2BSP);
    var result = resultParcial1.union(aux3BSP);

    var valla2 = new THREE.Mesh(result.toGeometry(), this.materialValla);
    valla2.geometry.computeVertexNormals();
    valla2.geometry.computeFaceNormals();

    return valla2; 
  }

  createValla3Planta1(){
    var aux1 = new THREE.BoxGeometry(2, 2, 25);
    var aux2 = new THREE.BoxGeometry(2, 2, 25);
    var aux3 = new THREE.BoxGeometry(2, 10, 2);

    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(-100+1, 1+10, -75+25/2));
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(-100+1, 1+6, -75+25/2));
    aux3.applyMatrix(new THREE.Matrix4().makeTranslation(-100+1, 5, -75+25/2));

    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);
    var aux3BSP = new ThreeBSP(aux3);

    var resultParcial1 = aux1BSP.union(aux2BSP);
    var result = resultParcial1.union(aux3BSP);

    var valla3 = new THREE.Mesh(result.toGeometry(), this.materialValla);
    valla3.geometry.computeVertexNormals();
    valla3.geometry.computeFaceNormals();

    return valla3; 
  }

  createValla4Planta1(){
    var aux1 = new THREE.BoxGeometry(115, 2, 2);
    var aux2 = new THREE.BoxGeometry(115, 2, 2);
    var aux3 = new THREE.BoxGeometry(2, 10, 2);
    var aux4 = new THREE.BoxGeometry(2, 10, 2);
    var aux5 = new THREE.BoxGeometry(2, 10, 2);
    
    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(-100+(115/2), 1+10, -75+1));
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(-100+(115/2), 1+6, -75+1));
    aux3.applyMatrix(new THREE.Matrix4().makeTranslation(-100+(115/2)-47, 5, -75+1));
    aux4.applyMatrix(new THREE.Matrix4().makeTranslation(-100+(115/2), 5, -75+1));
    aux5.applyMatrix(new THREE.Matrix4().makeTranslation(-100+(115/2)+47, 5, -75+1));

    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);
    var aux3BSP = new ThreeBSP(aux3);
    var aux4BSP = new ThreeBSP(aux4);
    var aux5BSP = new ThreeBSP(aux5);

    var resultParcial1 = aux1BSP.union(aux2BSP);
    var resultParcial2 = resultParcial1.union(aux3BSP);
    var resultParcial3 = resultParcial2.union(aux4BSP);
    var result = resultParcial3.union(aux5BSP);

    var valla4 = new THREE.Mesh(result.toGeometry(), this.materialValla);
    valla4.geometry.computeVertexNormals();
    valla4.geometry.computeFaceNormals();

    return valla4; 
  }

  createVallasBalconPlanta1(){
    var vallas = new THREE.Mesh();
    var valla1 = this.createValla1Planta1();
    var valla2 = this.createValla2Planta1();
    var valla3 = this.createValla3Planta1();
    var valla4 = this.createValla4Planta1();

    vallas.add(valla1);
    vallas.add(valla2);
    vallas.add(valla3);
    vallas.add(valla4);
    
    return vallas;
  }

  createValla1Planta2(){
    var aux1 = new THREE.BoxGeometry(50, 2, 2);
    var aux2 = new THREE.BoxGeometry(50, 2, 2);
    var aux3 = new THREE.BoxGeometry(2, 10, 2);
    var aux4 = new THREE.BoxGeometry(2, 10, 2);

    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-25, 1+10+60, -74));
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-25, 1+6+60, -74));
    aux3.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-35, 5+60, -74));
    aux4.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-15, 5+60, -74));


    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);
    var aux3BSP = new ThreeBSP(aux3);
    var aux4BSP = new ThreeBSP(aux4);

    var resultParcial1 = aux1BSP.union(aux2BSP);
    var resultParcial2 = resultParcial1.union(aux3BSP);
    var result = resultParcial2.union(aux4BSP);

    var valla1 = new THREE.Mesh(result.toGeometry(), this.materialValla);
    valla1.geometry.computeVertexNormals();
    valla1.geometry.computeFaceNormals();

    return valla1; 
  }

  createValla2Planta2(){
    var aux1 = new THREE.BoxGeometry(2, 2, 25);
    var aux2 = new THREE.BoxGeometry(2, 2, 25);
    var aux3 = new THREE.BoxGeometry(2, 10, 2);

    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-50, 1+10+60, -75+25/2));
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-50, 1+6+60, -75+25/2));
    aux3.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-50, 5+60, -75+25/2));

    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);
    var aux3BSP = new ThreeBSP(aux3);

    var resultParcial1 = aux1BSP.union(aux2BSP);
    var result = resultParcial1.union(aux3BSP);

    var valla2 = new THREE.Mesh(result.toGeometry(), this.materialValla);
    valla2.geometry.computeVertexNormals();
    valla2.geometry.computeFaceNormals();

    return valla2; 
  }
  
  createValla3Planta2(){
    var aux1 = new THREE.BoxGeometry(2, 2, 25);
    var aux2 = new THREE.BoxGeometry(2, 2, 25);
    var aux3 = new THREE.BoxGeometry(2, 10, 2);

    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(100-35, 1+10+60, -75+25/2));
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(100-35, 1+6+60, -75+25/2));
    aux3.applyMatrix(new THREE.Matrix4().makeTranslation(100-35, 5+60, -75+25/2));

    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);
    var aux3BSP = new ThreeBSP(aux3);

    var resultParcial1 = aux1BSP.union(aux2BSP);
    var result = resultParcial1.union(aux3BSP);

    var valla3 = new THREE.Mesh(result.toGeometry(), this.materialValla);
    valla3.geometry.computeVertexNormals();
    valla3.geometry.computeFaceNormals();

    return valla3; 
  }

  createValla4Planta2(){
    var aux1 = new THREE.BoxGeometry(35, 2, 2);
    var aux2 = new THREE.BoxGeometry(35, 2, 2);
    var aux3 = new THREE.BoxGeometry(2, 10, 2);

    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(100-35/2, 1+10+60, -75+25));
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(100-35/2, 1+6+60, -75+25));
    aux3.applyMatrix(new THREE.Matrix4().makeTranslation(100-35/2, 5+60, -75+25));

    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);
    var aux3BSP = new ThreeBSP(aux3);

    var resultParcial1 = aux1BSP.union(aux2BSP);
    var result = resultParcial1.union(aux3BSP);

    var valla4 = new THREE.Mesh(result.toGeometry(), this.materialValla);
    valla4.geometry.computeVertexNormals();
    valla4.geometry.computeFaceNormals();

    return valla4; 
  }

  createValla5Planta2(){   
    var aux1 = new THREE.BoxGeometry(2, 2, 100);
    var aux2 = new THREE.BoxGeometry(2, 2, 100);
    var aux3 = new THREE.BoxGeometry(2, 10, 2);
    var aux4 = new THREE.BoxGeometry(2, 10, 2);
    var aux5 = new THREE.BoxGeometry(2, 10, 2);
    
    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(100-1, 1+10+60, 0));
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(100-1, 1+6+60, 0));
    aux3.applyMatrix(new THREE.Matrix4().makeTranslation(100-1, 5+60, -30+1));
    aux4.applyMatrix(new THREE.Matrix4().makeTranslation(100-1, 5+60, 0));
    aux5.applyMatrix(new THREE.Matrix4().makeTranslation(100-1, 5+60, 30-1));

    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);
    var aux3BSP = new ThreeBSP(aux3);
    var aux4BSP = new ThreeBSP(aux4);
    var aux5BSP = new ThreeBSP(aux5);

    var resultParcial1 = aux1BSP.union(aux2BSP);
    var resultParcial2 = resultParcial1.union(aux3BSP);
    var resultParcial3 = resultParcial2.union(aux4BSP);
    var result = resultParcial3.union(aux5BSP);

    var valla5 = new THREE.Mesh(result.toGeometry(), this.materialValla);
    valla5.geometry.computeVertexNormals();
    valla5.geometry.computeFaceNormals();

    return valla5; 
  }

  createValla6Planta2(){    
    var aux1 = new THREE.BoxGeometry(85, 2, 2);
    var aux2 = new THREE.BoxGeometry(85, 2, 2);
    var aux3 = new THREE.BoxGeometry(2, 10, 2);
    var aux4 = new THREE.BoxGeometry(2, 10, 2);
    var aux5 = new THREE.BoxGeometry(2, 10, 2);
    
    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(100-85/2, 1+10+60, 75-25-1));
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(100-85/2, 1+6+60, 75-25-1));
    aux3.applyMatrix(new THREE.Matrix4().makeTranslation(100-20, 5+60, 75-25-1));
    aux4.applyMatrix(new THREE.Matrix4().makeTranslation(100-85/2, 5+60, 75-25-1));
    aux5.applyMatrix(new THREE.Matrix4().makeTranslation(100-65, 5+60, 75-25-1));

    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);
    var aux3BSP = new ThreeBSP(aux3);
    var aux4BSP = new ThreeBSP(aux4);
    var aux5BSP = new ThreeBSP(aux5);

    var resultParcial1 = aux1BSP.union(aux2BSP);
    var resultParcial2 = resultParcial1.union(aux3BSP);
    var resultParcial3 = resultParcial2.union(aux4BSP);
    var result = resultParcial3.union(aux5BSP);

    var valla6 = new THREE.Mesh(result.toGeometry(), this.materialValla);
    valla6.geometry.computeVertexNormals();
    valla6.geometry.computeFaceNormals();

    return valla6; 
  }

  createVallasBalconPlanta2(){
    var vallas = new THREE.Mesh();
    var valla1 = this.createValla1Planta2();
    var valla2 = this.createValla2Planta2();
    var valla3 = this.createValla3Planta2();
    var valla4 = this.createValla4Planta2();
    var valla5 = this.createValla5Planta2();
    var valla6 = this.createValla6Planta2();

    vallas.add(valla1);
    vallas.add(valla2);
    vallas.add(valla3);
    vallas.add(valla4);
    vallas.add(valla5);
    vallas.add(valla6);

    return vallas;
  }

  createTechoPlanta1(){
    var techo = this.createSuelo();
    techo.applyMatrix(new THREE.Matrix4().makeTranslation(0,60,0));
    
    var aux1 = new THREE.BoxGeometry(115, 2, 25);
    var aux2 = new THREE.BoxGeometry(50, 2, 25);

    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(-100+115/2-1, 61, -75+25/2-1));
    aux2.applyMatrix(new THREE.Matrix4().makeTranslation(100-35-50/2, 61, 75-25/2));
    
    var aux1BSP = new ThreeBSP(aux1);
    var aux2BSP = new ThreeBSP(aux2);
    var techoBSP = new ThreeBSP(techo);

    var resultParcial1 = aux1BSP.union(aux2BSP);
    var result = techoBSP.subtract(resultParcial1); 

    return result.toGeometry();
  }
  
  createTechoPlanta2(){
    var techo = this.createTechoPlanta1();
    techo.applyMatrix(new THREE.Matrix4().makeTranslation(0,60,0));
    
    var aux1 = new THREE.BoxGeometry(86, 2, 125);

    aux1.applyMatrix(new THREE.Matrix4().makeTranslation(100-86/2, 121, -75+125/2));
    
    var aux1BSP = new ThreeBSP(aux1);
    var techoBSP = new ThreeBSP(techo);
    
    var result = techoBSP.subtract(aux1BSP); 
    
    return result.toGeometry();
  }

  createTejado(){
    var geometry = new THREE.ConeGeometry( 80, 60, 4 );
    geometry.rotateY(45*Math.PI/180);
    geometry.applyMatrix(new THREE.Matrix4().makeScale(1.1, 1, 1.2));
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-100+115/2, 122+27, 12));

    var tejado = new THREE.Mesh(geometry, this.materialTejado);
    tejado.geometry.computeFaceNormals();
    tejado.geometry.computeVertexNormals();

    return tejado;
  }
  
  createCasa(){
    this.suelo = this.createSuelo();
    var paredesPlanta1 = this.createParedesPlanta1();
    var paredesPlanta2 = this.createParedesPlanta2();
    this.vallasPlanta1 = this.createVallasBalconPlanta1();
    this.vallasPlanta2 = this.createVallasBalconPlanta2();
    var techoPlanta1 = new THREE.Mesh(this.createTechoPlanta1(), this.materialSuelo);
    techoPlanta1.geometry.computeVertexNormals();
    techoPlanta1.geometry.computeFaceNormals();

    var techoPlanta2 = new THREE.Mesh(this.createTechoPlanta2(), this.materialSuelo);
    techoPlanta2.geometry.computeVertexNormals();
    techoPlanta2.geometry.computeFaceNormals();

    var tejado = this.createTejado();


    var paredesPlanta1BSP = new ThreeBSP(paredesPlanta1);
    var paredesPlanta2BSP = new ThreeBSP(paredesPlanta2);

    var result = paredesPlanta1BSP;//.union(paredesPlanta2BSP);

    var resultado = new THREE.Mesh(result.toGeometry(), this.materialPared);
    resultado.geometry.computeVertexNormals();
    resultado.geometry.computeFaceNormals();


    //Puertas
    this.puertasPlanta1 = this.createPuertasPlanta1();
    this.ventanasPlanta1 = this.createVentanasPlanta1();
    this.mueblesPlanta1 = this.createMuebles();
    
    resultado.add(this.vallasPlanta1);
    resultado.add(this.suelo);
    resultado.add(this.puertasPlanta1);
    resultado.add(this.ventanasPlanta1);
    resultado.add(this.mueblesPlanta1);
    
    //resultado.add(vallasPlanta2);
    //resultado.add(tejado);
    //resultado.add(techoPlanta1);
    //resultado.add(techoPlanta2);
    
    return resultado;
  }


  /************************************************************************************************************************************************/
  /************************************************************************************************************************************************/
  //ARQUITECTURA
  createVentana(){
    var ventana = new THREE.Mesh();
    
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('recursos/');
    mtlLoader.load('window.mtl', function (materials) {
        materials.preload();
        
        var ObjLoader = new THREE.OBJLoader(); 
        ObjLoader.setMaterials(materials);
        ObjLoader.setPath('recursos/');
        ObjLoader.load('window.obj', function (object) {
            object.scale.x = 1.5;
            object.scale.z = 1.5;
            object.scale.y = 1.5;
            ventana.add(object);
        });
    });

    return ventana;
  }

  createVentanasPlanta1(){
    this.ventanasPlanta1 = new THREE.Mesh();

    var ventana1 = this.createVentana();
    ventana1.position.set(1, 15, 75);

    var ventana2 = this.createVentana();
    ventana2.position.set(-100+35+35/2, 15, 75);

    var ventana3 = this.createVentana();
    ventana3.rotation.y = 270*Math.PI/180;
    ventana3.position.set(-100, 15, -20);
    
    var ventana4 = this.createVentana();
    ventana4.rotation.y = 270*Math.PI/180;
    ventana4.position.set(-100, 15, 20);
    
    var ventana5 = this.createVentana();
    ventana5.rotation.y = Math.PI;
    ventana5.position.set(-100+35+16/3+7, 15, -76+25);
    
    var ventana6 = this.createVentana();
    ventana6.rotation.y = Math.PI;
    ventana6.position.set(-100+35+40+4, 15, -76+25);
    
    var ventana7 = this.createVentana();
    ventana7.rotation.y = Math.PI;
    ventana7.position.set(100-35-35/2-14/2, 15, -75);
        
    var ventana8 = this.createVentana();
    ventana8.rotation.y = Math.PI;
    ventana8.position.set(100-35/2, 15, -75+25+1);

    var ventana9 = this.createVentana();
    ventana9.rotation.y = Math.PI/2;
    ventana9.position.set(100-1, 15, 20);

    var ventana10 = this.createVentana();
    ventana10.position.set(100-35/2, 15, 75-25);
    
    this.ventanasPlanta1.add(ventana1);
    this.ventanasPlanta1.add(ventana2);
    this.ventanasPlanta1.add(ventana3);
    this.ventanasPlanta1.add(ventana4);
    this.ventanasPlanta1.add(ventana5);
    this.ventanasPlanta1.add(ventana6);
    this.ventanasPlanta1.add(ventana7);
    this.ventanasPlanta1.add(ventana8);
    this.ventanasPlanta1.add(ventana9);
    this.ventanasPlanta1.add(ventana10);
    return this.ventanasPlanta1;
    
  }

  createPuertasPlanta1(){
    this.puertasPlanta1 = new THREE.Mesh();

    //Puerta principal
    this.puertaPrincipal = new Puerta();
    this.puertaPrincipal.position.x = -100+35+40;
    this.puertaPrincipal.position.z = 75;
    this.puertaPrincipal.setAngle(60)

    //Puerta1
    this.puerta1 = new Puerta();
    this.puerta1.rotation.y = 90*Math.PI/180;
    this.puerta1.position.set(100-85-0.5, 0, 10+16/2);
    this.puerta1.setAngle(60)
    
    //Puerta2
    this.puerta2 = new Puerta();
    this.puerta2.rotation.y = -90*Math.PI/180;
    this.puerta2.position.set(-100+60+1, 0, 25/2-16/2-7);
    this.puerta2.setAngle(60)
    
    //Puerta3
    this.puerta3 = new Puerta();
    this.puerta3.position.set(-16/2, 0, -76+25);    
    this.puerta3.setAngle(60)
    
    //Puerta4
    this.puerta4 = new Puerta();
    this.puerta4.rotation.y = -90*Math.PI/180;
    this.puerta4.position.set(-100+35+1, 0, 150/2-50/2-16/2-14);
    this.puerta4.setAngle(60)
    
    //Puerta5
    this.puerta5 = new Puerta();
    this.puerta5.position.set(-100+35/2, 0, -76+25);    
    this.puerta5.setAngle(60)
    
    //Puerta6
    this.puerta6 = new Puerta();
    this.puerta6.rotation.y = 90*Math.PI/180;
    this.puerta6.position.set(100-35-50-0.5, 0, -75+25+10+16);
    this.puerta6.setAngle(60)
    
    //Puerta7
    this.puerta7 = new Puerta();
    this.puerta7.position.set(100-35/3-16, 0, -75+60+1);
    this.puerta7.setAngle(60)
    
    //Puerta8
    this.puerta8 = new Puerta();
    this.puerta8.position.set(100-85/2-16, 0, 75-25-1);
    this.puerta8.setAngle(60)
    
    this.puertasPlanta1.add(this.puertaPrincipal);
    this.puertasPlanta1.add(this.puerta1);
    this.puertasPlanta1.add(this.puerta2);
    this.puertasPlanta1.add(this.puerta3);
    this.puertasPlanta1.add(this.puerta4);
    this.puertasPlanta1.add(this.puerta5);
    this.puertasPlanta1.add(this.puerta6);
    this.puertasPlanta1.add(this.puerta7);
    this.puertasPlanta1.add(this.puerta8);
    
    this.puertas.push(this.puertaPrincipal);
    this.puertas.push(this.puerta1);
    this.puertas.push(this.puerta2);
    this.puertas.push(this.puerta3);
    this.puertas.push(this.puerta4);
    this.puertas.push(this.puerta5);
    this.puertas.push(this.puerta6);
    this.puertas.push(this.puerta7);
    this.puertas.push(this.puerta8);
    
    return this.puertasPlanta1;
  }

  /****************************************************************************************/
  //MUEBLES
  createSofa(){
    var sofa = new THREE.Mesh();
    //texture
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
        
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/vaquero.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('sofa.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 18;
        object.scale.z = 18;
        object.scale.y = 18;
        sofa.add(object);
    });
    
    return sofa;
  }

  createCama(){
    var cama = new THREE.Mesh();
    //texture
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
        
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/cama.png", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('bed.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.015;
        object.scale.z = 0.015;
        object.scale.y = 0.015;
        cama.add(object);
    });
    
    return cama;
  }

  createMesitaNoche(){
    var mesitaNoche = new THREE.Mesh();
    //texture
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
        
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/puerta2.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('mesitadenoche.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.15;
        object.scale.z = 0.15;
        object.scale.y = 0.15;
        mesitaNoche.add(object);
    });
    
    return mesitaNoche;

  }

  createCoffeeTable(){
    var CoffeeTable = new THREE.Mesh();

    //texture
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
        
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/puerta2.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('coffe.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.3;
        object.scale.z = 0.8;
        object.scale.y = 0.3;
        CoffeeTable.add(object);
    });
    
    return CoffeeTable;
  }

  createSilla(){
    var silla = new THREE.Mesh();
    
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
            
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/puerta2.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('chair.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.18;
        object.scale.z = 0.18;
        object.scale.y = 0.18;
        silla.add(object);
    });

    return silla;
  }
  createSillon(){
    var sillon = new THREE.Mesh();
    
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
            
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/vaquero.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('sillon.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.1;
        object.scale.z = 0.1;
        object.scale.y = 0.1;
        sillon.add(object);
    });

    return sillon;

  }
  createMesa(){
    var mesa = new THREE.Mesh();
    
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
            
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/puerta.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('table.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.09;
        object.scale.z = 0.09;
        object.scale.y = 0.09;
        mesa.add(object);
    });

    return mesa;

  }

  createCojines(){
    var cojines = new THREE.Mesh();
    
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
            
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/flores.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('vray.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.05;
        object.scale.z = 0.05;
        object.scale.y = 0.05;
        cojines.add(object);
    });

    return cojines;
  }
  createToilet(){
    var toilet = new THREE.Mesh();
    
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
            
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/sink.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('toilet.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.15;
        object.scale.z = 0.15;
        object.position.y = 10;
        object.scale.y = 0.15;
        toilet.add(object);
    });

    return toilet;
  }
  createSink(){
    var sink = new THREE.Mesh();
    
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
            
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/sink.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('Sink.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.45;
        object.scale.z = 0.45;
        object.scale.y = 0.45;
        object.position.y = 10;
        
        sink.add(object);
    });

    return sink;
  }
  
  createDresser(){
    var dresser = new THREE.Mesh();
    
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
            
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/puerta2.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('dresser.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.14;
        object.scale.z = 0.14;
        object.scale.y = 0.14;
        dresser.add(object);
    });

    return dresser;
  }
  createDesk(){
    var desk = new THREE.Mesh();
    
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
            
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/puerta2.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('desk2.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.rotation.y = Math.PI/2;
        object.scale.x = 4;
        object.scale.z = 2.8;
        object.scale.y = 2.8;
        desk.add(object);
    });

    return desk;
  }
  
  createDrawer(){
    var drawer = new THREE.Mesh();
    
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
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('tdv.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.rotation.y = Math.PI/2;
        object.scale.x = 1.4;
        object.scale.z = 1.4;
        object.scale.y = 1.4;
        drawer.add(object);
    });

    return drawer;
  }

  createOfficeChair(){
    var officeChair = new THREE.Mesh();
    
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
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('officechair.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.6;
        object.scale.z = 0.6;
        object.scale.y = 0.6;
        officeChair.add(object);
    });
  
    return officeChair;
  }
  createOutsideChair(){
    var outsideChair = new THREE.Mesh();
    
    var manager = new THREE.LoadingManager();
            manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
            
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader(manager);
    loader.load("imgs/wood.jpg", function(image) {
        texture.image = image;
        texture.needsUpdate = true;
    }); 

    var ObjLoader = new THREE.OBJLoader(); 
    ObjLoader.setPath('recursos/muebles/');
    ObjLoader.load('sun_chair.obj', function (object) {
        object.traverse(function (child) {
            if(child instanceof THREE.Mesh)
                child.material.map = texture;
        });
        object.scale.x = 0.12;
        object.scale.z = 0.12;
        object.scale.y = 0.12;
        object.position.y = 7;
        outsideChair.add(object);
    });
  
    return outsideChair;
  }
    
  createMuebles(){
    var mesaSalon = this.createMesa();
    mesaSalon.position.x=-22;
    mesaSalon.position.y=5.3;
    mesaSalon.position.z=-25;

    var silla1 = this.createSilla();
    silla1.position.x = -22;
    silla1.position.z = -40;
    var silla2 = this.createSilla();
    silla2.rotation.y = Math.PI;
    silla2.position.x = -22;
    silla2.position.z = -11;
    var silla3 = this.createSilla();
    silla3.rotation.y = Math.PI/2;
    silla3.position.x = -32;
    silla3.position.z = -30;
    var silla4 = this.createSilla();
    silla4.rotation.y = Math.PI/2;
    silla4.position.x = -32;
    silla4.position.z = -20;    
    var silla5 = this.createSilla();
    silla5.rotation.y = -Math.PI/2;
    silla5.position.x = -12;
    silla5.position.z = -30;
    var silla6 = this.createSilla();
    silla6.rotation.y = -Math.PI/2;
    silla6.position.x = -12;
    silla6.position.z = -20;
    
    var sofa = this.createSofa();
    sofa.rotation.y = -Math.PI/2;
    sofa.position.x = 11;
    sofa.position.z = 40;

    var coffeeTable = this.createCoffeeTable();
    coffeeTable.position.x = -7;
    coffeeTable.position.y = 5;
    coffeeTable.position.z = 41;

    var sillon1 = this.createSillon();
    sillon1.rotation.y = Math.PI-Math.PI/4;
    sillon1.position.x = -1;
    sillon1.position.y = 5;
    sillon1.position.z = 65;

    var drawer = this.createDrawer();
    drawer.position.x = -35;
    drawer.position.y = 2;
    drawer.position.z = 40;
    
    var cama1 = this.createCama();
    cama1.rotation.y = -Math.PI/2;
    cama1.position.x = 82.5;
    cama1.position.y = 2.5;
    cama1.position.z = 20;
    
    var cama2 = this.createCama();
    cama2.rotation.y = Math.PI/2;
    cama2.position.x = -82.5;
    cama2.position.y = 2.5;
    cama2.position.z = -20;
    
    var cama3 = this.createCama();
    cama3.position.x = 40;
    cama3.position.y = 2.5;
    cama3.position.z = -60;
    
    var sink1 = this.createSink();
    sink1.position.x = 83;
    sink1.position.z = -44;

    var sink2 = this.createSink();
    sink2.rotation.y = -Math.PI/2;
    sink2.position.x = -45;
    sink2.position.z = 40;
    
    var toilet1 = this.createToilet();
    toilet1.rotation.y = -Math.PI/2;
    toilet1.position.x = 93;
    toilet1.position.z = -32;

    var toilet2 = this.createToilet();
    toilet2.rotation.y = Math.PI/2;
    toilet2.position.x = -57;
    toilet2.position.z = 63;

    var mesitaNoche1 = this.createMesitaNoche();
    mesitaNoche1.position.x = -95;
    mesitaNoche1.position.z = -2;

    var mesitaNoche2 = this.createMesitaNoche();
    mesitaNoche2.position.x = -95;
    mesitaNoche2.position.z = -37;

    var mesitaNoche3 = this.createMesitaNoche();
    mesitaNoche3.rotation.y = Math.PI;
    mesitaNoche3.position.x = 95;
    mesitaNoche3.position.z = 2;

    var mesitaNoche4 = this.createMesitaNoche();
    mesitaNoche4.rotation.y = Math.PI;
    mesitaNoche4.position.x = 95;
    mesitaNoche4.position.z = 37; 

    var mesitaNoche5 = this.createMesitaNoche();
    mesitaNoche5.rotation.y = -Math.PI/2;
    mesitaNoche5.position.x = 57;
    mesitaNoche5.position.z = -70;

    var mesitaNoche6 = this.createMesitaNoche();
    mesitaNoche6.rotation.y = -Math.PI/2;
    mesitaNoche6.position.x = 23;
    mesitaNoche6.position.z = -70; 

    var dresser1 = this.createDresser();
    dresser1.rotation.y = Math.PI/2;
    dresser1.position.x = 15;
    dresser1.position.z = 33.5;
    
    var dresser2 = this.createDresser();
    dresser2.rotation.y = -Math.PI/2;;
    dresser2.position.x = -38;
    dresser2.position.z = -22;
    
    var desk = this.createDesk();
    desk.rotation.y = 270*Math.PI/180;
    desk.position.x = 45;
    desk.position.z = -7;

    var officechair = this.createOfficeChair();
    officechair.position.x = 38;
    officechair.position.z = -1;

    var outchair = this.createOutsideChair();
    outchair.rotation.y = -Math.PI/2-(20*Math.PI/180);
    outchair.position.x = 30;
    outchair.position.z = 60;

    var armario1 = new Armario();
    armario1.setAnglePuertaI(0);
    armario1.setAnglePuertaD(0);
    armario1.scale.y = 1.1;
    armario1.rotation.y = Math.PI;
    armario1.position.x = -100+35/2;
    armario1.position.z = 46;
    
    var armario2 = new Armario();
    armario2.setAnglePuertaI(0);
    armario2.setAnglePuertaD(0);
    armario2.scale.y = 1.1;
    armario2.rotation.y = Math.PI;
    armario2.position.x = 40;
    armario2.position.z = -18;

    this.mueblesPlanta1 = new THREE.Mesh();
    this.mueblesPlanta1.add(mesaSalon);
    this.mueblesPlanta1.add(silla1);
    this.mueblesPlanta1.add(silla2);
    this.mueblesPlanta1.add(silla3);
    this.mueblesPlanta1.add(silla4);
    this.mueblesPlanta1.add(silla5);
    this.mueblesPlanta1.add(silla6);
    this.mueblesPlanta1.add(sofa);
    this.mueblesPlanta1.add(coffeeTable);
    this.mueblesPlanta1.add(sillon1);
    this.mueblesPlanta1.add(drawer);
    this.mueblesPlanta1.add(cama1);
    this.mueblesPlanta1.add(cama2);
    this.mueblesPlanta1.add(cama3);
    this.mueblesPlanta1.add(sink1);
    this.mueblesPlanta1.add(sink2);
    this.mueblesPlanta1.add(toilet1);
    this.mueblesPlanta1.add(toilet2);
    this.mueblesPlanta1.add(mesitaNoche1);
    this.mueblesPlanta1.add(mesitaNoche2);
    this.mueblesPlanta1.add(mesitaNoche3);
    this.mueblesPlanta1.add(mesitaNoche4);
    this.mueblesPlanta1.add(mesitaNoche5);
    this.mueblesPlanta1.add(mesitaNoche6);
    this.mueblesPlanta1.add(dresser1);
    this.mueblesPlanta1.add(dresser2);
    this.mueblesPlanta1.add(desk);
    this.mueblesPlanta1.add(officechair);
    this.mueblesPlanta1.add(outchair);
    this.mueblesPlanta1.add(armario1);
    this.mueblesPlanta1.add(armario2);

    return this.mueblesPlanta1;
  }
}



// class variables
Casa.WORLD = 0;
Casa.LOCAL = 1;
