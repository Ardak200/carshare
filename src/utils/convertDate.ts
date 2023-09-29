export const convertDate = (date:string) => {
    return new Intl.DateTimeFormat('ru-RU', { month: 'short', day: '2-digit' }).format(new Date(Date.parse(date)));
}

export const convertDateTime = (date:string) => {
    return new Intl.DateTimeFormat('ru-RU', { hour: 'numeric', minute: 'numeric' }).format(new Date(Date.parse(date)));
}

export const convertFullDate = (date:string) => {
    if(date!= "") {
        return new Intl.DateTimeFormat('ru-RU', { month: "long", day: '2-digit', hour:'numeric',minute:"numeric",second:"numeric" }).format(new Date(Date.parse(date)));
    } else {
        return ""
    }
}
