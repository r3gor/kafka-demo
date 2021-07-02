const { Kafka } = require('kafkajs')

var topicName = "Prueba"
var partitions = 2

async function run(){
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
                topic: topicName,
                numPartitions: partitions
            }]
        })
        console.log("Topico creado")
        await admin.disconnect();
    }
    catch(ex){
        console.error(ex)
    }
}

run();