const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'ksub',
  brokers: [process.env.KAFKA_BROKER]
})

const consumer = kafka.consumer({ groupId: 'ksub' })

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  })
}

run().catch(e => console.error(` ${e.message}`, e))