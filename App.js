import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';

const App = () => {
  // const do tempo  inserido pelo usuário
  const [insertTime, insertTimeset] = useState('');

  // const que controla o custo total do ticket
  const [ticketCusto, ticketCustoSet] = useState(0);

  // const para apareçer  o campo de input de tempo personalizado
  const [inputEnabled, inputEnabledSet] = useState(false);

  // const para tempo acumulado
  const [tempoAcumulado, tempoAcumuladoSet] = useState(0);

  // const cronometro ativo
  const [cronometro, cronometroSet] = useState(false);

  // const dos botões

  const button1Min = () => {
    ticketCustoSet((timeCusto) => timeCusto + 3); // add 3 no valor cada vez que é apertado
    addTimeToTimer (1); // add 1 minuto ao cronômetro
  };

  const button2Min = () => {
    ticketCustoSet((timeCusto) => timeCusto + 5); // add 5 no valor cada vez que é apertado
    addTimeToTimer (2); // Adiciona 2 minuto ao cronômetro
  };
  // exibe o input para inserir o valor desejado
  const exibirInputInserirValor = () => {
    inputEnabledSet(true); // Torna o campo de input visível
  };

  const calculoButton3 = () => {
    const tempoMinuto = parseInt(insertTime, 10);
    // Verificação se o tempo inserido é um número válido e maior ou igual a 2 minutos
    if (isNaN(tempoMinuto) || tempoMinuto < 2) {
      Alert.alert('Erro', 'O tempo deve ser maior que 2 minutos!');
      return;
    }

    let custo = 5; 

    if (tempoMinuto > 2) {
      const addTempo = tempoMinuto - 2;
      custo += addTempo * 1.5; // Cada minuto adicional custa R$ 1,50
    }

    // A cada 10 minutos adicionais, o custo por minuto diminui 5%
    const desconto10min = Math.floor(tempoMinuto / 10) * 0.05;
    custo *= 1 - desconto10min; // Aplica o desconto ao custo total

    // Verifica se o tempo inserido é superior ao limite de 30 minutos
    if (tempoMinuto > 30) {
      Alert.alert('Erro', 'O limite de tempo por cliente é de 30 minutos!');
      return;
    }

    // Atualiza o custo total do ticket com as regras aplicadas
    ticketCustoSet((timeCusto) => timeCusto + custo); // Adiciona ao custo total

    // Adiciona o tempo ao cronômetro
    addTimeToTimer (tempoMinuto);

    // Esconde o campo de input de tempo personalizado após calcular o preço
    inputEnabledSet(false);

    // Reseta o valor do campo de input para limpar a tela
    setCustomTime('');
  };

  // Função que adiciona o tempo ao cronômetro
  const addTimeToTimer  = (tempoMinuto) => {
    // Converte minutos para segundos e soma ao tempo acumulado
    tempoAcumuladoSet(prevTime => prevTime + tempoMinuto * 60);
    if (!isTimerRunning) {
      startTimer(); // Inicia o cronômetro se não estiver rodando
    }
  };


};

export default App; //Exportar o aplicativo
