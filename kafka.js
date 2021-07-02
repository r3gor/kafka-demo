import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
  });

const k_admin = kafka.admin();

const k_admin_run = async () => {
    await admin.connect();

    var partitions = await admin.fetchTopicMetadata();
    console.log(partitions);
    
    await k_admin.disconnect();
  };

export {k_admin, k_admin_run} 