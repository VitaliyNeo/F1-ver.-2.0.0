Задание
Необходимо создать простейший сервис просмотра информации о погоде.


При создании сервиса нужно соблюсти следующие условия:

1.Необходимо использовать фреймворк React и адаптивный дизайн, чтобы страница открывалась на любом consumer-grade устройстве.
2.Пользователь должен либо иметь возможность выбрать из списка город, для которого ему нужен прогноз погоды либо город определяется по IP пользователя.
3.Пользователь должен иметь возможность посмотреть данные на следующие временные промежутки:
«сейчас» (на день);
«ближайшие пять дней» (по дням на пять суток).
4.Данные должны запрашиваться через One Call API OpenWeather.


В проекте использованы:
Геолокация(GeolocationPosition, API ipgeolocation для определения города и координат по IP)
React Yandex Maps (для отрисовки карты с выбранным городом)
Weather API (для получения данных о прогнозе погоды)
Axios с React


Для установки и запуска среды разработки React + Webpack:
1.Клонировать репозиторий `git clone https://github.com/VitaliyNeo/F1-ver.-2.0.0.git`  
2.В консоли перейти в папку проекта
3.Восстановить модули: `npm install`   
Запуск СЕРВЕРА DevServer: `npm run start`  
Запуск build сборки: `npm run build`  

Примечание: Для правильной работы кнопки "Search for my location" необходимо предоставить разрешение на определение местоположения в браузере, в случае если оно у пользователя отключено.
