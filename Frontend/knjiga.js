import {Biblioteka} from "./biblioteka.js";
import {Polica} from "./polica.js";

export class Knjiga{
    constructor(id, naziv, autor, brStrana){

        this.id = id; //id je redni broj knjige
        
        if(typeof(naziv) == "string")
            this.naziv = naziv;
        else 
            throw new Error("Invalid naziv type!");
        
        
        if(typeof(autor) == "string")
            this.autor = autor;
        else 
            throw new Error("Invalid autor type!");

        
        if(typeof(brStrana) == "number")
            this.brStrana = brStrana;
        else 
            throw new Error("Invalid brStrana type!");
        
        this.maliKontejner = null;
        this.kontejnerZaUnos = null;
    }

    crtajKnjigu(host){

        this.maliKontejner = document.createElement("div");
        this.maliKontejner.className = "maliKontejner";
        host.appendChild(this.maliKontejner);
       
    
        //knjiga sadrzi dugme prikazi podatke
        const dugmePrikaz = document.createElement("button");
        dugmePrikaz.innerHTML = "Prikazi podatke";
        this.maliKontejner.appendChild(dugmePrikaz);

        dugmePrikaz.onclick = (ev) =>{
                console.log(this.naziv);
                console.log(this.autor);
                console.log(this.brStrana);

                alert(`Naziv ove knjige je ${this.naziv}.
                Autor ove knjige je ${this.autor}.
                Knjiga ima ${this.brStrana} strana.`);
        }

        //knjiga sadrzi dugme obrisi 
        const dugmeObrisi = document.createElement("button");
        dugmeObrisi.innerHTML = "Obrisi";
        this.maliKontejner.appendChild(dugmeObrisi);

        dugmeObrisi.onclick = (ev) =>{

            console.log(this.naziv);
            if(this.obrisi())
            {
                fetch("https://localhost:5001/Biblioteka/IzbrisiKnjigu/"+this.id,{
                        method: "DELETE"
                    });
            }
            
            
        }
    }

    crtajUnosKnjige(host){

        this.kontejnerZaUnos = document.createElement("div");
        this.kontejnerZaUnos.className = "kontejnerZaUnos";
        host.appendChild(this.kontejnerZaUnos);

        var pomLabela = document.createElement("label");
        pomLabela.innerHTML = "Naziv knjige: ";
        this.kontejnerZaUnos.appendChild(pomLabela);

        let unos = document.createElement("input");
        unos.className = "naziv";
        this.kontejnerZaUnos.appendChild(unos);

        pomLabela = document.createElement("label");
        pomLabela.innerHTML = "Autor: ";
        this.kontejnerZaUnos.appendChild(pomLabela);

        unos = document.createElement("input");
        unos.className = "autor";
        this.kontejnerZaUnos.appendChild(unos);

        pomLabela = document.createElement("label");
        pomLabela.innerHTML = "Broj strana: ";
        this.kontejnerZaUnos.appendChild(pomLabela);

        unos = document.createElement("input");
        unos.className = "strane";
        unos.type = "number";
        this.kontejnerZaUnos.appendChild(unos); 

    }

    azurirajKnjigu( naziv, autor, brStrana){

        /*var idKnjige = Math.floor((Math.random() * 100) + 1);
        fetch("https://localhost:5001/Biblioteka/IzmeniKnjigu/" + 0 + idKnjige , {
           method: "PUT"
        });*/

      //this.id = id;
      this.naziv = naziv;
      this.autor = autor;
      this.brStrana = brStrana;
    }

    obrisi(){
        
        var parent = this.maliKontejner.parentNode;
        parent.removeChild(this.maliKontejner);

        //obrisi knjigu u bazi 
        this.polica.knjige = this.polica.knjige.filter(element => element.id !== this.id); 
    
        //azuriramo trBr
        this.polica.trBr--; 
        this.polica.srednjiKontejner.querySelector(".odnos").innerHTML = `${this.polica.trBr}/${this.polica.maxBr}`;

    }
}