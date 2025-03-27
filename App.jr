import React, {useState} from 'react';
import  {ScrollView, StyleSheet, View, Text, Button} from 'react-native';

const App = () => {
 
// const para o comportamento dos botões
// 3 botão tempo indeterminado
const [inserirTempo, inserirTempoSet] = useState ('');
// const para o input de inserir tempo
const [insertTIme, insertTImeSet] = useState ('');



// const para o tempo dos botões (falso pois só aparece quando aperta o terceiro botão)
const [timeButton, timeButtonSet] = useState (false);



// constantes para cada tipo de botão


  const button1Min = () => {
    setTotalCost(3); 
  };

  // Função que é chamada quando o usuário clica no botão de 2 minutos
  // O custo de 2 minutos é fixo em R$ 5,00
  const handleTwoMinutesTicket = () => {
    setTotalCost(5); // 2 minutos custam R$ 5,00
  };

  // Função que exibe o campo de input para o usuário inserir o tempo desejado
  const handleCustomTimeTicket = () => {
    setInputVisible(true); // Torna o campo de input visível
  };





const calcularValor = () => {
  
}



return (
    <View style={styles.container}>
      <Text style={styles.header}>Validação de Tickets</Text>
 
      <View style={styles.buttonContainer}>
        <Button title=" Ticket - 1 Minuto" onPress = {ticket1Min} />
        <Button title=" Prioritário"  />
        <Button title=" Alta Prioridade"  />
      </View>
 
       
       
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Valor: {} R$</Text>
        </View>
         
     
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },


  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';

export default function TicketValidationApp() {
  // Estado para controlar o tempo personalizado inserido pelo usuário
  const [customTime, setCustomTime] = useState('');

  // Estado para controlar o custo total do ticket
  const [totalCost, setTotalCost] = useState(0);

  // Estado para controlar a visibilidade do campo de input de tempo personalizado
  const [isInputVisible, setInputVisible] = useState(false);

  // Função que é chamada quando o usuário clica no botão de 1 minuto
  // O custo de 1 minuto é fixo em R$ 3,00
  const handleOneMinuteTicket = () => {
    setTotalCost(3); // 1 minuto custa R$ 3,00
  };

  // Função que é chamada quando o usuário clica no botão de 2 minutos
  // O custo de 2 minutos é fixo em R$ 5,00
  const handleTwoMinutesTicket = () => {
    setTotalCost(5); // 2 minutos custam R$ 5,00
  };

  // Função que exibe o campo de input para o usuário inserir o tempo desejado
  const handleCustomTimeTicket = () => {
    setInputVisible(true); // Torna o campo de input visível
  };

  // Função que lida com o cálculo do custo quando o usuário insere o tempo personalizado
  const handleTimeInput = () => {
    // Converte o valor inserido no campo para um número inteiro
    const timeInMinutes = parseInt(customTime, 10);

    // Verifica se o tempo inserido é um número válido e maior ou igual a 2 minutos
    if (isNaN(timeInMinutes) || timeInMinutes < 2) {
      // Exibe uma mensagem de erro caso o valor seja inválido ou menor que 2 minutos
      Alert.alert('Erro', 'O tempo deve ser maior que 2 minutos!');
      return; // Interrompe a execução se o valor não for válido
    }

    let cost = 5; // O custo dos primeiros 2 minutos é fixo em R$ 5,00

    // Se o tempo inserido for maior que 2 minutos, calcula o custo adicional
    if (timeInMinutes > 2) {
      const additionalMinutes = timeInMinutes - 2;
      cost += additionalMinutes * 1.5; // Cada minuto adicional custa R$ 1,50
    }

    // Calcula o desconto baseado no tempo inserido
    // A cada 10 minutos adicionais, o custo por minuto diminui 5%
    const discountMultiplier = Math.floor(timeInMinutes / 10) * 0.05;
    cost *= (1 - discountMultiplier); // Aplica o desconto ao custo total

    // Verifica se o tempo inserido é superior ao limite de 30 minutos
    if (timeInMinutes > 30) {
      // Exibe uma mensagem de erro caso o tempo seja superior a 30 minutos
      Alert.alert('Erro', 'O limite de tempo por cliente é de 30 minutos!');
      return; // Interrompe a execução caso o tempo ultrapasse o limite
    }

    // Atualiza o custo total do ticket com as regras aplicadas
    setTotalCost(cost.toFixed(2)); // Formata o custo para duas casas decimais

    // Esconde o campo de input de tempo personalizado após calcular o preço
    setInputVisible(false);

    // Reseta o valor do campo de input para limpar a tela
    setCustomTime('');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Validação de Tickets</Text>

      {/* Botões para selecionar os tickets de 1 e 2 minutos */}
      <Button title="1 Minuto - R$ 3,00" onPress={handleOneMinuteTicket} />
      <Button title="2 Minutos - R$ 5,00" onPress={handleTwoMinutesTicket} />
      
      {/* Botão para exibir o campo de input para tempo indeterminado */}
      <Button title="Tempo Indeterminado" onPress={handleCustomTimeTicket} />

      {/* Campo de input visível apenas quando o usuário escolhe o tempo personalizado */}
      {isInputVisible && (
        <View style={{ marginTop: 20 }}>
          <Text>Digite o tempo desejado (em minutos):</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 8,
              marginVertical: 10,
              fontSize: 16,
            }}
            keyboardType="numeric" // Restringe o input para números
            value={customTime} // Valor do campo de input controlado pelo state
            onChangeText={setCustomTime} // Atualiza o state quando o usuário digita algo
          />
          {/* Botão que aciona o cálculo do custo ao clicar */}
          <Button title="Calcular" onPress={handleTimeInput} />
        </View>
      )}

      {/* Exibe o custo total calculado */}
      <Text style={{ marginTop: 20, fontSize: 18 }}>
        Custo Total: R$ {totalCost}
      </Text>
    </View>
  );
}
    marginBottom: 30,

  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#00FF00',
    borderRadius: 5,
  },
  result: {
    fontSize: 18,
    fontWeight: '500',
  },
});



export default App; //Exportar o aplicativo
