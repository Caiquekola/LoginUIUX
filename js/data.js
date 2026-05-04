// js/data.js

    localStorage.setItem('usuarios', JSON.stringify([ 
        {id:1,name: 'Admin', email: 'admin@admin.com', password: 'admin123'}
     ]));


const eventosMock = [
    {
        id: 1,
        titulo: "Workshop de Sistemas de Informação (WSI)",
        data: "2026-05-15T19:00:00",
        local: "Auditório Principal - IFMG",
        descricao: "Explorando as fronteiras da IHC e IA.",
        imagem: "imgs/wsi.png",
        categoria: "Acadêmico",
        categorias: [
            { id: "std", nome: "Normal", preco: 50.00 },
            { id: "vip", nome: "Área VIP", preco: 120.00 }
        ],
        // Matriz de assentos: null = corredor, objeto = assento com {disponivel, categoriaId}
        // Categorias: "std" = Normal, "vip" = Área VIP
        mapaAssentos: [
            [{disponivel: true, categoriaId: "vip"}, {disponivel: true, categoriaId: "vip"}, null, {disponivel: true, categoriaId: "std"}, {disponivel: true, categoriaId: "std"}],
            [{disponivel: true, categoriaId: "vip"}, {disponivel: false, categoriaId: "vip"}, null, {disponivel: true, categoriaId: "std"}, {disponivel: true, categoriaId: "std"}],
            [{disponivel: true, categoriaId: "std"}, {disponivel: true, categoriaId: "std"}, null, {disponivel: false, categoriaId: "std"}, {disponivel: false, categoriaId: "std"}],
            [{disponivel: false, categoriaId: "std"}, {disponivel: true, categoriaId: "std"}, null, {disponivel: true, categoriaId: "std"}, {disponivel: true, categoriaId: "std"}]
        ]
    },
    {
        id: 2,
        titulo: "Festival Barreiros Rievers - Edição de Inverno",
        data: "2026-07-20T20:00:00",
        local: "Praça de Eventos",
        descricao: "Música, arte e gastronomia com artistas locais e atrações nacionais.",
        imagem: "imgs/festivalBarreiro.jpg",
        categoria: "Música",
        categorias: [
            { id: "std", nome: "Pista", preco: 80.00 },
            { id: "vip", nome: "Camarote", preco: 200.00 }
        ],
        // Matriz de assentos com categorias: "std" = Pista, "vip" = Camarote
        mapaAssentos: [
            [{disponivel: true, categoriaId: "vip"}, {disponivel: true, categoriaId: "vip"}, {disponivel: true, categoriaId: "vip"}, null, {disponivel: true, categoriaId: "std"}, {disponivel: true, categoriaId: "std"}, {disponivel: true, categoriaId: "std"}],
            [{disponivel: false, categoriaId: "vip"}, {disponivel: true, categoriaId: "vip"}, {disponivel: true, categoriaId: "vip"}, null, {disponivel: true, categoriaId: "std"}, {disponivel: false, categoriaId: "std"}, {disponivel: true, categoriaId: "std"}],
            [{disponivel: true, categoriaId: "std"}, {disponivel: true, categoriaId: "std"}, {disponivel: false, categoriaId: "std"}, null, {disponivel: true, categoriaId: "std"}, {disponivel: true, categoriaId: "std"}, {disponivel: true, categoriaId: "std"}]
        ]
    },
    {
        id: 3,
        titulo: "Campeonato de Robótica: Mini Sumô 500g",
        data: "2025-10-10T14:00:00", // Evento passado
        local: "Ginásio Poliesportivo",
        descricao: "A maior batalha de robôs da região. Venha torcer pela sua equipe favorita!",
        imagem: "imgs/robotica.jpg",
        categoria: "Robótica",
        categorias: [
            { id: "std", nome: "Arquibancada", preco: 20.00 }
        ],
        // Matriz de assentos (apenas categoria padrão)
        mapaAssentos: [
            [{disponivel: false, categoriaId: "std"}, {disponivel: false, categoriaId: "std"}, null, {disponivel: false, categoriaId: "std"}, {disponivel: false, categoriaId: "std"}],
            [{disponivel: false, categoriaId: "std"}, {disponivel: false, categoriaId: "std"}, null, {disponivel: false, categoriaId: "std"}, {disponivel: false, categoriaId: "std"}]
        ]
    }
];

const ingressosMock = [
    {
        idCompra: "ABC-123",
        eventoId: 3, 
        categoria: "Arquibancada",
        assento: "A1",
        dataCompra: "2025-09-15",
        qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
        usuarioId: "mock_user"
    }
];

// Inicialização e Persistência

let ingressos_globais = JSON.parse(localStorage.getItem('ingressos_globais'));
if (!ingressos_globais) {
    ingressos_globais = [...ingressosMock];
    localStorage.setItem('ingressos_globais', JSON.stringify(ingressos_globais));
}

let mapas_assentos_alterados = JSON.parse(localStorage.getItem('mapas_assentos_alterados'));
if (!mapas_assentos_alterados) {
    mapas_assentos_alterados = {};
    localStorage.setItem('mapas_assentos_alterados', JSON.stringify(mapas_assentos_alterados));
}

// Aplicar assentos ocupados
const eventos = eventosMock.map(evento => {
    const eventoAlterado = { ...evento, mapaAssentos: evento.mapaAssentos.map(fila => [...fila]) };
    const ocupados = mapas_assentos_alterados[evento.id] || [];
    
    ocupados.forEach(label => {
        // Encontrar a posição na matriz a partir do label (ex: "A1")
        const rowIndex = label.charCodeAt(0) - 65; // 'A' é 65
        const colIndex = parseInt(label.substring(1)) - 1;
        
        if (eventoAlterado.mapaAssentos[rowIndex] !== undefined && eventoAlterado.mapaAssentos[rowIndex][colIndex] !== undefined) {
            eventoAlterado.mapaAssentos[rowIndex][colIndex] = false; // ocupado
        }
    });
    
    return eventoAlterado;
});

// Meus Ingressos da sessão atual
const usuarioLogado = JSON.parse(localStorage.getItem('sessao_ativa'));
let meusIngressos = [];
if (usuarioLogado) {
    meusIngressos = ingressos_globais.filter(i => i.usuarioId === usuarioLogado.id);
}
