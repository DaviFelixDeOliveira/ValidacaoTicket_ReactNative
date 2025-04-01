import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Button, Alert, TextInput } from 'react-native';

const App = () => {
  // Const para o tempo inserido pelo usuário
  const [insertTime, insertTimeset] = useState('');
  
  // Const que controla o custo total do ticket
  const [ticketCusto, ticketCustoSet] = useState(0);
  
  // Const para controlar a visibilidade do campo de input de tempo personalizado
  const [inputEnabled, inputEnabledSet] = useState(false);
  
  // Const para tempo acumulado (em segundos)
  const [tempoAcumulado, tempoAcumuladoSet] = useState(0);
  
  // Const para verificar se o cronômetro está ativo
  const [cronometro, cronometroSet] = useState(false);

  // Função chamada ao clicar no botão de 1 minuto (custa R$ 3,00)
  const button1Min = () => {
    ticketCustoSet((timeCusto) => timeCusto + 3); // Add R$ 3,00 ao custo
    addTimeToTimer(1); // Add 1 minuto ao cronômetro
  };

  // Função chamada ao clicar no botão de 2 minutos (custa R$ 5,00)
  const button2Min = () => {
    ticketCustoSet((timeCusto) => timeCusto + 5); // Add R$ 5,00 ao custo
    addTimeToTimer(2); // Add 2 minutos ao cronômetro
  };

  // Função para exibir o campo de input para tempo personalizado
  const exibirInputInserirValor = () => {
    inputEnabledSet(true); // Torna o campo de input visível
  };

  // Função que calcula o custo baseado no tempo inserido pelo usuário
  const calculoButton3 = () => {
    const tempoMinuto = parseInt(insertTime, 10);

    // Verificação se o tempo inserido é um número válido e maior ou igual a 2 minutos
    if (isNaN(tempoMinuto) || tempoMinuto < 2) {
      Alert.alert('Erro', 'O tempo deve ser maior que 2 minutos!');
      return;
    }

    let custo = 5; // Custo base para 2 minutos

    // Se o tempo inserido for maior que 2 minutos, add o custo adicional
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
    ticketCustoSet((timeCusto) => timeCusto + custo);

    // Add o tempo ao cronômetro
    addTimeToTimer(tempoMinuto);

    // Esconde o campo de input de tempo personalizado após calcular o preço
    inputEnabledSet(false);

    // Reseta o valor do campo de input para limpar a tela
    insertTimeset('');
  };

  // Função que add o tempo ao cronômetro (em minutos)
  const addTimeToTimer = (tempoMinuto) => {
    // Converte minutos para segundos e soma ao tempo acumulado
    tempoAcumuladoSet(tempo => tempo + tempoMinuto * 60);

    // Se o cronômetro não estiver ativo, inicia o cronômetro
    if (!cronometro) {
      iniciarTempo();
    }
  };

  // Função que inicia o cronômetro
  const iniciarTempo = () => {
    cronometroSet(true); // Marca o cronômetro como ativo

    // Define um intervalo para atualizar o cronômetro a cada segundo
    const intervaloTempo = setInterval(() => {
      tempoAcumuladoSet(tempo => {
        // Quando o tempo acumulado atinge 0, para o cronômetro
        if (tempo <= 0) {
          clearInterval(intervaloTempo); // Para o cronômetro
          cronometroSet(false); // Marca o cronômetro como inativo
          return tempo;
        }
        return tempo - 1; // Decrementa 1 segundo
      });
    }, 1000); // Atualiza o cronômetro a cada 1 segundo
  };

  // Função para formatar o tempo acumulado (em segundos) para minutos e segundos
  const formatarTempo = (tempoSegundos) => {
    const minutos = Math.floor(tempoSegundos / 60);
    const segundos = tempoSegundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  };

  // Função para fechar o campo de input
  const fecharInput = () => {
    inputEnabledSet(false); // Fecha o campo de input
    insertTimeset(''); // Limpa o valor do input
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Validação de Tickets</Text>

      {/* Botões para selecionar os tickets de 1 e 2 minutos */}
      <Button title="1 Minuto - R$ 3,00" onPress={button1Min} />
      <Button title="2 Minutos - R$ 5,00" onPress={button2Min} />
      
      {/* Botão para exibir o campo de input para tempo personalizado */}
      <Button title="Tempo Indeterminado" onPress={exibirInputInserirValor} />

      {/* Campo de input visível apenas quando o usuário escolhe o tempo personalizado */}
      {inputEnabled && (
        <View style={styles.inputContainer}>
          <Text>Digite o tempo desejado (em minutos):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric" // Restringe o input para números
            value={insertTime} // Valor do campo de input controlado pelo state
            onChangeText={insertTimeset} // Atualiza o state quando o usuário digita algo
          />
          {/* Botões para calcular o custo e fechar o input */}
          <Button title="Calcular" onPress={calculoButton3} />
          <Button title="Fechar" onPress={fecharInput} color="red" />
        </View>
      )}

      {/* Exibe o cronômetro com o tempo acumulado */}
      <Text style={styles.timeText}>
        Tempo Acumulado: {formatarTempo(tempoAcumulado)}
      </Text>

      {/* Exibe o custo total calculado */}
      <Text style={styles.timeText}>
        Custo Total: R$ {ticketCusto.toFixed(2)}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    fontSize: 16,
  },
  timeText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
