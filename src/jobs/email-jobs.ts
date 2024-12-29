import {Job, Queue, Worker} from 'bullmq';
import { defaultQueueOptions, queueConfig } from '../config/queue';

export const emailQueueName = 'email';
export const emailQueue = new Queue(emailQueueName, {
    connection: queueConfig,
    defaultJobOptions: defaultQueueOptions
});

//  worker to process the email queue
export const emailWorker = new Worker(emailQueueName, async (job:Job) => {
    console.log(`Processing email job with data: ${job.data}`);

    // send email 
    return job.data;
});