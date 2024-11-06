function getMonday(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1);
    const result = new Date(date);
    return new Date(result.setDate(diff));
}

export function formatDate(inputDate: Date) {
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);

    const startOfWeek = getMonday(today);

    if (inputDate.toDateString() === today.toDateString()) {
        return (
            "Сегодня в " +
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
