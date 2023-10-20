const notifications = ["Notification 1",
                        "Notification 2",
                        "Notification shsuih siudsd sbsidbs sbush",
                        'Notification 4',
                        "Notification 5",
                        "Notification 6",
                        "Notification 1",
                        "Notification 2",
                        "Notification shsuih siudsd sbsidbs sbush",
                        'Notification 4',
                        "Notification 5",
                        "Notification 6",
                        "Notification 1",
                        "Notification 2",
                        "Notification shsuih siudsd sbsidbs sbush",
                        'Notification 4',
                        "Notification 5",
                        "Notification 6"];

    export function getNotifications() {
        return notifications;
    }

    export function getNotification(id) {
        return notifications.find(em => em.notification_id === id);
    }