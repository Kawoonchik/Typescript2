export class NotificationService {
  static show(message: string) {
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 m-3 p-3 bg-success text-white rounded shadow';
    toast.style.zIndex = '1050';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Зникає через 3 секунди
    setTimeout(() => toast.remove(), 3000);
  }
}