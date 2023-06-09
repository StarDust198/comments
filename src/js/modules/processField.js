import { formatDate } from './formatDate.js';

export function processField(field, errorState) {
  switch (field.name) {
    case 'name':
    case 'text':
      let str = field.value.trim();
      let minLength = field.name === 'name' ? 3 : 10;

      if (str.length < minLength) {
        errorState.errors++;
        errorState[field.name] =
          str.length === 0
            ? 'Обязательное поле'
            : `Не менее ${minLength === 3 ? '3х' : '10ти'} символов`;
      } else {
        return str;
      }
      break;

    case 'date':
      let newDate = new Date();
      if (!field.value) return formatDate(newDate);

      let dateArr = field.value.match(/\d+/g);

      if (dateArr.length !== 3) {
        errorState.errors++;
        errorState[field.name] = 'Формат: дд/мм/гг или дд.мм.гггг';
        return;
      }

      if (+dateArr[0] < 1 || +dateArr[0] > 31) {
        errorState.errors++;
        errorState[field.name] = 'Неправильно указана дата';
        return;
      }

      if (+dateArr[1] < 1 || +dateArr[1] > 12) {
        errorState.errors++;
        errorState[field.name] = 'Неправильно указан месяц';
        return;
      }

      if (dateArr[2].length !== 2 && dateArr[2].length !== 4) {
        errorState.errors++;
        errorState[field.name] = 'Неправильный формат года';
        return;
      }

      if (+dateArr[2] % 2000 > newDate.getFullYear() % 2000) {
        errorState.errors++;
        errorState[field.name] = 'От 2000го до текущего';
        return;
      }

      const year = +dateArr[2] >= 2000 ? +dateArr[2] : +dateArr[2] + 2000;
      const month = +dateArr[1] - 1;
      const date = +dateArr[0];
      const hours = newDate.getHours();
      const minutes = newDate.getMinutes();
      const resultDate = new Date(year, month, date, hours, minutes);

      if (resultDate.getTime() - Date.now() > 0) {
        errorState.errors++;
        errorState[field.name] = 'Эта дата в будущем!';
        return;
      }

      if (resultDate.getMonth() !== month) {
        errorState.errors++;
        errorState[field.name] = 'Такого числа не было в этом месяце';
        return;
      }

      return formatDate(resultDate);

    default:
      throw new Error('Unknown input field');
  }
}
