export function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const dateOfMonth = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const difference = Date.now() - new Date(year, month, dateOfMonth).getTime();

  let result = '';

  if (difference < 864e5) {
    result += 'Сегодня';
  } else if (difference < 1728e5) {
    result += 'Вчера';
  } else {
    result += `${dateOfMonth} `;

    switch (month) {
      case 0:
        result += 'января';
        break;
      case 1:
        result += 'февраля';
        break;
      case 2:
        result += 'марта';
        break;
      case 3:
        result += 'апреля';
        break;
      case 4:
        result += 'мая';
        break;
      case 5:
        result += 'июня';
        break;
      case 6:
        result += 'июля';
        break;
      case 7:
        result += 'августа';
        break;
      case 8:
        result += 'сентября';
        break;
      case 9:
        result += 'октября';
        break;
      case 10:
        result += 'ноября';
        break;
      case 11:
        result += 'декабря';
        break;
      default:
        throw new Error('Непраильный номер месяца');
    }
    result += ` ${year}`;
  }

  result += `, ${getZero(hours)}:${getZero(minutes)}`;

  return result;
}

function getZero(num) {
  return (num >= 10 ? '' : '0') + num;
}
