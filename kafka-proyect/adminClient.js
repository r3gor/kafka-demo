const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
  })

const admin = kafka.admin()


//admin.deleteTopics({
//    "topics": ["topic1"]
//})


const run = async () => {
    await admin.connect()

    //console.log(await admin.listTopics())
    var partitions = await admin.fetchTopicMetadata()
    console.log(partitions)
    
    await admin.disconnect()
  }
   
run().catch(console.error)
