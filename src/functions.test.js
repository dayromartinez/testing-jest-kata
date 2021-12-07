import { createEvent, createEventList } from './functions';

const weekday = "tue"; 
const week = 1;
const openHour = 8;
const closeHour = 18;
const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

const beforeAll = () => {
    return global.Date.now = jest.fn(() => new Date('2021-12-7T10:20:30Z').getTime()) 
}

const tiempoTotal = Date.now();
const date = new Date(tiempoTotal);
date.setDate(date.getDate());
const fecha = new Date(date).toLocaleDateString('es-ES', options);


test('Validation a event title and content basic', () => {
    //TODO: hacer las verificaciones
    let resultado = createEvent(weekday, week, openHour, closeHour);
    expect(resultado.title).toBe("[SOFKA U] Meeting Room");
    expect(resultado.description).toBe("Mentoring and Practice");
    expect(resultado.duration).toEqual([closeHour - openHour, "hour"])
});

test('Validation start date', () => {
    //TODO: hacer las verificaciones
    let resultado = createEvent(weekday, week, openHour, closeHour);
    expect(resultado.start.toUTCString()).toEqual(date.toUTCString());
});

test('Validation date', () => {
   //TODO: hacer las verificaciones
    let resultado = createEvent(weekday, week, openHour, closeHour);
    expect(resultado.date).toBe(fecha);
});


test('Validation illegal arguments', () => {

    //TODO: hacer las verificaciones
    const openHour = 18;
    const closeHour = 8;

    //Para testear los horarios de entrada
    try {
        let resultado = createEvent(weekday, week, openHour, closeHour);
    } catch (error) {
        expect(error.toString()).toBe("Error: Argumento ilegal en el horario de entrada.")
    }
    
    //Para testear el número de la semana
    try {
        let resultado = createEvent(weekday, -1, 8, 18);
    } catch (error) {
        expect(error.toString()).toBe("Error: Argumento ilegal para la semana, debe ser un valor positivo.")
    }

    //Para testear los días de la semana
    try {
        let resultado = createEvent("xd", 5, 8, 18);
    } catch (error) {
        expect(error.toString()).toBe("Error: Argumento ilegal el dia de la semana, valores posibles; 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' y 'sun'.")
    }

});


test('create an event list of at least 10 events', () => {
    //TODO: hacer las verificaciones
    //Se evalúa la longitud de la lista que retorna la lista
    const list = createEventList(weekday, week, openHour, closeHour, 0, []);
    expect(list.length).toEqual(10);
});