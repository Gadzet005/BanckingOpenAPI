export const months = [
    "Яынварь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];

export const weekDays = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
];

export function getDaysInCurrentMonth() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const lastDayOfMonth = new Date(year, month + 1, 0);

    return lastDayOfMonth.getDate();
}
