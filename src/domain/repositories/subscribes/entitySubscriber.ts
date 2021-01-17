import { Logger } from "@nestjs/common";
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

@EventSubscriber()
export class EntitySubscriber implements EntitySubscriberInterface<any> {
  constructor(
    connection: Connection,
    private readonly logger: Logger,
  ) {
    connection.subscribers.push(this);
  }

  /**
   * 在实体插入之前调用。
   */
  beforeInsert(event: InsertEvent<any>) {
    this.logger.debug('beforeInsert start', this.beforeInsert.name);
    event.entity.createTime = new Date();
    this.logger.debug('beforeInsert end', this.beforeInsert.name)
  }
}