export const periodList = ["all", "year", "month", "week", "day"] as const;
export type DatePeriod = (typeof periodList)[number];

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

function getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    result.setDate(diff);
    return result;
}

export function formatDate(inputDate: Date) {
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const startOfWeek = getStartOfWeek(today);

    if (inputDate >= today) {
        return (
            "Сегодня в " +
            inputDate.toLocaleTimeString("ru", {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
    } else if (inputDate >= yesterday) {
        return (
            "Вчера в " +
            inputDate.toLocaleTimeString("ru", {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
    } else if (inputDate >= startOfWeek) {
        return inputDate.toLocaleString("ru", {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
        });
    } else if (today.getFullYear() === inputDate.getFullYear()) {
        return inputDate.toLocaleString("ru", {
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } else {
        return inputDate.toLocaleString("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
}

export function getStartDateForPeriod(period: DatePeriod): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (period === "day") {
        return today;
    } else if (period === "week") {
        return getStartOfWeek(today);
    } else if (period === "month") {
        today.setDate(1);
        return today;
    } else if (period === "year") {
        today.setMonth(0);
        today.setDate(1);
        return today;
    }
    return new Date(0);
}

export function getDaysInCurrentMonth() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const lastDayOfMonth = new Date(year, month + 1, 0);

    return lastDayOfMonth.getDate();
}
