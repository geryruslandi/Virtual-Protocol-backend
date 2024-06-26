import { MessageBrokerService } from '@libs/message-broker';
import { QUEUE_NAMES } from '@libs/message-broker/message-broker.enum';
import { NestFactory } from '@nestjs/core';
import { SchedulerModule } from '@scheduler/scheduler.module';

async function bootstrap() {
  const app = await NestFactory.create(SchedulerModule);
  const messageBroker = app.get<MessageBrokerService>(MessageBrokerService);

  app.connectMicroservice(
    messageBroker.getRmqOptions(QUEUE_NAMES.CANDIDATE_GENERATOR_QUEUE),
  );

  await app.startAllMicroservices();
}
bootstrap();
