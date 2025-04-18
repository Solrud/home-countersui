# Фронтенд пет-проект для управления счетчиками квартиры на Angular

## 🚀 Сайт разработчика: [https://mattheweb.ru](https://mattheweb.ru/git-readme-home-countersui)

## Описание ПО
Программа для ведения и управления (добавления/ изменения/ удаления) таблицей счетчиков в моей квартире.  
Интерфейс адаптирован под любые разрешения.
### 🛠️ Cтек 
    @angular/core: 16.2.0
    @auth0/angular-jwt: 5.2.0
    exceljs: 4.4.0
    bootstrap: 5.3.3
    bootstrap-icons: 1.11.3
    typescript: 5.1.3
    CSS 3
    HTML 5
    Intellij IDEA v.2024.3
### Цель ПО
Сделано для удобства, чтобы мобильно и быстро добавлять счетчики, мобильно отслеживать разницу в потреблении воды/энергопотреблении и выгружать показание в .xlsx формат.
  
### Авторизация
Авторизация происходит через ввод пароля и выдачи JWT-токена (guard angular schematic).  
API запросы доступны только после проверки JWT-токена на его действительность (Токен живет сутки).

### Общий вид ПО
#### Главный компонент
![hc-main.png](src/assets/imgs/readme/hc-main.png)

#### Главный компонент (мобильная версия/ темная тема)
![hc-main-mobile-black.png](src/assets/imgs/readme/hc-main-mobile-black.png)

#### Модальное окно добавления нового показания (мобильная версия)
![hc-add-mobile.png](src/assets/imgs/readme/hc-add-mobile.png)

#### Модальное окно изменения существующего показания (темная тема)
![hc-edit-counter-black.png](src/assets/imgs/readme/hc-edit-counter-black.png)

#### Модальное окно удаления существующего показания (мобильная версия/ темная тема)
![hc-delete-mobile-black.png](src/assets/imgs/readme/hc-delete-mobile-black.png)

## Backend

### 🛠️ Стек
 Бекенд написан на Python 3, с помощью Flask фреймворка и библиотек:
 - pymysql
 - pymemcache
### БД
- MySQL 8.0,
- phpMyAdmin
## Ссылки
[![gitHub](https://img.shields.io/badge/GitHub-Solrud-blue?logo=github)](https://github.com/Solrud)  
[![devSite](https://img.shields.io/badge/Site-mattheweb.ru-3C517C?logo=monster)](https://mattheweb.ru/git-badges-readme-home-countersui)  
[![tg](https://img.shields.io/badge/Telegram-@rudalsmolyusr-27a7e7?logo=telegram)](https://t.me/rudalsmolyusr)
## ❗ Важно ❗
Код проекта предоставлен в ознакомительных целях для демонстрации технических навыков разработчика. Проект не будет работать должным образом при самостоятельной сборке ввиду отсутствия доступа к конфиденциальной информации (авторизации).
