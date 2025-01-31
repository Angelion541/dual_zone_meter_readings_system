## Запуск програми

Перед запуском фронтенд додатку необхідно впевнитись що встановлено Node версії 20+ на ПК та з термінала в папці додатку запустити команду `npm install` що б завантажити пакети залежностей.

Запуск додатка виконується з робочої папки через консольну команду `npm start`

## Завдання практичної роботи №2

Написати программу на довільній мові програмування (Java, Python, JS, C, C#, С++...), яка б на вхід отримувала дані двофазного лічильника "день-ніч" та за різним тарифом, рахувала різницю між попередніми показниками та поточними, виставляючи рахунок.
У випадку отримання даних від нового лічильника, вони мають дописатись у масив з усіма даними.
Після опрацювання нових даних, вони мають записатись замість старих як наступні початкові.
У випадку надходження менших даних, ніж були попередні, накрутити задане число квт (нехай, 100 день та 80 ніч) та видати рахунок.

До програми мають бути написані тести:

- оновлення показників вже існуючого лічильника
- отримання показників від нового лічильника
- отримання показників з заниженими нічними показниками
- отримання показників з заниженими денними показниками
- отримання показників з заниженими нічними та денними показниками

Вхідні дані, які мають легко змінюватись в одному місці:

- тарифи на день та ніч (наприклад, у константах програми, у файлі, у БД)
- кількість накручуваних квт на день та ніч (зручно там же, де і тарифи)
- початковий масив даних з номерами лічильників, датами та попередніми тарифами (в залежності від обраної стратегії програми, аналогічно, у списку-мапі в коді, у файлі, у БД)
- массив з минулими обрахунками вартості електроенергії (так само)

Вихідні дані:
обновлений масив з вартістю електроенергії длі всіх лічильників.

Додатки до програми:
а) Зберігати історію всіх показників лічильників. _ (10 бали)
б) Зберігати всі вхідні та вихідні дані в БД (в SQL - MySQL, Postgres чи ін - 5 балів), але за бажанням можна в NoSQL (Mongo чи ін - 15 балів) _
в) Поставляти нові дані в програму через чергу зі вхідними даними (Kafka, RabbitMQ, ін) Нові дані треба геренурвати. На додаткові бали можна зробити мікросервісну архітектуру. (15 балів)
г) UI - якщо реалізується консольний чи справжній інтерфейс, там варто передбачити User Friendly поведінку для попередження користувача про накрутку показників та дати йому можливість її оминути вводячи коректні дані.

- Реалізуючи збереження, не забудьте реалізувати зчитування історії. (Кому ж потрібна валіза без ручки?) Проконтролюйте, що зберігаєте не прислані показники, а коректні показники, на основі яких рахуються квитанції.
