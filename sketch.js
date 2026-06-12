// --- CONTROLE DE TELAS (ESTADOS) ---
let telaAtiva = 0; // 0: Tela Inicial | 1: Simulador Ativo

// --- VARIÁVEIS DE SISTEMA E INDICADORES ---
let indicadorProducao = 50;
let indicadorAmbiente = 50;
let capitalDisponivel = 1000;
let cicloAtual = 1;
let logMensagem = "Sistema iniciado. Aguardando tomada de decisão do gestor.";

// Variáveis para o Histórico do Gráfico
let historicoProducao = [];
let historicoAmbiente = [];
let maxPontosGrafico = 50; 

function setup() {
  createCanvas(700, 450);
  historicoProducao.push(indicadorProducao);
  historicoAmbiente.push(indicadorAmbiente);
}

function draw() {
  if (telaAtiva === 0) {
    desenharTelaInicial();
  } else if (telaAtiva === 1) {
    desenharSimuladorPrincipal();
  }
}

// ==========================================
// TELA INICIAL: INTRODUÇÃO E DIRETRIZES
// ==========================================
function drawTelaInicial() {
  background("#f4f7f6");
  
  // Faixa Superior Estilizada
  fill("#132a13");
  rect(0, 0, width, 80);
  
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  textStyle(BOLD);
  text("PROJETO AGRIHO + ALURA", width / 2, 40);
  
  // Painel de Conteúdo Acadêmico
  fill(255);
  stroke("#e5e7eb");
  rect(50, 110, 600, 240, 8);
  
  // Textos Informativos
  noStroke();
  fill("#111827");
  textSize(15);
  textStyle(BOLD);
  text("Tema: Agro Forte, Futuro Sustentável", width / 2, 140);
  text("Equilíbrio entre Produção e Meio Ambiente", width / 2, 160);
  
  fill("#374151");
  textStyle(NORMAL);
  textSize(12);
  textAlign(CENTER);
  
  let justificativa = "Este software simula um painel de tomada de decisões estratégicas para uma propriedade rural. " +
                      "O objetivo é demonstrar na prática que o desenvolvimento econômico do ecossistema agrícola " +
                      "(Agro Forte) só se mantém a longo prazo se caminhar em perfeita harmonia com a preservação " +
                      "dos recursos naturais e práticas sustentáveis.";
  text(justificativa, 80, 190, 540, 80); // Texto com quebra automática
  
  // Instruções de Uso
  fill("#059669");
  textStyle(BOLD);
  text("COMO OPERAR O SIMULADOR:", width / 2, 270);
  
  fill("#4b5563");
  textStyle(NORMAL);
  text("1. Monitore os índices de Capacidade Produtiva e Sustentabilidade Ambiental.", width / 2, 295);
  text("2. Utilize os botões de comando inferiores para investir o capital disponível.", width / 2, 315);
  
  // Botão Interativo para Iniciar
  desenharBotaoComando(260, 375, 180, 45, "#132a13", "INICIAR SIMULAÇÃO", "Carregar Dashboard");
}

// Retém a lógica antiga de desenho da tela inicial
function desenharTelaInicial() {
  drawTelaInicial();
}

// ==========================================
// TELA DO SIMULADOR PRINCIPAL
// ==========================================
function desenharSimuladorPrincipal() {
  background("#f4f7f6");
  
  // 1. CABEÇALHO DO DASHBOARD
  fill("#132a13");
  rect(0, 0, width, 60);
  
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(16);
  textStyle(BOLD);
  text("SIMULADOR DE GESTÃO AGROAMBIENTAL SUSTENTÁVEL", 30, 30);
  
  textAlign(RIGHT, CENTER);
  textSize(13);
  textStyle(NORMAL);
  text("Parceria: Agrinho + Alura", width - 30, 30);
  
  // 2. PAINEL DE INDICADORES (KPIs)
  desenharCardInfo(30, 80, 180, 60, "Capital Disponível", "R$ " + capitalDisponivel);
  desenharCardInfo(230, 80, 120, 60, "Ciclo de Produção", "Ano " + cicloAtual);
  
  // Métrica: Eficiência Produtiva (Agro Forte)
  desenharBarraMetrica(380, 80, "Capacidade Produtiva", indicadorProducao, "#d97706");
  
  // Métrica: Índice de Sustentabilidade (Meio Ambiente)
  desenharBarraMetrica(380, 115, "Sustentabilidade Ambiental", indicadorAmbiente, "#059669");

  // 3. ÁREA DE MAPEAMENTO E GRÁFICO EM TEMPO REAL
  fill(255);
  stroke("#e5e7eb");
  strokeWeight(1);
  rect(30, 160, 640, 170, 6);
  
  noStroke();
  fill("#374151");
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(ITALIC);
  text(logMensagem, 50, 175);
  
  desenharGraficoReal();

  // 4. PAINEL DE INTERVENÇÕES ESTRATÉGICAS (BOTÕES)
  desenharBotaoComando(30, 360, 190, 45, "#d97706", "Otimizar Safra", "Custo: R$ 150");
  desenharBotaoComando(255, 360, 190, 45, "#059669", "Reflorestamento/Manejo", "Custo: R$ 200");
  desenharBotaoComando(480, 360, 190, 45, "#2563eb", "Transição Energética", "Custo: R$ 400");
  
  // 5. ANÁLISE DE CONFIGURAÇÃO DE FIM DE CURSO
  if (indicadorProducao <= 0 || indicadorAmbiente <= 0) {
    exibirTelaFinal("COLAPSO DO SISTEMA: Equilíbrio agroambiental rompido.");
  } else if (indicadorProducao >= 100 && indicadorAmbiente >= 100) {
    exibirTelaFinal("EXCELÊNCIA OPERACIONAL: Máxima eficiência e sustentabilidade atingidas!");
  }
  
  // Atualização temporal controlada
  if (frameCount % 180 == 0 && indicadorProducao > 0 && indicadorAmbiente > 0) {
    cicloAtual++;
    indicadorProducao -= 2; 
    indicadorAmbiente -= 3; 
    capitalDisponivel += int(indicadorProducao * 5); 
    
    atualizarHistorico();
  }
}

// --- FUNÇÕES COMPLEMENTARES DE INTERFACE (UI) ---

function desenharCardInfo(x, y, w, h, titulo, valor) {
  fill(255);
  stroke("#e5e7eb");
  rect(x, y, w, h, 4);
  noStroke();
  fill("#6b7280");
  textSize(11);
  textAlign(LEFT, TOP);
  text(titulo, x + 10, y + 10);
  fill("#111827");
  textSize(16);
  textStyle(BOLD);
  text(valor, x + 10, y + 28);
  textStyle(NORMAL);
}

function desenharBarraMetrica(x, y, rotulo, valor, corBarra) {
  fill("#374151");
  textSize(11);
  textAlign(LEFT, CENTER);
  text(rotulo, x, y + 8);
  
  fill("#e5e7eb");
  rect(x + 130, y, 160, 14, 3);
  fill(corBarra);
  rect(x + 130, y, map(valor, 0, 100, 0, 160), 14, 3);
  
  fill("#111827");
  text(int(valor) + "%", x + 300, y + 8);
}

function desenharBotaoComando(x, y, w, h, cor, titulo, subtitulo) {
  fill(cor);
  rect(x, y, w, h, 6);
  fill(255);
  textAlign(CENTER);
  textSize(12);
  textStyle(BOLD);
  text(titulo, x + w/2, y + 18);
  textSize(10);
  textStyle(NORMAL);
  text(subtitulo, x + w/2, y + 34);
}

function desenharGraficoReal() {
  let gX = 80;
  let gY = 210;
  let gW = 540;
  let gH = 100;
  
  stroke("#cbd5e1");
  strokeWeight(1);
  line(gX, gY, gX, gY + gH); 
  line(gX, gY + gH, gX + gW, gY + gH); 
  
  stroke("#f1f5f9");
  line(gX, gY + gH/2, gX + gW, gY + gH/2);
  line(gX, gY, gX + gW, gY);
  
  noStroke();
  fill("#94a3b8");
  textSize(9);
  textAlign(RIGHT, CENTER);
  text("100%", gX - 8, gY);
  text("50%", gX - 8, gY + gH/2);
  text("0%", gX - 8, gY + gH);
  
  if (historicoProducao.length > 1) {
    let passoX = gW / (maxPontosGrafico - 1);
    
    for (let i = 0; i < historicoProducao.length - 1; i++) {
      let x1 = gX + i * passoX;
      let x2 = gX + (i + 1) * passoX;
      
      let yProd1 = map(historicoProducao[i], 0, 100, gY + gH, gY);
      let yProd2 = map(historicoProducao[i+1], 0, 100, gY + gH, gY);
      
      let yAmb1 = map(historicoAmbiente[i], 0, 100, gY + gH, gY);
      let yAmb2 = map(historicoAmbiente[i+1], 0, 100, gY + gH, gY);
      
      stroke("#d97706");
      strokeWeight(2);
      line(x1, yProd1, x2, yProd2);
      
      stroke("#059669");
      strokeWeight(2);
      line(x1, yAmb1, x2, yAmb2);
    }
  }
  noStroke();
}

function atualizarHistorico() {
  historicoProducao.push(indicadorProducao);
  historicoAmbiente.push(indicadorAmbiente);
  
  if (historicoProducao.length > maxPontosGrafico) {
    historicoProducao.shift();
    historicoAmbiente.shift();
  }
}

// --- LÓGICA DE INTERAÇÃO DO USUÁRIO ---
function mousePressed() {
  // Se estiver na Tela Inicial, verifica clique no botão de Iniciar
  if (telaAtiva === 0) {
    if (mouseX > 260 && mouseX < 440 && mouseY > 375 && mouseY < 420) {
      telaAtiva = 1; // Muda para a tela do simulador
    }
    return; // Evita executar os comandos do simulador por acidente
  }

  // Comandos do Simulador (Tela Ativa == 1)
  let acaoExecutada = false;

  if (mouseX > 30 && mouseX < 220 && mouseY > 360 && mouseY < 405) {
    if (capitalDisponivel >= 150) {
      capitalDisponivel -= 150;
      indicadorProducao += 20;
      indicadorAmbiente -= 12;
      logMensagem = "Ação: Expansão de lavoura executada. Aumento na produção detectado; desgaste ambiental registrado.";
      acaoExecutada = true;
    } else { logMensagem = "Alerta: Recursos financeiros insuficientes."; }
  }
  
  if (mouseX > 255 && mouseX < 445 && mouseY > 360 && mouseY < 405) {
    if (capitalDisponivel >= 200) {
      capitalDisponivel -= 200;
      indicadorAmbiente += 25;
      indicadorProducao -= 5;
      logMensagem = "Ação: Implementação de reserva legal e manejo. Conservação do ecossistema em ascensão.";
      acaoExecutada = true;
    } else { logMensagem = "Alerta: Recursos financeiros insuficientes."; }
  }
  
  if (mouseX > 480 && mouseX < 670 && mouseY > 360 && mouseY < 405) {
    if (capitalDisponivel >= 400) {
      capitalDisponivel -= 400;
      indicadorAmbiente += 15;
      indicadorProducao += 10;
      logMensagem = "Ação: Integração de matriz energética renovável. Otimização global de indicadores.";
      acaoExecutada = true;
    } else { logMensagem = "Alerta: Recursos financeiros insuficientes."; }
  }
  
  if (acaoExecutada) {
    indicadorProducao = constrain(indicadorProducao, 0, 100);
    indicadorAmbiente = constrain(indicadorAmbiente, 0, 100);
    atualizarHistorico();
  }
}

function exibirTelaFinal(mensagemFim) {
  fill(19, 42, 19, 240);
  rect(0, 0, width, height);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text(mensagemFim, width/2, height/2);
  noLoop();
}