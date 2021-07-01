const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092']
})
 
const producer = kafka.producer()
const topic = 'numbers'

const produceMessage = async() =>{
    const value = 'Hola';
    console.log(value);
    
    try{
        await producer.send({
            topic,
            messages: [
              { value: value , partition: 1},
            ],
          })
    }catch (error){
        console.log(error)
    }
}

const run = async () => {
  // Producing
  await producer.connect()
  setInterval(produceMessage, 1000)
  console.log()
}


run().catch(console.error)