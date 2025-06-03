import amqp from "amqplib";

export type AmqpConnection = Awaited<ReturnType<typeof amqp.connect>>;
export type AmqpChannel = Awaited<ReturnType<AmqpConnection["createChannel"]>>;