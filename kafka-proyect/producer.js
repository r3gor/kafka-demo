
const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092']
})
 
const producer = kafka.producer()

//Datos de entrada
const topicName = 'Prueba15'
const part = 0

//Pido valor por consola (el primer argumento por consola)
const msg = process.argv[2];

const produceMessage = async() =>{
    console.log(msg);
    
    try{
        await producer.send({
            "topic" : topicName,
            "messages": [
              //{ key: 'key1', value: 'hello world', partition: 0 }
              { 
                "value": msg, 
                "partition":part
              },
            ],
          })
    }catch (error){
        console.log(error)
    }
}

const run = async () => {
  // Producing
  await producer.connect()
  //setInterval(produceMessage, 1000)
  produceMessage();
  console.log()
}


run().catch(console.error)
