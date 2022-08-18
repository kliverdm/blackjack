let deck=[],puntosJugadores=[];const tipos=["C","D","H","S"],especiales=["A","J","Q","K"],btnPedir=document.querySelector("#btnPedir"),btnDetener=document.querySelector("#btnDetener"),btnNuevoJuego=document.querySelector("#btnNuevoJuego"),puntosHTML=document.querySelectorAll("small"),divCartasJugadores=document.querySelectorAll(".divCartas"),iniciarJuego=(b=2)=>{deck=crearDeck(),puntosJugadores=[];for(let a=0;a<b;a++)puntosJugadores.push(0);divCartasJugadores.forEach(a=>a.innerHTML=""),puntosHTML.forEach(a=>a.innerText=0),btnPedir.disabled=!1,btnDetener.disabled=!1},crearDeck=()=>{for(i=2,deck=[];i<=10;i++)for(let a of tipos)deck.push(i+a);for(let b of tipos)for(let c of especiales)deck.push(c+b);return _.shuffle(deck)},pedirCarta=()=>{if(0===deck.length)throw"No hay cartas";return deck.pop()},valorCarta=b=>{let a=b.substring(0,b.length-1);return isNaN(a)?"A"===a?11:10:1*a},acumularPuntos=(b,a)=>(puntosJugadores[a]=puntosJugadores[a]+valorCarta(b),puntosHTML[a].innerText=puntosJugadores[a],puntosJugadores[a]),crearCarta=(b,c)=>{let a=document.createElement("img");a.src=`assets/cartas/${b}.png`,a.classList.add("carta"),divCartasJugadores[c].append(a)},determinarGanador=(a,b)=>{setTimeout(()=>{a<=21&&a>b||b>21?alert("Perdiste"):b<=21&&b>a||a>21?alert("\xa1Ganaste!"):alert("Empate")},50)},turnoComputadora=a=>{let b=0,c=puntosJugadores.length-1;do{let d=pedirCarta();b=acumularPuntos(d,c),crearCarta(d,c)}while(b<a&&a<=21)determinarGanador(b,a)};btnPedir.addEventListener("click",()=>{let b=pedirCarta(),a=acumularPuntos(b,0);crearCarta(b,0),a>21&&(btnPedir.disabled=!0,btnDetener.disabled=!0,turnoComputadora(a)),21===a&&(btnPedir.disabled=!0,btnDetener.disabled=!0,turnoComputadora(a))}),btnDetener.addEventListener("click",()=>{btnPedir.disabled=!0,btnDetener.disabled=!0,turnoComputadora(puntosJugadores[0])}),btnNuevoJuego.addEventListener("click",()=>{iniciarJuego()})