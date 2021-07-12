import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
  });

//ADMIN (Ver Topicos)
const k_admin = kafka.admin();

const k_admin_run = async () => {
  await k_admin.connect();

  var partitions = await k_admin.fetchTopicMetadata();
  console.log(partitions);
  
  await k_admin.disconnect();
};

/////////////////////////////////////////////////////////
//PRODUCER
const k_producer = kafka.producer()

//Datos de entrada
const topicName = 'Prueba'
//const part = 0


//const produceMessage = async(msg, k_part) =>{
const produceMessage = async(msg, k_part) =>{
    console.log("mensaje de produceMessage ", msg);
    
    try{
        await k_producer.send({
            "topic" : topicName,
            "messages": [
              //{ key: 'key1', value: 'hello world', partition: 0 }
              { 
                "value": msg, 
                "partition":k_part
              },
            ],
          })
    }catch (error){
        console.log(error)
    }
}

const k_producer_run = async (k_key,tecla) => {
  console.log("flag prod 1");
  // Producing
  await k_producer.connect()
  //setInterval(produceMessage, 1000)
  produceMessage("Tecla presionada: " + tecla, k_key);
  //await k_producer.disconnect();
}

///////////////////////////////////////////////////////////
//CONSUMER
const k_consumer = kafka.consumer({groupId: 'consumer-group'}) 
const k_consumer_run = async () => {
  // Consuming
  await k_consumer.connect()
  await k_consumer.subscribe({ topic: topicName, fromBeginning: true })
  
  await k_consumer.run({
      eachMessage: async ({topic, partition, message}) => {
          console.log({
              partition,
              value: message.value.toString(),
          })
      },
  })
  //await k_consumer.disconnect();
}

///////////////////////////////////////////////////////////
//TOPIC

var newTopic = "Prueba"
var newPartitions = 15

async function k_topic_run(){
  try{
      const kafka = new Kafka({
          clientId: 'my-app',
          brokers: ['localhost:9092']
      })

      const admin = kafka.admin();
      console.log("Connecting..")
      await admin.connect()

      await admin.createTopics({
          topics : [{
              topic: newTopic,
              numPartitions: newPartitions
          }]
      })
      console.log("Topico creado")
      await admin.disconnect();
  }
  catch(ex){
      console.error(ex)
  }
}

///////////////////////////////////////////////////////////

  //k_producer_run().catch(console.error)
  //k_consumer_run().catch(console.error)
  //k_topic_run().catch(console.error)

export { k_producer_run, k_consumer_run} 