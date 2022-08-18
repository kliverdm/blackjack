(() => {
    //'use strict'

    let deck    = [], puntosJugadores = [];
    const tipos = ['C', 'D', 'H', 'S'], especiales = ['A','J','Q','K'];
    
    //REFERENCIAS HTML
    const btnPedir       = document.querySelector('#btnPedir'),
    btnDetener           = document.querySelector('#btnDetener'),
    btnNuevoJuego        = document.querySelector('#btnNuevoJuego'),
    puntosHTML           = document.querySelectorAll('small'),
    divCartasJugadores   = document.querySelectorAll('.divCartas');

    //INICIALIZAR EL JUEGO
    const iniciarJuego =(numeroJugador = 2)=> {
        deck = crearDeck();
        puntosJugadores = [];
        for(let i = 0; i < numeroJugador; i++){
            puntosJugadores.push(0);
        }
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        puntosHTML.forEach(elem => elem.innerText = 0);
        btnPedir.disabled = false;
        btnDetener.disabled = false;    
        
    }
     
    //CREAR NUEVA MANO
    const crearDeck =()=> {
        deck = [];  
        for (i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for(let tipo of tipos){
            for(let especial of especiales){
                deck.push(especial + tipo);
            }
        }
        return _.shuffle( deck );
    };

    //TOMAR CARTA
    const pedirCarta =()=> {
        if(deck.length === 0){
            throw 'No hay cartas'
        }
        return deck.pop();
    }

    const valorCarta =(carta)=> {
        const valor = carta.substring(0, carta.length-1);
        return ( isNaN(valor) ) ? ( valor === 'A' ) ? 11 : 10 : valor*1;
    }

    const acumularPuntos = ( carta, turno ) => {
    puntosJugadores[turno] = puntosJugadores[turno]  + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement( 'img' );
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add( 'carta' );
        divCartasJugadores[ turno ].append( imgCarta );
    }

    //  DETERMINAR GANADOR
    const determinarGanador =( puntosComputadora, puntosMinimos )=> {
       
        setTimeout(()=>{
            ( puntosComputadora <= 21 && puntosComputadora > puntosMinimos || puntosMinimos > 21) ? alert( 'Perdiste' ) :
            ( puntosMinimos <= 21 && puntosMinimos > puntosComputadora || puntosComputadora > 21) ? alert( '¡Ganaste!' ) :
            alert('Empate');
        }, 50);
    }

    //TURNO COMPUTADORA
    const turnoComputadora =(puntosMinimos)=>{

        let puntosComputadora = 0;    
        const pJL = puntosJugadores.length-1; 
    do {
        const carta   =  pedirCarta();
        puntosComputadora = acumularPuntos( carta, pJL );
        crearCarta( carta, pJL );
    }
    while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    determinarGanador(puntosComputadora, puntosMinimos);
    }

    //EVENTOS
    btnPedir.addEventListener('click', ()=>{
    const carta   =  pedirCarta();
    const puntosJugador =  acumularPuntos( carta, 0 );
    crearCarta( carta, 0 );
        
    if(puntosJugador > 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
    if(puntosJugador === 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true; 
        turnoComputadora(puntosJugador);
    }
    
    });

    //DETENER
    btnDetener.addEventListener('click', ()=>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    //NUEVO JUEGO
    btnNuevoJuego.addEventListener('click', ()=>{
        
        iniciarJuego();
        
    });

})();


