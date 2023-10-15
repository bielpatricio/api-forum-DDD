import { Notification } from '../../enterprise/entities/notification'

export interface NotificationRepository {
  findById(id: string): Promise<Notification | null>
  // findBySlug(slug: string): Promise<Notification | null>
  save(notification: Notification): Promise<void>
  create(notification: Notification): Promise<void>
  // delete(notification: Notification): Promise<void>
  // findManyRecent(params: PaginationParams): Promise<Notification[]>
}
