import {Biblioteka} from "./biblioteka.js";


fetch("https://localhost:5001/Biblioteka/PreuzmiBiblioteke").then(p => {
  p.json().then(data => {
      data.forEach(biblioteka => {
        const biblioteka1 = new Biblioteka(biblioteka.id, biblioteka.naziv, biblioteka.brojPolica);
        console.log(biblioteka.id);
        console.log(biblioteka.naziv);
        console.log(biblioteka.brojPolica);
        biblioteka1.crtajBiblioteku(document.body);

      });
    });  
  });
       

            
            
        
