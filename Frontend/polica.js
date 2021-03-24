import {Knjiga} from "./knjiga.js";

export class Polica{
    //dodat je id zbog povezivanja na bazu
    constructor(id, oznaka, maxBr, trBr){


        this.id = id;
        if(typeof(oznaka) == "string")
            this.oznaka = oznaka;
        else 
            throw new Error("Invalid oznaka type!");
        
        
        if(typeof(maxBr) == "number")
            this.maxBr = maxBr;
        else 
            throw new Error("Invalid maxBr type!");
            
        
        if(typeof(trBr) == "number")
            this.trBr = trBr;
        else 
            throw new Error("Invalid trBr type!");
        
        this.sirina = 0;
        this.srednjiKontejner = null;
        this.pomocniKontejner = null;
        this.knjige = [];
    }

    dodajKnjigu(knjiga){
        this.knjige.push(knjiga);
    }

    crtajKnjige(host){
        const kontKnjige = document.createElement("div");
        kontKnjige.className = "kontKnjige";
        host.appendChild(kontKnjige);
        
        for(let i=0; i<this.trBr;i++){
            this.prikazKnjige(kontKnjige);
        }
    }

    prikazKnjige(host)
    {
        const prikazKnjige = document.createElement("div");
        prikazKnjige.className = "prikazKnjige";
        host.appendChild(prikazKnjige);

        prikazKnjige.style.width = 1/this.maxBr*100 + "%";
        
        let knjiga = new Knjiga(0,"", "", 0 );
        this.dodajKnjigu(knjiga);
        knjiga.crtajKnjigu(prikazKnjige);
        
        this.knjige.forEach(element => {
            element.polica = this;
        });
    }

    crtajPolicu(host){
        
        this.srednjiKontejner = document.createElement("div");
        this.srednjiKontejner.className = "srednjiKontejner";
        host.appendChild(this.srednjiKontejner);

        //prvo crtamo oznaku, sadrzaj ove labele je oznaka police 
        var labela = document.createElement("label");
        labela.innerHTML = this.oznaka;
        labela.className = "oznakaPolice";
        this.srednjiKontejner.appendChild(labela);

        //polica - niz knjiga
        this.pomocniKontejner = document.createElement("span");
        this.pomocniKontejner.className = "pomocniKontejner";
        this.srednjiKontejner.appendChild(this.pomocniKontejner);
        this.crtajKnjige(this.pomocniKontejner);

        console.log("Sirina police iz klase polica");
        console.log(this.pomocniKontejner.style.width);
        this.sirina = this.pomocniKontejner.style.width;

        // trBr/maxBr
        labela = document.createElement("label");
        labela.innerHTML = `${this.trBr}/${this.maxBr}`;
        labela.className = "odnos";
        this.srednjiKontejner.appendChild(labela);

    }

    azurirajPolicu(trBr, naziv, autor, brStrana){

        console.log("ovo je this.trBr:");
        console.log(this.trBr);
        console.log("ovo je trBr:");
        console.log(trBr);
        console.log(naziv);
        console.log(autor);
        console.log(brStrana);
       
       
        /*if(trBr >= this.maxBr)
            alert("Na policu ne moze stati vise knjiga!");
        else{
            trBr++;*/

            this.trBr = trBr;
        
            //azuriramo prikaz trBr na polici
            this.srednjiKontejner.querySelector(".odnos").innerHTML = `${this.trBr}/${this.maxBr}`;
            
            this.prikazKnjige(this.pomocniKontejner);

            

            if(this.trBr -1 >= 0){ //ima smisla azurirati knjigu samo ako je trenutni broj knjiga na polici veci od 0
                let i = this.trBr -1; // i je redni broj knjige
                this.knjige[i].azurirajKnjigu(naziv, autor, brStrana);
            }
        

    }
}