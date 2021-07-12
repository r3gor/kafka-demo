import { kafkaClient } from './client.js';

export const consumer = kafkaClient.consumer({
    groupId: 'consumer-group'
});

export const consume = async (topic_name, callback) => {

    await consumer.connect();

    await consumer.subscribe({
        topic: topic_name,
        fromBeginning: true
    });

    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = {
                topic, partition,
                offset: message.offset,
                message: message.value.toString(),
            };
            console.log(data);
            callback(data);
        }
    });

    // consumer.seek({ topic: topic_name, partition: 0, offset: 0 })
}