import { ConnectionOptions, DefaultJobOptions } from "bullmq"; 
export const queueConfig: ConnectionOptions = {
  host: process.env.REDIS_HOST || " localhost",  // Redis host
    port: parseInt(process.env.REDIS_PORT || "6379"), // Redis port
}

export const defaultQueueOptions: DefaultJobOptions = {
    removeOnComplete: {
        count:20,
        age: 60 * 60
    },
    attempts: 3,
    backoff: {
        type: 'exponential',
        delay: 3000
    },
    removeOnFail: false,
}
