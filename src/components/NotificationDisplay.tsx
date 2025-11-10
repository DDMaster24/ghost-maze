import { useNotificationStore } from '../stores/notificationStore'

function NotificationDisplay() {
  const notifications = useNotificationStore((state) => state.notifications)
  const removeNotification = useNotificationStore((state) => state.removeNotification)

  const getNotificationStyle = (type: string) => {
    const baseStyle = {
      padding: '12px 20px',
      marginBottom: '10px',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      border: '2px solid',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      animation: 'slideIn 0.3s ease-out',
    }

    switch (type) {
      case 'success':
        return { ...baseStyle, background: '#10b981', borderColor: '#059669', color: '#fff' }
      case 'warning':
        return { ...baseStyle, background: '#f59e0b', borderColor: '#d97706', color: '#fff' }
      case 'danger':
        return { ...baseStyle, background: '#ef4444', borderColor: '#dc2626', color: '#fff' }
      default:
        return { ...baseStyle, background: '#3b82f6', borderColor: '#2563eb', color: '#fff' }
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '100px',
        right: '20px',
        zIndex: 1000,
        maxWidth: '300px',
      }}
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={getNotificationStyle(notification.type)}
          onClick={() => removeNotification(notification.id)}
        >
          {notification.message}
        </div>
      ))}
    </div>
  )
}

export default NotificationDisplay
