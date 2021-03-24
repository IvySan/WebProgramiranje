import {Polica} from "./polica.js";
import {Knjiga} from "./knjiga.js";

export class Biblioteka{
    //dodat je ID zbog povezivanja sa bazom
    constructor(id, naziv, brPolica){

        this.id = id;
        if(typeof(naziv) == "string")
            this.naziv = naziv;
        else 
            throw new Error("Invalid naziv type!");

        if(typeof(brPolica) == "number")
            this.brPolica = brPolica;
        else 
            throw new Error("Invalid brPolica type!");

        this.velikiKontejner = null;
        this.police = [];
        //imamo 10 oznaka(zanrova) polica i za svaku oznaku max br knjiga
        this.oznakePolice = ["Akcioni romani", "Drama", "Enciklopedija", "Epska fantastika", "Horor", "Klasici", "Krimi romani", "Ljubavni romani", "Naucna fantastika", "Trileri"];
        this.maxBrojevi = [8, 4, 5, 3, 4, 10, 7, 9, 10, 6];
    
    }

    dodajPolicu(polica){
        this.police.push(polica);
    }

    crtajBiblioteku(host){
        if(!host)
            throw new Error("Roditeljski element ne postoji");
        
        this.velikiKontejner = document.createElement("div");
        this.velikiKontejner.className = "velikiKontejner";
        host.appendChild(this.velikiKontejner);

        //crtamo naziv biblioteke
        var pomLabela = document.createElement("label");
        pomLabela.innerHTML = this.naziv;
        pomLabela.className = "nazivBiblioteke";
        this.velikiKontejner.appendChild(pomLabela);

        const pomKont = document.createElement("div");
        pomKont.className = "pomKont";
        this.velikiKontejner.appendChild(pomKont);

        //crtamo formu, a zatim i police
        this.crtajFormu(pomKont);
        this.crtajPolice(pomKont);
    }

   /* izracunajSirinuKnjige(){
        let index;
        console.log("iz fje izracunaj sirinu knjige");
        console.log(this.velikiKontejner.querySelector(`input[name='radiobtn']:checked`).value);
        for(let i=0; i<this.oznakePolice.length; i++){
            if( this.velikiKontejner.querySelector(`input[name='radiobtn']:checked`).value === this.oznakePolice[i] )
                index = i;
        }
        let sirinaknjige = this.police[index].sirina / this.police[index].maxBr; 

    }*/
    crtajFormu(host){

        const kontForma = document.createElement("div");
        kontForma.className = "kontForma";
        host.appendChild(kontForma);

        //crtamo deo za unos knjige
        const k1 = new Knjiga(0, "", "", 0);
        k1.crtajUnosKnjige(kontForma);

        var pomLabela = document.createElement("label");
        pomLabela.innerHTML = "Zanr knjige: ";
        kontForma.appendChild(pomLabela);

        // crtamo radio buttone

        for (let i=0; i<this.brPolica; i++){
            let divRb = document.createElement("div");
            let opcija = document.createElement("input");
            opcija.className = "opcija";
            opcija.type = "radio";
            opcija.name = "radiobtn";
            opcija.value = this.oznakePolice[i];
            let labela = document.createElement("label");
            labela.innerHTML = this.oznakePolice[i];

            divRb.appendChild(opcija);
            divRb.appendChild(labela);
            kontForma.appendChild(divRb);
        }

        
        //crtamo dugme dodaj
        const dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj";
        kontForma.appendChild(dugme); 
       
        dugme.onclick = (ev) =>{

            const naziv = this.velikiKontejner.querySelector(".naziv").value;
            const autor = this.velikiKontejner.querySelector(".autor").value;
            const brStrana = this.velikiKontejner.querySelector(".strane").value;
            
            console.log(this.velikiKontejner.querySelector(`input[name='radiobtn']:checked`));
            const identifikator = this.velikiKontejner.querySelector(`input[name='radiobtn']:checked`);
            
            if(identifikator == null)
                alert("Molimo vas izaberite zanr knjige!");
            else{
                 
                let index;
                console.log(this.velikiKontejner.querySelector(`input[name='radiobtn']:checked`).value);
                for(let i=0; i<this.oznakePolice.length; i++){
                    if( this.velikiKontejner.querySelector(`input[name='radiobtn']:checked`).value === this.oznakePolice[i] )
                        index = i;
                }
                var trBr = this.police[index].trBr;



              // var idKnjige = Math.floor((Math.random() * 100) + 1);

                /*fetch("https://localhost:5001/Biblioteka/IzmeniTrBr/" + this.police[index].id + trBr).then(p => {
                    if (p.ok) { */
                        if(trBr >= this.police[index].maxBr)
                            alert("Na policu ne moze stati vise knjiga!");
                         else{
                            
                        

                        fetch("https://localhost:5001/Biblioteka/UpisiKnjigu/" + this.police[index].id, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                    //"id": idKnjige,
                                    "naziv": naziv,
                                    "autor": autor,
                                    "brojStrana": brStrana,
                                  
                            })
                        }).then(p => { 
                            console.log(trBr);
                            trBr++;
                            console.log(trBr);
                           /* fetch("https://localhost:5001/Biblioteka/IzmeniTrBr/" + this.police[index].id + trBr, {
                                method: "PUT"
                            });*/
                            this.police[index].azurirajPolicu(trBr, naziv, autor, brStrana);
                                
                        })
                         
                    
                    }
                    
                
            }
        }
        
    }

    crtajPolice(host){
        
        const kontPolice = document.createElement("div");
        kontPolice.className = "kontPolice";
        host.appendChild(kontPolice);

        for (let i=0; i<this.brPolica; i++){
            let polica = new Polica(i, this.oznakePolice[i], this.maxBrojevi[i], 0); 
            this.dodajPolicu(polica);
            polica.crtajPolicu(kontPolice);

        }
    }
}