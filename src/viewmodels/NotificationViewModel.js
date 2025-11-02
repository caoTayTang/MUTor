import { getNotifications } from "../api/api";

export class NotificationViewModel {
    notifications = [];

    async loadNotifications() {
        this.notifications = await getNotifications();
    }
}
