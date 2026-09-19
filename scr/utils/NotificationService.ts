export class NotificationService {
  static showModal(message: string, onConfirm?: () => void): void {
    // Пізніше ми реалізуємо тут логіку створення DOM-елемента модального вікна
    console.log(`Модальне вікно: ${message}`);
    if (onConfirm) {
        // Імітація підтвердження
        onConfirm();
    }
  }
}