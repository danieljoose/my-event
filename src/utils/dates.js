import moment from "moment";

const months = [
    {name: 'Janeiro', abrev: 'Jan'},
    {name: 'Fevereiro', abrev: 'Fev'},
    {name: 'Março', abrev: 'Mar'},
    {name: 'Abril', abrev: 'Abr'},
    {name: 'Maio', abrev: 'Mai'},
    {name: 'Junho', abrev: 'Jun'},
    {name: 'Julho', abrev: 'Jul'},
    {name: 'Agosto', abrev: 'Ago'},
    {name: 'Setembro', abrev: 'Set'},
    {name: 'Outubro', abrev: 'Out'},
    {name: 'Novembro', abrev: 'Nov'},
    {name: 'Dezembro', abrev: 'Dez'},
]

const daysWeek = [
    {name: 'Segunda-feira', abrev: 'Seg'},
    {name: 'Terça-feira', abrev: 'Ter'},
    {name: 'Quarta-feira', abrev: 'Qua'},
    {name: 'Quinta-feira', abrev: 'Qui'},
    {name: 'Sexta-feira', abrev: 'Sex'},
    {name: 'Sábado', abrev: 'Sáb'},
    {name: 'Domingo', abrev: 'Dom'}
]

export const weekHour = (data) => {
    const day = daysWeek[new Date(data).getDay()].abrev
    const hour = moment(data).format('hh:mm');

    return `${day}, ${new Date(data).getHours()}:00`;
};

export const month = (data) => {
    const month = months[new Date(data).getMonth()].abrev

    return `${month}`;
};

export const hourDayMonth = (data) => {
    const day = new Date(data).getDate()
    const hour = moment(data).format('HH');
    const month = months[new Date(data).getMonth()].name

    return `${day} de ${month} às ${hour}:00`;

}
